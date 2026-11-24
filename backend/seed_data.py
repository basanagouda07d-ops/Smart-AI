import os
import glob
import json
import shutil
import sqlite3
from datetime import datetime

BASE_DIR = r"D:\spidermann\SmartAI\backend"
DB_PATH = os.path.join(BASE_DIR, "agriai.db")
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

dataset_dir = r"D:\spidermann\SmartAI\dataset\augment"
samples = [
    ("healthy", "Healthy Onion Crop", "Allium cepa", "Healthy", 96.4, os.path.join(dataset_dir, "augment", "healthy_augment", "*.jpg")),
    ("purple_blotch", "Purple Blotch", "Alternaria porri", "Severe", 95.1, os.path.join(dataset_dir, "purple blotch_augment", "*.jpg")),
    ("stemphylium_blight", "Stemphylium Leaf Blight", "Stemphylium vesicarium", "High", 91.8, os.path.join(dataset_dir, "Stemphylium leaf blight and collectrichum leaf blight augment", "*.jpg")),
    ("iris_yellow_virus", "Iris Yellow Spot Virus (IYSV)", "Tospovirus (IYSV)", "Severe", 89.2, os.path.join(dataset_dir, "augment", "Iris yellow virus_augment", "*.jpg"))
]

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

for d_id, d_name, sci_name, sev, conf, pattern in samples:
    matching = glob.glob(pattern)
    if matching:
        src_img = matching[0]
        scan_id = f"SCN-20261123-{d_id[:4].upper()}01"
        ext = os.path.splitext(src_img)[1].lower() or ".jpg"
        target_fname = f"{scan_id.lower()}{ext}"
        target_path = os.path.join(UPLOADS_DIR, target_fname)
        shutil.copyfile(src_img, target_path)

        probs = [
            {"id": d_id, "name": d_name, "probability": conf},
            {"id": "healthy" if d_id != "healthy" else "purple_blotch", "name": "Healthy" if d_id != "healthy" else "Purple Blotch", "probability": round(100.0 - conf, 1)}
        ]

        cursor.execute('''
            INSERT OR REPLACE INTO scans (
                id, filename, image_url, disease_id, disease_name, scientific_name,
                severity, confidence, foliar_coverage, lesion_area, chlorophyll_index,
                diagnostic_basis, probabilities, inference_time_ms, source, location_tag, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            scan_id,
            target_fname,
            f"/uploads/{target_fname}",
            d_id,
            d_name,
            sci_name,
            sev,
            conf,
            84.0 if d_id != "healthy" else 95.0,
            16.0 if d_id != "healthy" else 0.0,
            76.0 if d_id != "healthy" else 98.0,
            f"Verified allium pathology scan from {os.path.basename(src_img)}",
            json.dumps(probs),
            72,
            "Deep Learning CNN Model",
            "Sector Alpha Plot",
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ))
        print(f"Seeded: {scan_id} - {d_name} ({conf}%)")

conn.commit()
conn.close()
print("Done seeding database!")
