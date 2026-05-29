const fs = require('fs');
const path = require('path');

const MASTER_SYNC = path.join(__dirname, '..', 'master_sync');
const DIST = path.join(MASTER_SYNC, 'dist');

if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST, { recursive: true });
}

const niches = [
    'saas', 'gaming', 'travel', 'pet', 'fintech', 'vpn', 
    'wfh', 'outdoor', 'smarthome', 'aiproductivity', 'fashion', 'electronics'
];

console.log("Starting replication of niches to master_sync/dist in JS...");

// 1. Auto-copy Google verification HTML files
try {
    const files = fs.readdirSync(MASTER_SYNC);
    for (const f of files) {
        if (f.startsWith("google") && f.endsWith(".html")) {
            const srcFile = path.join(MASTER_SYNC, f);
            const dstFile = path.join(DIST, f);
            fs.copyFileSync(srcFile, dstFile);
            console.log(`Copied verification file ${f} to dist`);
        }
    }
} catch (e) {
    console.error(`Error copying verification files: ${e.message}`);
}

// 2. Copy the master sitemap, robots.txt, and index.html to dist
const filesToCopy = ["sitemap_msm_2026.xml", "sitemap.xml", "robots.txt", "index.html", "verification.html", "privacy.html"];
for (const f of filesToCopy) {
    const srcFile = path.join(MASTER_SYNC, f);
    const dstFile = path.join(DIST, f);
    if (fs.existsSync(srcFile)) {
        try {
            fs.copyFileSync(srcFile, dstFile);
            console.log(`Copied file ${f} to dist`);
        } catch (e) {
            console.error(`Error copying file ${f}: ${e.message}`);
        }
    }
}

// 3. Copy niche folders
for (const niche of niches) {
    const srcDir = path.join(MASTER_SYNC, niche);
    const dstDir = path.join(DIST, niche);
    
    if (fs.existsSync(srcDir)) {
        try {
            if (fs.existsSync(dstDir)) {
                fs.rmSync(dstDir, { recursive: true, force: true });
            }
            fs.cpSync(srcDir, dstDir, { recursive: true });
            console.log(`Copied directory ${niche} to dist`);
        } catch (e) {
            console.error(`Error copying directory ${niche} to dist: ${e.message}`);
        }
    } else {
        console.log(`Directory not found: ${srcDir}`);
    }
}

console.log("Replication complete!");
