import urllib.request
import json
import uuid

BASE_URL = "http://127.0.0.1:8000"

print("=" * 60)
print("  Testing End-to-End JWT Authentication Pipeline")
print("=" * 60)

test_email = f"farmer_{uuid.uuid4().hex[:6]}@gmail.com"
test_password = "SecretPassword123"

# 1. Test Registration
reg_data = json.dumps({
    "fullName": "Basanagouda Patil",
    "email": test_email,
    "password": test_password,
    "farmName": "Krishna Valley Onion Farm",
    "acreage": "15 Acres",
    "region": "Northern Karnataka"
}).encode('utf-8')

req1 = urllib.request.Request(f"{BASE_URL}/api/auth/register", data=reg_data, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req1) as res:
    reg_res = json.loads(res.read())
    print("\n1. [REGISTER SUCCESS]")
    print(f"  User ID: {reg_res['user']['id']}")
    print(f"  Email:   {reg_res['user']['email']}")
    jwt_token = reg_res['token']
    print(f"  JWT Token: {jwt_token[:35]}...{jwt_token[-15:]}")

# 2. Test /api/auth/me with Bearer JWT
req2 = urllib.request.Request(f"{BASE_URL}/api/auth/me", headers={"Authorization": f"Bearer {jwt_token}"})
with urllib.request.urlopen(req2) as res:
    me_res = json.loads(res.read())
    print("\n2. [GET /api/auth/me SUCCESS]")
    print(f"  Verified User: {me_res['fullName']} ({me_res['email']})")
    print(f"  Farm Name:     {me_res['farmName']}")
    print(f"  Role:          {me_res['role']}")

# 3. Test Login
login_data = json.dumps({
    "email": test_email,
    "password": test_password
}).encode('utf-8')

req3 = urllib.request.Request(f"{BASE_URL}/api/auth/login", data=login_data, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req3) as res:
    login_res = json.loads(res.read())
    print("\n3. [LOGIN SUCCESS]")
    print(f"  Status: Authenticated via JWT")
    new_token = login_res['token']
    print(f"  Issued New JWT: {new_token[:35]}...{new_token[-15:]}")

# 4. Test Google Auth
google_data = json.dumps({
    "email": f"google_{uuid.uuid4().hex[:6]}@gmail.com",
    "fullName": "Google Certified Farmer",
    "authProvider": "google"
}).encode('utf-8')

req4 = urllib.request.Request(f"{BASE_URL}/api/auth/google", data=google_data, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req4) as res:
    google_res = json.loads(res.read())
    print("\n4. [GOOGLE AUTH SUCCESS]")
    print(f"  Google User: {google_res['user']['fullName']} ({google_res['user']['email']})")
    print(f"  Google JWT:  {google_res['token'][:35]}...{google_res['token'][-15:]}")

print("\n" + "=" * 60)
print("  ALL JWT TESTS PASSED SUCCESSFULLY!")
print("=" * 60)
