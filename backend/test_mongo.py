import os
import sys

# Ensure backend directory is in path
sys.path.insert(0, os.path.dirname(__file__))

from db_mongo import (
    init_mongo, is_mongo_connected, get_db_status,
    mongo_save_user, mongo_find_user_by_email, mongo_count_users,
    mongo_save_scan, mongo_get_all_scans, mongo_get_stats
)

print("=" * 60)
print("TESTING MONGO DB INTEGRATION MODULE")
print("=" * 60)

status = get_db_status()
print(f"Provider: {status['provider']}")
print(f"Connected: {status['connected']}")
print(f"Target URI: {status['uri']}")
print(f"Active DB: {status['database']}")
print(f"Fallback active: {status['fallback_active']}")

if status['connected']:
    print("\n--> MongoDB is CONNECTED!")
    print(f"Collections: {status['collections']}")
    print(f"Latency: {status['latency_ms']} ms")
else:
    print("\n--> MongoDB is currently in RESILIENT FALLBACK MODE (Waiting for MongoDB daemon or Atlas URI).")
    print(f"Last Notice: {status['last_error']}")

print("\n[OK] MongoDB module loaded and initialized without error.")
