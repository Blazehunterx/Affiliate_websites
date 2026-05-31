const fs = require('fs');
const path = require('path');

const BASE_PATH = "c:\\Users\\marvi\\.gemini\\antigravity\\playground\\orbital-aphelion\\sites";
const SOURCE_COMP_DIR = path.join(BASE_PATH, "site-02-gaming-hub", "src", "components");

const HUBS = [
    "site-01-saas-rebuild",
    "site-03-travel-rebuild",
    "site-04-pet-rebuild",
    "site-05-fintech-rebuild",
    "site-06-vpn-rebuild",
    "site-07-wfh-rebuild",
    "site-08-outdoor-rebuild",
    "site-09-smarthome-rebuild",
    "site-10-aiproductivity-rebuild",
    "site-11-fashion-rebuild",
    "site-12-electronics-rebuild",
];

const files = fs.readdirSync(SOURCE_COMP_DIR).filter(f => f.endsWith(".jsx"));

HUBS.forEach(hubDir => {
    const dstCompDir = path.join(BASE_PATH, hubDir, "src", "components");
    if (fs.existsSync(dstCompDir)) {
        console.log(`📦 [SYNCING COMPONENTS] ${hubDir}`);
        files.forEach(file => {
            fs.copyFileSync(path.join(SOURCE_COMP_DIR, file), path.join(dstCompDir, file));
        });
    }
});

console.log("\n✅ ALL HUB COMPONENTS SYNCED.");
