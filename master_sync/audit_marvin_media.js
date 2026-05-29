const fs = require('fs');

const TOKEN = '4f17535e-238f-4921-a7d5-bc5bb24de21f';

async function auditMarvinMedia() {
    console.log("📡 Auditing MarvinMedia Awin Account...");
    try {
        // 1. Get Account Info (to find PUB ID)
        const accResponse = await fetch('https://api.awin.com/accounts', {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const accounts = await accResponse.json();
        console.log("✅ Accounts Found:", JSON.stringify(accounts, null, 2));

        if (!accounts || accounts.length === 0) {
            console.error("❌ No accounts found for this token.");
            return;
        }

        const pubId = accounts[0].id;
        console.log(`🔎 Targeted Publisher ID: ${pubId}`);

        // 2. Look for Joined Programs
        const progResponse = await fetch(`https://api.awin.com/publishers/${pubId}/programmes?relationship=joined`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const joined = await progResponse.json();
        console.log(`✅ Joined Programs: ${joined.length}`);

        // 3. Check for Data Feeds availability
        // Note: feeds are often at https://api.awin.com/publishers/{pubId}/productfeeds
        const feedResponse = await fetch(`https://api.awin.com/publishers/${pubId}/productfeeds`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const feeds = await feedResponse.json();
        console.log(`✅ Product Feeds Available: ${feeds.length || 0}`);

        const report = {
            publisher: accounts[0],
            joinedCount: joined.length,
            feeds: feeds,
            samplePrograms: joined.slice(0, 10).map(p => ({ id: p.id, name: p.name }))
        };

        fs.writeFileSync('MarvinMedia_audit_report.json', JSON.stringify(report, null, 2));
        console.log("🚀 Audit Report Saved: MarvinMedia_audit_report.json");

    } catch (error) {
        console.error("❌ Audit Error:", error.message);
    }
}

auditMarvinMedia();
