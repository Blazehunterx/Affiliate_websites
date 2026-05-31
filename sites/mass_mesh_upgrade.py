import os
import shutil
import re

# Configuration
BASE_PATH = r"c:\Users\marvi\.gemini\antigravity\playground\orbital-aphelion\sites"
SOURCE_HUB = os.path.join(BASE_PATH, "site-02-gaming-hub")
COMPONENTS_TO_COPY = ["MarvinIntentEngine.jsx", "NetworkMesh.jsx"]

HUBS = [
    {"dir": "site-01-saas-rebuild", "niche": "SaaS", "color": "#3b82f6"},
    {"dir": "site-03-travel-rebuild", "niche": "Travel", "color": "#10b981"},
    {"dir": "site-04-pet-rebuild", "niche": "Pet", "color": "#f59e0b"},
    {"dir": "site-05-fintech-rebuild", "niche": "FinTech", "color": "#6366f1"},
    {"dir": "site-06-vpn-rebuild", "niche": "VPN", "color": "#ef4444"},
    {"dir": "site-07-wfh-rebuild", "niche": "WFH", "color": "#8b5cf6"},
    {"dir": "site-08-outdoor-rebuild", "niche": "Outdoor", "color": "#22c55e"},
    {"dir": "site-09-smarthome-rebuild", "niche": "SmartHome", "color": "#06b6d4"},
    {"dir": "site-10-aiproductivity-rebuild", "niche": "AIProductivity", "color": "#ec4899"},
    {"dir": "site-11-fashion-rebuild", "niche": "Fashion", "color": "#f43f5e"},
    {"dir": "site-12-electronics-rebuild", "niche": "Electronics", "color": "#f97316"},
]

def upgrade_hub(hub):
    target_dir = os.path.join(BASE_PATH, hub["dir"])
    if not os.path.exists(target_dir):
        print(f"⚠️ Skipping {hub['dir']} - Directory not found.")
        return

    print(f"🚀 Upgrading {hub['niche']}...")

    # 1. Copy Components
    src_comp_dir = os.path.join(SOURCE_HUB, "src", "components")
    dst_comp_dir = os.path.join(target_dir, "src", "components")
    os.makedirs(dst_comp_dir, exist_ok=True)
    
    for comp in COMPONENTS_TO_COPY:
        shutil.copy2(os.path.join(src_comp_dir, comp), os.path.join(dst_comp_dir, comp))

    # 2. Update App.jsx (Simplified Logic)
    # We want to inject the primaryColor and the new components
    app_path = os.path.join(target_dir, "src", "App.jsx")
    if os.path.exists(app_path):
        with open(app_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Inject Imports
        if "MarvinIntentEngine" not in content:
            content = content.replace("import AuditDetail from './components/AuditDetail';", 
                                     "import AuditDetail from './components/AuditDetail';\nimport MarvinIntentEngine from './components/MarvinIntentEngine';\nimport NetworkMesh from './components/NetworkMesh';")
        
        # Update App state and theme
        content = re.sub(r'const niche = ".*?";', f'const niche = "{hub["niche"]}";\n  const primaryColor = "{hub["color"]}";', content)
        
        # Inject Intent Engine
        if "<MarvinIntentEngine" not in content:
            content = content.replace("<Routes>", f"<MarvinIntentEngine primaryColor={{primaryColor}} niche={{niche}} />\n        <Routes>")
        
        # Add NetworkMesh to MainDashboard (Footer area)
        if "<NetworkMesh" not in content:
            content = content.replace("<Magazine niche={niche} />", "<Magazine niche={niche} />\n      <NetworkMesh currentNiche={niche} />")

        with open(app_path, "w", encoding="utf-8") as f:
            f.write(content)

    # 3. Update AuditDetail.jsx
    audit_path = os.path.join(target_dir, "src", "components", "AuditDetail.jsx")
    # Instead of complex RegEx on AuditDetail, we copy the fixed one from Site-02 and adjust colors
    src_audit = os.path.join(SOURCE_HUB, "src", "components", "AuditDetail.jsx")
    if os.path.exists(src_audit):
        with open(src_audit, "r", encoding="utf-8") as f:
            audit_content = f.read()
        # Adjust default color in prop if necessary, though App.jsx passes it
        audit_content = audit_content.replace("#ef4444", hub["color"])
        with open(audit_path, "w", encoding="utf-8") as f:
            f.write(audit_content)

    print(f"✅ {hub['niche']} Upgraded.")

if __name__ == "__main__":
    for hub in HUBS:
        upgrade_hub(hub)
    print("\n🏁 ALL NODES SYNCED TO MESH v2.0")
