const fs = require('fs');
const path = require('path');

const BASE_PATH = "c:\\Users\\marvi\\.gemini\\antigravity\\playground\\orbital-aphelion\\sites";
const SOURCE_HUB = path.join(BASE_PATH, "site-02-gaming-hub");
const COMPONENTS_TO_COPY = ["MarvinIntentEngine.jsx", "NetworkMesh.jsx"];

const HUBS = [
    { dirPath: "site-01-saas-rebuild", niche: "SaaS", color: "#3b82f6" },
    { dirPath: "site-03-travel-rebuild", niche: "Travel", color: "#10b981" },
    { dirPath: "site-04-pet-rebuild", niche: "Pet", color: "#f59e0b" },
    { dirPath: "site-05-fintech-rebuild", niche: "FinTech", color: "#6366f1" },
    { dirPath: "site-06-vpn-rebuild", niche: "VPN", color: "#ef4444" },
    { dirPath: "site-07-wfh-rebuild", niche: "WFH", color: "#8b5cf6" },
    { dirPath: "site-08-outdoor-rebuild", niche: "Outdoor", color: "#22c55e" },
    { dirPath: "site-09-smarthome-rebuild", niche: "SmartHome", color: "#06b6d4" },
    { dirPath: "site-10-aiproductivity-rebuild", niche: "AIProductivity", color: "#ec4899" },
    { dirPath: "site-11-fashion-rebuild", niche: "Fashion", color: "#f43f5e" },
    { dirPath: "site-12-electronics-rebuild", niche: "Electronics", color: "#f97316" },
];

HUBS.forEach(hub => {
    const targetDir = path.join(BASE_PATH, hub.dirPath);
    if (!fs.existsSync(targetDir)) return;

    console.log(`🚀 Refining ${hub.niche}...`);

    // 1. Update App.jsx
    const appPath = path.join(targetDir, "src", "App.jsx");
    if (fs.existsSync(appPath)) {
        let content = fs.readFileSync(appPath, 'utf8');
        
        // Clean up previous failed attempts (remove duplicate primaryColor)
        content = content.replace(/const primaryColor = ".*?";\n  const primaryColor = ".*?";/, "");
        content = content.replace(/const primaryColor = ".*?";/g, ""); 
        content = content.replace(/const niche = ".*?";/g, "");

        // Inject Imports
        if (!content.includes("MarvinIntentEngine")) {
            content = content.replace("import AuditDetail from './components/AuditDetail';", 
                                     "import AuditDetail from './components/AuditDetail';\nimport MarvinIntentEngine from './components/MarvinIntentEngine';\nimport NetworkMesh from './components/NetworkMesh';");
        }

        // Re-inject cleanly
        content = content.replace("function App() {", `function App() {\n  const niche = "${hub.niche}";\n  const primaryColor = "${hub.color}";`);
        
        if (!content.includes("<MarvinIntentEngine")) {
            content = content.replace("<Routes>", `<MarvinIntentEngine primaryColor={primaryColor} niche={niche} />\n        <Routes>`);
        }

        if (!content.includes("<NetworkMesh")) {
            content = content.replace("<Magazine niche={niche} />", `<Magazine niche={niche} />\n      <NetworkMesh currentNiche={niche} />`);
        }

        fs.writeFileSync(appPath, content);
    }

    // 2. Update AuditDetail.jsx
    const auditPath = path.join(targetDir, "src", "components", "AuditDetail.jsx");
    const srcAudit = path.join(SOURCE_HUB, "src", "components", "AuditDetail.jsx");
    if (fs.existsSync(srcAudit)) {
        let auditContent = fs.readFileSync(srcAudit, 'utf8');
        auditContent = auditContent.replace(/import { SharedHeader } /g, "import SharedHeader ");
        auditContent = auditContent.replace(/#ef4444/g, hub.color);
        fs.writeFileSync(auditPath, auditContent);
    }
});

console.log("\n🏁 ALL NODES PROTOCOL RE-SYNCED.");
