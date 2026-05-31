const fs = require('fs');
const path = require('path');

const BASE_PATH = "c:\\Users\\marvi\\.gemini\\antigravity\\playground\\orbital-aphelion\\sites";
const SOURCE_HUB = path.join(BASE_PATH, "site-02-gaming-hub");

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

const sourcePkg = JSON.parse(fs.readFileSync(path.join(SOURCE_HUB, "package.json"), "utf8"));
const coreDeps = sourcePkg.dependencies;

HUBS.forEach(hubDir => {
    const pkgPath = path.join(BASE_PATH, hubDir, "package.json");
    if (fs.existsSync(pkgPath)) {
        console.log(`📦 [SYNCING DEPS] ${hubDir}`);
        const hubPkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        
        // Merge dependencies
        hubPkg.dependencies = { ...hubPkg.dependencies, ...coreDeps };
        
        fs.writeFileSync(pkgPath, JSON.stringify(hubPkg, null, 2));
    }
});

console.log("\n✅ ALL HUB DEPENDENCIES SYNCED.");
