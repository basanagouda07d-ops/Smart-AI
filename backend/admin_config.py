"""
AgriAI Permanent Administrator Credentials & Security Configuration
===================================================================
This configuration dynamically reads administrator credentials from backend/admin.txt
and provides role-based clearance verification for the Admin Gateway.
"""
import os

ADMIN_TXT_PATH = os.path.join(os.path.dirname(__file__), "admin.txt")

def load_admin_credentials_from_file():
    """
    Parses backend/admin.txt dynamically to retrieve the administrator email and password.
    Supports formats like:
      administrator gmail = admin@gmail.com
      administrator password = ADMIN2507
    """
    email = "admin@gmail.com"
    password = "ADMIN2507"

    if os.path.exists(ADMIN_TXT_PATH):
        try:
            with open(ADMIN_TXT_PATH, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith("#"):
                        continue
                    if "=" in line:
                        key, val = line.split("=", 1)
                        k = key.strip().lower()
                        v = val.strip()
                        if "gmail" in k or "email" in k or "user" in k:
                            email = v.lower()
                        elif "password" in k or "pass" in k:
                            password = v
        except Exception as e:
            print(f"[AdminConfig] Warning reading admin.txt: {e}")

    return email, password

def get_permanent_admin_profiles():
    """
    Returns current dictionary of administrator accounts, dynamically
    including the active credentials from backend/admin.txt.
    """
    file_email, file_pwd = load_admin_credentials_from_file()

    profiles = {
        file_email: {
            "id": "usr_admin_gmail",
            "email": file_email,
            "password": file_pwd,
            "full_name": "System Administrator",
            "role": "Administrator",
            "farm_name": "AgriAI Operations Center",
            "acreage": "Enterprise Core",
            "region": "Central Control",
            "auth_provider": "admin_portal",
            "created_at": "2026-01-01 00:00:00"
        },
        # Standard fallback alias
        "admin@agriai.com": {
            "id": "usr_admin_agriai",
            "email": "admin@agriai.com",
            "password": file_pwd,
            "full_name": "System Administrator",
            "role": "Administrator",
            "farm_name": "AgriAI Operations Center",
            "acreage": "Enterprise Core",
            "region": "Central Control",
            "auth_provider": "admin_portal",
            "created_at": "2026-01-01 00:00:00"
        }
    }
    return profiles

def verify_permanent_admin(email: str, password: str):
    """
    Validates provided credentials against admin.txt permanent administrator profiles.
    Returns the admin account dictionary if valid, None otherwise.
    """
    clean_email = (email or "").strip().lower()
    clean_pwd = (password or "").strip()

    profiles = get_permanent_admin_profiles()
    admin_profile = profiles.get(clean_email)
    if not admin_profile:
        return None

    if admin_profile["password"] == clean_pwd:
        return admin_profile.copy()

    return None

def get_permanent_admin_by_id(admin_id: str):
    profiles = get_permanent_admin_profiles()
    for profile in profiles.values():
        if profile.get("id") == admin_id:
            return profile.copy()
    return None

def get_permanent_admin_by_email(email: str):
    clean_email = (email or "").strip().lower()
    profiles = get_permanent_admin_profiles()
    return profiles.get(clean_email)

def update_admin_password_in_file(new_password: str) -> bool:
    """
    Updates the administrator password in backend/admin.txt.
    """
    if not os.path.exists(ADMIN_TXT_PATH):
        return False
    try:
        lines = []
        replaced = False
        with open(ADMIN_TXT_PATH, "r", encoding="utf-8") as f:
            for line in f:
                if "=" in line:
                    key, val = line.split("=", 1)
                    if "password" in key.lower() or "pass" in key.lower():
                        lines.append(f"{key.strip()} = {new_password}\n")
                        replaced = True
                        continue
                lines.append(line)
        if not replaced:
            lines.append(f"administrator password = {new_password}\n")
        with open(ADMIN_TXT_PATH, "w", encoding="utf-8") as f:
            f.writelines(lines)
        return True
    except Exception as e:
        print(f"[AdminConfig] Error updating admin.txt: {e}")
        return False
