const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'C:\\Users\\marvi\\.gemini\\antigravity\\playground\\orbital-aphelion\\sites';
const OLD_TOKEN = '6855ae7c-e682-4820-aaac-718e23c0bbde';
const NEW_TOKEN = '79bfbda9-eed4-4c40-9bc5-fa5dbe1bbd19';

const SITES = [
    'site-01-saas-rebuild',
    'site-02-gaming-hub',
    'site-03-travel-rebuild',
    'site-04-pet-rebuild',
    'site-05-fintech-rebuild',
    'site-06-vpn-rebuild',
    'site-07-wfh-rebuild',
    'site-08-outdoor-rebuild',
    'site-09-smarthome-rebuild',
    'site-10-aiproductivity-rebuild'
];

function updateFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace old Impact token
    if (content.includes(OLD_TOKEN)) {
        console.log(`[+] Updating Impact Token in: ${filePath}`);
        content = content.replace(OLD_TOKEN, NEW_TOKEN);
    } else if (!content.includes(NEW_TOKEN)) {
        // If it's missing entirely (like after a clean build), inject it after viewport
        console.log(`[+] Injecting New Impact Token in: ${filePath}`);
        content = content.replace(
            /<meta name="viewport" content="width=device-width, initial-scale=1.0" \/>/,
            `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta name='impact-site-verification' value='${NEW_TOKEN}'>`
        );
        // Also handle variant with double quotes or self-closing
        content = content.replace(
            /<meta name='viewport' content='width=device-width, initial-scale=1.0' \/>/,
             `<meta name='viewport' content='width=device-width, initial-scale=1.0' />\n    <meta name='impact-site-verification' value='${NEW_TOKEN}'>`
        );
    }

    fs.writeFileSync(filePath, content);
}

SITES.forEach(site => {
    const indexPath = path.join(ROOT_DIR, site, 'index.html');
    updateFile(indexPath);
    
    // Also update any built files in dist to be safe
    const distPath = path.join(ROOT_DIR, site, 'dist', 'index.html');
    updateFile(distPath);
});

console.log('[COMPLETE] Mass verification update finished.');
