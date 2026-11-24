import os
import json
import time
from datetime import datetime
from typing import Optional, Dict, List, Any
import pymongo
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
import certifi

# Load environment variable or default
DEFAULT_MONGO_URI = os.getenv("MONGODB_URI", os.getenv("MONGO_URI", "mongodb://localhost:27017"))
DB_NAME = os.getenv("MONGODB_DB_NAME", "agriai_db")

_client: Optional[MongoClient] = None
_db = None
_last_connection_check = 0
_is_connected = False
_connection_error = None

def get_mongo_connection_uri() -> str:
    # Check .env in backend directory if present
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_path):
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("MONGODB_URI=") or line.startswith("MONGO_URI="):
                        val = line.split("=", 1)[1].strip().strip('"').strip("'")
                        if val:
                            return val
        except Exception:
            pass
    return os.getenv("MONGODB_URI", os.getenv("MONGO_URI", DEFAULT_MONGO_URI))

def init_mongo(uri: Optional[str] = None) -> bool:
    global _client, _db, _is_connected, _connection_error
    target_uri = uri or get_mongo_connection_uri()
    
    try:
        if _client:
            try:
                _client.close()
            except Exception:
                pass
        
        # Configure TLS and certificate bundle for cross-platform resilience
        client_kwargs = {
            "serverSelectionTimeoutMS": 3000,
            "connectTimeoutMS": 3000
        }
        if "mongodb+srv://" in target_uri or "ssl=true" in target_uri.lower() or "tls=true" in target_uri.lower():
            client_kwargs["tlsCAFile"] = certifi.where()
            client_kwargs["tlsAllowInvalidCertificates"] = True

        _client = MongoClient(target_uri, **client_kwargs)
        # Test connection with ping
        _client.admin.command('ping')
        _db = _client[DB_NAME]
        
        # Create indexes
        _db.users.create_index("email", unique=True)
        _db.users.create_index("id", unique=True)
        _db.scans.create_index("id", unique=True)
        _db.scans.create_index([("created_at", pymongo.DESCENDING)])
        
        _is_connected = True
        _connection_error = None
        print(f"[MongoDB] Successfully connected to MongoDB at {target_uri.split('@')[-1] if '@' in target_uri else target_uri} | DB: {DB_NAME}")
        return True
    except (ConnectionFailure, ServerSelectionTimeoutError, Exception) as e:
        _is_connected = False
        _connection_error = str(e)
        _client = None
        _db = None
        print(f"[MongoDB] Notice: Could not connect to MongoDB ({target_uri}): {_connection_error}. Operating with resilient fallback.")
        return False

def is_mongo_connected() -> bool:
    global _is_connected, _last_connection_check
    now = time.time()
    if now - _last_connection_check > 10:  # Check every 10 seconds
        _last_connection_check = now
        if _client:
            try:
                _client.admin.command('ping')
                _is_connected = True
            except Exception as e:
                _is_connected = False
        else:
            # Try reconnecting
            _is_connected = init_mongo()
    return _is_connected

def get_db():
    if is_mongo_connected():
        return _db
    return None

def get_db_status() -> Dict[str, Any]:
    connected = is_mongo_connected()
    uri = get_mongo_connection_uri()
    masked_uri = uri
    if "@" in uri:
        # Mask password in mongodb+srv://user:pass@cluster.mongodb.net
        prefix = uri.split("@")[0]
        suffix = uri.split("@")[1]
        user_part = prefix.split("//")[1].split(":")[0] if ":" in prefix.split("//")[1] else "user"
        masked_uri = f"{prefix.split('//')[0]}//{user_part}:****@{suffix}"
    
    total_users = 0
    total_scans = 0
    latency_ms = None
    
    if connected and _db is not None:
        try:
            t0 = time.time()
            _client.admin.command('ping')
            latency_ms = round((time.time() - t0) * 1000, 2)
            total_users = _db.users.count_documents({})
            total_scans = _db.scans.count_documents({})
        except Exception as e:
            connected = False
            
    return {
        "connected": connected,
        "database": DB_NAME,
        "provider": "MongoDB (pymongo)",
        "uri": masked_uri,
        "latency_ms": latency_ms,
        "collections": {
            "users": total_users,
            "scans": total_scans
        },
        "last_error": _connection_error if not connected else None,
        "fallback_active": not connected
    }

# ==========================================
#  USER OPERATIONS IN MONGODB
# ==========================================
def mongo_save_user(user_data: Dict[str, Any]) -> bool:
    db = get_db()
    if db is None:
        return False
    try:
        user_doc = user_data.copy()
        user_doc["updated_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        db.users.update_one(
            {"email": user_doc["email"]},
            {"$set": user_doc},
            upsert=True
        )
        return True
    except Exception as e:
        print(f"[MongoDB] Error saving user: {e}")
        return False

def mongo_update_user_password(email: str, new_password_hash: str) -> bool:
    db = get_db()
    if db is None:
        return False
    try:
        res = db.users.update_one(
            {"email": email.strip().lower()},
            {"$set": {"password_hash": new_password_hash, "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}}
        )
        return res.matched_count > 0
    except Exception as e:
        print(f"[MongoDB] Error updating user password: {e}")
        return False

def mongo_find_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    db = get_db()
    if db is None:
        return None
    try:
        doc = db.users.find_one({"email": email.strip().lower()}, {"_id": 0})
        return doc
    except Exception as e:
        print(f"[MongoDB] Error finding user: {e}")
        return None

def mongo_find_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    db = get_db()
    if db is None:
        return None
    try:
        doc = db.users.find_one({"id": user_id}, {"_id": 0})
        return doc
    except Exception as e:
        print(f"[MongoDB] Error finding user by id: {e}")
        return None

def mongo_count_users() -> int:
    db = get_db()
    if db is None:
        return 0
    try:
        return db.users.count_documents({})
    except Exception:
        return 0

def mongo_get_all_users() -> Optional[List[Dict[str, Any]]]:
    db = get_db()
    if db is None:
        return None
    try:
        cursor = db.users.find({}, {"_id": 0, "password_hash": 0}).sort("created_at", pymongo.DESCENDING)
        users = []
        for doc in cursor:
            users.append({
                "id": doc.get("id"),
                "fullName": doc.get("full_name") or doc.get("fullName", "Grower"),
                "email": doc.get("email"),
                "farmName": doc.get("farm_name") or doc.get("farmName", "Grower Farm"),
                "acreage": doc.get("acreage", "1 Acre"),
                "region": doc.get("region", "Onion Cultivation Sector"),
                "role": doc.get("role", "Verified Gmail Grower"),
                "authProvider": doc.get("auth_provider") or doc.get("authProvider", "gmail_password"),
                "createdAt": doc.get("created_at") or doc.get("createdAt")
            })
        return users
    except Exception as e:
        print(f"[MongoDB] Error fetching users: {e}")
        return None

# ==========================================
#  SCAN OPERATIONS IN MONGODB
# ==========================================
def mongo_save_scan(scan_data: Dict[str, Any]) -> bool:
    db = get_db()
    if db is None:
        return False
    try:
        scan_doc = scan_data.copy()
        db.scans.update_one(
            {"id": scan_doc["id"]},
            {"$set": scan_doc},
            upsert=True
        )
        return True
    except Exception as e:
        print(f"[MongoDB] Error saving scan: {e}")
        return False

def mongo_get_all_scans() -> Optional[List[Dict[str, Any]]]:
    db = get_db()
    if db is None:
        return None
    try:
        cursor = db.scans.find({}, {"_id": 0}).sort("created_at", pymongo.DESCENDING)
        scans = []
        for doc in cursor:
            # Ensure field naming matches frontend contract
            scans.append({
                "id": doc.get("id"),
                "diseaseId": doc.get("disease_id") or doc.get("diseaseId"),
                "diseaseName": doc.get("disease_name") or doc.get("diseaseName"),
                "scientificName": doc.get("scientific_name") or doc.get("scientificName"),
                "severity": doc.get("severity"),
                "confidence": doc.get("confidence"),
                "foliarCoverage": doc.get("foliar_coverage") or doc.get("foliarCoverage"),
                "lesionArea": doc.get("lesion_area") or doc.get("lesionArea"),
                "chlorophyllIndex": doc.get("chlorophyll_index") or doc.get("chlorophyllIndex"),
                "image": doc.get("image_url") or doc.get("image"),
                "location": doc.get("location_tag") or doc.get("location") or "Field Sector A",
                "timestamp": doc.get("created_at") or doc.get("timestamp"),
                "diagnosticBasis": doc.get("diagnostic_basis") or doc.get("diagnosticBasis"),
                "probabilities": doc.get("probabilities", []),
                "inferenceTimeMs": doc.get("inference_time_ms") or doc.get("inferenceTimeMs", 65),
                "source": doc.get("source", "Deep Learning CNN Model"),
                "userId": doc.get("user_id") or doc.get("userId"),
                "userEmail": doc.get("user_email") or doc.get("userEmail")
            })
        return scans
    except Exception as e:
        print(f"[MongoDB] Error getting scans: {e}")
        return None

def mongo_get_single_scan(scan_id: str) -> Optional[Dict[str, Any]]:
    db = get_db()
    if db is None:
        return None
    try:
        doc = db.scans.find_one({"id": scan_id}, {"_id": 0})
        if not doc:
            return None
        return {
            "id": doc.get("id"),
            "diseaseId": doc.get("disease_id") or doc.get("diseaseId"),
            "diseaseName": doc.get("disease_name") or doc.get("diseaseName"),
            "scientificName": doc.get("scientific_name") or doc.get("scientificName"),
            "severity": doc.get("severity"),
            "confidence": doc.get("confidence"),
            "foliarCoverage": doc.get("foliar_coverage") or doc.get("foliarCoverage"),
            "lesionArea": doc.get("lesion_area") or doc.get("lesionArea"),
            "chlorophyllIndex": doc.get("chlorophyll_index") or doc.get("chlorophyllIndex"),
            "image": doc.get("image_url") or doc.get("image"),
            "location": doc.get("location_tag") or doc.get("location") or "Field Sector A",
            "timestamp": doc.get("created_at") or doc.get("timestamp"),
            "diagnosticBasis": doc.get("diagnostic_basis") or doc.get("diagnosticBasis"),
            "probabilities": doc.get("probabilities", []),
            "inferenceTimeMs": doc.get("inference_time_ms") or doc.get("inferenceTimeMs", 65),
            "source": doc.get("source", "Deep Learning CNN Model")
        }
    except Exception as e:
        print(f"[MongoDB] Error finding single scan: {e}")
        return None

def mongo_delete_scan(scan_id: str) -> Optional[str]:
    db = get_db()
    if db is None:
        return None
    try:
        doc = db.scans.find_one({"id": scan_id})
        if not doc:
            return None
        filename = doc.get("filename")
        db.scans.delete_one({"id": scan_id})
        return filename
    except Exception as e:
        print(f"[MongoDB] Error deleting scan: {e}")
        return None

def mongo_get_stats() -> Optional[Dict[str, Any]]:
    scans = mongo_get_all_scans()
    if scans is None:
        return None
    
    total_scans = len(scans)
    if total_scans == 0:
        return {
            "totalScans": 0,
            "healthyCount": 0,
            "activeAlerts": 0,
            "healthyRatio": "0.0",
            "avgAccuracy": "0.0",
            "diseaseDistribution": [],
            "recentScans": []
        }

    healthy_count = sum(1 for r in scans if r.get("diseaseId") == "healthy")
    active_alerts = total_scans - healthy_count
    healthy_ratio = round((healthy_count / total_scans) * 100, 1)
    avg_accuracy = round(sum(float(r.get("confidence") or 0) for r in scans) / total_scans, 1)

    dist_map = {}
    for r in scans:
        d_name = r.get("diseaseName") or "Unknown"
        dist_map[d_name] = dist_map.get(d_name, 0) + 1

    dist_colors = {
        "Healthy Onion Crop": "#10b981",
        "Purple Blotch": "#a855f7",
        "Stemphylium Leaf Blight": "#f59e0b",
        "Iris Yellow Spot Virus (IYSV)": "#ef4444",
        "Early Blight": "#f97316",
        "Downy Mildew": "#06b6d4"
    }

    disease_distribution = [
        {
            "name": name,
            "value": count,
            "color": dist_colors.get(name, "#10b981")
        }
        for name, count in dist_map.items()
    ]

    recent_scans = []
    for r in scans[:5]:
        recent_scans.append({
            "id": r["id"],
            "diseaseName": r["diseaseName"],
            "severity": r["severity"],
            "confidence": r["confidence"],
            "image": r["image"],
            "timestamp": r["timestamp"]
        })

    return {
        "totalScans": total_scans,
        "healthyCount": healthy_count,
        "activeAlerts": active_alerts,
        "healthyRatio": str(healthy_ratio),
        "avgAccuracy": str(avg_accuracy),
        "diseaseDistribution": disease_distribution,
        "recentScans": recent_scans
    }

# ==========================================
#  SYNC SQLITE TO MONGODB
# ==========================================
def sync_sqlite_data_to_mongo(sqlite_db_path: str) -> Dict[str, int]:
    """Syncs existing SQLite scans and users into MongoDB so no data is missed."""
    import sqlite3
    db = get_db()
    if db is None or not os.path.exists(sqlite_db_path):
        return {"users_synced": 0, "scans_synced": 0}

    users_synced = 0
    scans_synced = 0

    try:
        conn = sqlite3.connect(sqlite_db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        # Sync Users
        cursor.execute("SELECT * FROM users")
        for u in cursor.fetchall():
            u_dict = {
                "id": u["id"],
                "full_name": u["full_name"],
                "email": u["email"],
                "password_hash": u["password_hash"],
                "farm_name": u["farm_name"],
                "acreage": u["acreage"],
                "region": u["region"],
                "role": u["role"],
                "auth_provider": u["auth_provider"],
                "created_at": u["created_at"]
            }
            db.users.update_one({"email": u_dict["email"]}, {"$set": u_dict}, upsert=True)
            users_synced += 1

        # Sync Scans
        cursor.execute("SELECT * FROM scans")
        for s in cursor.fetchall():
            try:
                probs = json.loads(s["probabilities"]) if s["probabilities"] else []
            except Exception:
                probs = []
            s_dict = {
                "id": s["id"],
                "filename": s["filename"],
                "image_url": s["image_url"],
                "disease_id": s["disease_id"],
                "disease_name": s["disease_name"],
                "scientific_name": s["scientific_name"],
                "severity": s["severity"],
                "confidence": s["confidence"],
                "foliar_coverage": s["foliar_coverage"],
                "lesion_area": s["lesion_area"],
                "chlorophyll_index": s["chlorophyll_index"],
                "diagnostic_basis": s["diagnostic_basis"],
                "probabilities": probs,
                "inference_time_ms": s["inference_time_ms"],
                "source": s["source"],
                "location_tag": s["location_tag"],
                "user_id": s["user_id"] if "user_id" in s.keys() else None,
                "user_email": s["user_email"] if "user_email" in s.keys() else None,
                "created_at": s["created_at"]
            }
            db.scans.update_one({"id": s_dict["id"]}, {"$set": s_dict}, upsert=True)
            scans_synced += 1

        conn.close()
    except Exception as e:
        print(f"[MongoDB] Error during SQLite to MongoDB sync: {e}")

    return {"users_synced": users_synced, "scans_synced": scans_synced}
