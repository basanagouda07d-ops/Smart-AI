import os
import sys
import time
import pymongo
from pymongo import MongoClient

# Load .env if present
env_paths = [
    os.path.join(os.path.dirname(__file__), ".env"),
    os.path.join(os.path.dirname(__file__), "backend", ".env")
]

mongo_uri = None
db_name = "agriai_db"

for p in env_paths:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("MONGODB_URI="):
                    mongo_uri = line.split("=", 1)[1].strip().strip('"').strip("'")
                elif line.startswith("MONGODB_DB_NAME="):
                    db_name = line.split("=", 1)[1].strip().strip('"').strip("'")

if not mongo_uri:
    mongo_uri = "mongodb+srv://basanagouda07d_db_user:Agriai2026@cluster1.tzlxce7.mongodb.net/agriai_db?authSource=admin&retryWrites=true&w=majority"

print("=" * 65)
print("     AgriAI Onion Disease Detector - MongoDB Atlas Test")
print("=" * 65)

# Mask password for display
masked_uri = mongo_uri
if "@" in mongo_uri:
    pre, post = mongo_uri.split("@", 1)
    user_part = pre.split("//", 1)[1].split(":", 1)[0]
    masked_uri = f"{pre.split('//', 1)[0]}//{user_part}:****@{post}"

print(f"Target URI : {masked_uri}")
print(f"Database   : {db_name}")
print("Connecting...")

try:
    t0 = time.time()
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=4000)
    client.admin.command('ping')
    latency = round((time.time() - t0) * 1000, 2)
    
    db = client[db_name]
    user_count = db.users.count_documents({})
    scan_count = db.scans.count_documents({})
    
    print("\n" + "-" * 65)
    print(" [STATUS] CONNECTED TO MONGODB ATLAS SUCCESSFULLY!")
    print("-" * 65)
    print(f" Ping Latency      : {latency} ms")
    print(f" Active Cluster    : cluster1.tzlxce7.mongodb.net")
    print(f" Available DBs     : {client.list_database_names()}")
    print(f" Database          : '{db_name}'")
    print(f" Collections       : {db.list_collection_names()}")
    print(f" Stored Users      : {user_count} grower accounts")
    print(f" Stored Scans      : {scan_count} foliar pathology scans")
    
    # Show sample scan
    sample_scan = db.scans.find_one({}, {"_id": 0, "id": 1, "disease_name": 1, "confidence": 1, "severity": 1, "created_at": 1})
    if sample_scan:
        print("\n [SAMPLE CLOUD RECORD]:")
        print(f"   Scan ID    : {sample_scan.get('id')}")
        print(f"   Disease    : {sample_scan.get('disease_name')}")
        print(f"   Confidence : {sample_scan.get('confidence')}%")
        print(f"   Logged At  : {sample_scan.get('created_at')}")

    print("=" * 65)
    print("All systems operational. MongoDB Atlas is active and connected!")
    print("=" * 65)

except Exception as e:
    print("\n" + "-" * 65)
    print(" [CONNECTION FAILED]")
    print("-" * 65)
    print(f" Error: {e}")
    print("=" * 65)
    sys.exit(1)
