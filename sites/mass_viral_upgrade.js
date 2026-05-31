const fs = require('fs');
const path = require('path');

const SOURCE_PATH = 'site-02-gaming-hub/src/components/Magazine.jsx';
const TARGET_HUBS = [
    'site-01-saas-rebuild',
    'site-03-travel-rebuild',
    'site-04-pet-rebuild',
    'site-05-fintech-rebuild',
    'site-06-vpn-rebuild',
    'site-07-wfh-rebuild',
    'site-08-outdoor-rebuild',
    'site-09-smarthome-rebuild',
    'site-10-aiproductivity-rebuild',
    'site-11-fashion-rebuild',
    'site-12-electronics-rebuild'
];

console.log("🚀 Starting Global Viral Bar Upgrade...");

try {
    const sourceContent = fs.readFileSync(SOURCE_PATH, 'utf8');

    TARGET_HUBS.forEach(hub => {
        const targetFile = path.join(hub, 'src/components/Magazine.jsx');
        const targetDir = path.dirname(targetFile);

        if (fs.existsSync(targetDir)) {
            fs.writeFileSync(targetFile, sourceContent);
            console.log(`✅ Upgraded: ${hub}`);
        } else {
            console.warn(`⚠️ Skipping ${hub}: Component directory not found.`);
        }
    });

    console.log("\n✨ 12-Hub Viral Network Infrastructure: ACTIVATED.");
} catch (e) {
    console.error("❌ Upgrade Failed: " + e.message);
}
