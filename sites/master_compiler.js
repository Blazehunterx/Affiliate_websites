const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_PATH = "c:\\Users\\marvi\\.gemini\\antigravity\\playground\\orbital-aphelion\\sites";
const MASTER_SYNC = path.join(BASE_PATH, "..", "master_sync");

const HUBS = [
    { dirPath: "site-00-agency-hub", route: "" }, // Root
    { dirPath: "site-01-saas-rebuild", route: "saas" },
    { dirPath: "site-02-gaming-hub", route: "gaming" },
    { dirPath: "site-03-travel-rebuild", route: "travel" },
    { dirPath: "site-04-pet-rebuild", route: "pet" },
    { dirPath: "site-05-fintech-rebuild", route: "fintech" },
    { dirPath: "site-06-vpn-rebuild", route: "vpn" },
    { dirPath: "site-07-wfh-rebuild", route: "wfh" },
    { dirPath: "site-08-outdoor-rebuild", route: "outdoor" },
    { dirPath: "site-09-smarthome-rebuild", route: "smarthome" },
    { dirPath: "site-10-aiproductivity-rebuild", route: "aiproductivity" },
    { dirPath: "site-11-fashion-rebuild", route: "fashion" },
    { dirPath: "site-12-electronics-rebuild", route: "electronics" },
];

async function compileAll() {
    if (!fs.existsSync(MASTER_SYNC)) fs.mkdirSync(MASTER_SYNC, { recursive: true });

    for (const hub of HUBS) {
        const hubPath = path.join(BASE_PATH, hub.dirPath);
        if (!fs.existsSync(hubPath)) {
            console.warn(`âš ï¸ Skipping ${hub.dirPath} - Not found.`);
            continue;
        }

        console.log(`\nðŸ“¦ [BUILDING] ${hub.dirPath} -> /${hub.route}`);
        
        try {
            // Agency Hub is raw HTML/JS mostly, others are React/Vite
            if (hub.dirPath === "site-00-agency-hub") {
                const target = path.join(MASTER_SYNC);
                fs.cpSync(hubPath, target, { recursive: true });
                console.log(`âœ… Agency Hub (Root) copied.`);
                continue;
            }

            // Run npm install and Vite Build
            console.log(`\nInstalling dependencies in ${hub.dirPath}...`);
            execSync('npm install', { cwd: hubPath, stdio: 'inherit' });
            console.log(`\nRunning npm run build in ${hub.dirPath}...`);
            execSync('npm run build', { cwd: hubPath, stdio: 'inherit' });

            const distPath = path.join(hubPath, "dist");
            const targetPath = path.join(MASTER_SYNC, hub.route);
            
            if (fs.existsSync(targetPath)) fs.rmSync(targetPath, { recursive: true });
            fs.mkdirSync(targetPath, { recursive: true });
            
            fs.cpSync(distPath, targetPath, { recursive: true });
            console.log(`âœ… ${hub.niche || hub.route} Deployed to /${hub.route}`);

        } catch (e) {
            console.error(`âŒ Build failed for ${hub.dirPath}: ${e.message}`);
        }
    }

    console.log("\n📦 Running Static Site Generation (SSG) Pre-renderer..."); try { execSync("node ssg_prerender.js", { cwd: BASE_PATH, stdio: "inherit" }); } catch (err) { console.error("❌ SSG Pre-renderer failed:", err.message); } console.log("\n🏁 [FINAL] Master Sync Distribution Ready in /master_sync");
    try {
        console.log("\n📦 Replicating compiled hubs to dist folder...");
        execSync("node copy_to_dist.js", { cwd: BASE_PATH, stdio: "inherit" });
    } catch (err) {
        console.error("❌ Replication to dist failed:", err.message);
    }
}

compileAll();
