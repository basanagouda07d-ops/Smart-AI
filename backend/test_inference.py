import urllib.request
import os
import glob
import json

# Find a real image from the dataset
imgs = glob.glob(r"D:\spidermann\SmartAI\dataset\augment\purple blotch_augment\*.jpg")
if not imgs:
    imgs = glob.glob(r"D:\spidermann\SmartAI\dataset\augment\**\*.jpg", recursive=True)

test_img = imgs[0]
print("1. Sending test image to backend /api/predict:", os.path.basename(test_img))

boundary = "----WebKitFormBoundaryTest123"
with open(test_img, "rb") as f:
    img_bytes = f.read()

body = (
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="image"; filename="{os.path.basename(test_img)}"\r\n'
    f"Content-Type: image/jpeg\r\n\r\n"
).encode("utf-8") + img_bytes + f"\r\n--{boundary}--\r\n".encode("utf-8")

req = urllib.request.Request("http://127.0.0.1:8000/api/predict", data=body)
req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")

with urllib.request.urlopen(req) as res:
    predict_res = json.loads(res.read())
    print("\n[PREDICTION & STORAGE RESULT]:")
    print(f"  Scan ID:      {predict_res.get('id')}")
    print(f"  Image URL:    {predict_res.get('imageUrl')}")
    print(f"  Disease Name: {predict_res.get('name')}")
    print(f"  Confidence:   {predict_res.get('confidence')}%")
    print(f"  Stored:       {predict_res.get('stored')}")

# 2. Check if the saved image is accessible via HTTP
img_url = f"http://127.0.0.1:8000{predict_res.get('imageUrl')}"
with urllib.request.urlopen(img_url) as img_res:
    print(f"\n2. Verified stored image URL via HTTP: {img_res.status} OK (Content-Length: {len(img_res.read())} bytes)")

# 3. Check /api/scans
with urllib.request.urlopen("http://127.0.0.1:8000/api/scans") as scans_res:
    scans = json.loads(scans_res.read())
    print(f"\n3. Verified /api/scans endpoint: {len(scans)} record(s) currently stored in SQLite database.")
    print("  Latest record:", scans[0]["id"], "-", scans[0]["diseaseName"], f"({scans[0]['confidence']}%)")

# 4. Check /api/stats
with urllib.request.urlopen("http://127.0.0.1:8000/api/stats") as stats_res:
    stats = json.loads(stats_res.read())
    print(f"\n4. Verified /api/stats endpoint:")
    print(f"  Total Scans:    {stats.get('totalScans')}")
    print(f"  Healthy Count:  {stats.get('healthyCount')}")
    print(f"  Active Alerts:  {stats.get('activeAlerts')}")
    print(f"  Avg Accuracy:   {stats.get('avgAccuracy')}%")
