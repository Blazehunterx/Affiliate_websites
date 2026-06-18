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

// 4. Copy tools folder from sites/site-00-agency-hub/tools to dist/tools
const srcToolsDir = path.join(__dirname, 'site-00-agency-hub', 'tools');
const dstToolsDir = path.join(DIST, 'tools');
if (fs.existsSync(srcToolsDir)) {
    try {
        if (fs.existsSync(dstToolsDir)) {
            fs.rmSync(dstToolsDir, { recursive: true, force: true });
        }
        fs.cpSync(srcToolsDir, dstToolsDir, { recursive: true });
        console.log("Copied tools directory to dist");
    } catch (e) {
        console.error(`Error copying tools directory to dist: ${e.message}`);
    }
} else {
    console.log(`Tools source directory not found: ${srcToolsDir}`);
}

// 5. Also copy audit pages to sites/site-00-agency-hub/dist (deployment target)
const SITE_DIST = path.join(__dirname, 'site-00-agency-hub', 'dist');
const EXCLUDE = ['dist', 'tools'];
const allNiches = fs.readdirSync(MASTER_SYNC).filter(d => {
    const full = path.join(MASTER_SYNC, d);
    return fs.statSync(full).isDirectory() && !EXCLUDE.includes(d);
});
let auditCount = 0;
for (const niche of allNiches) {
    const auditDir = path.join(MASTER_SYNC, niche, 'audit');
    if (!fs.existsSync(auditDir)) continue;
    const slugs = fs.readdirSync(auditDir).filter(s => fs.statSync(path.join(auditDir, s)).isDirectory());
    for (const slug of slugs) {
        const src = path.join(auditDir, slug, 'index.html');
        const dstDir = path.join(SITE_DIST, niche, 'audit', slug);
        const dst = path.join(dstDir, 'index.html');
        if (fs.existsSync(src)) {
            fs.mkdirSync(dstDir, { recursive: true });
            fs.copyFileSync(src, dst);
            auditCount++;
        }
    }
}
if (auditCount > 0) {
    console.log(`Copied ${auditCount} pre-rendered audit pages to sites/${path.basename(path.dirname(SITE_DIST))}/dist`);
}

console.log("Replication complete!");
