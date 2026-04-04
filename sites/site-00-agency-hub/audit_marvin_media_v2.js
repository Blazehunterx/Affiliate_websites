const fs = require('fs');

const TOKEN = '4f17535e-238f-4921-a7d5-bc5bb24de21f';

async function auditMarvinMedia() {
    console.log("📡 Auditing MarvinMedia Awin Account (v2)...");
    try {
        // 1. Target known ID
        const pubId = '1595486';
        console.log(`🔎 Targeted Publisher ID: ${pubId}`);

        // 2. Look for Joined Programs
        const progResponse = await fetch(`https://api.awin.com/publishers/${pubId}/programmes?relationship=joined`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const joined = await progResponse.json();
        
        if (joined.error) {
            console.error("❌ Program Fetch Error:", joined.error.description);
            return;
        }

        console.log(`✅ Joined Programs: ${joined.length || 0}`);

        // 3. Check for Data Feeds availability
        const feedResponse = await fetch(`https://api.awin.com/publishers/${pubId}/productfeeds`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const feeds = await feedResponse.json();
        console.log(`✅ Product Feeds Available: ${feeds.length || 0}`);

        const report = {
            publisherId: pubId,
            joinedCount: joined.length || 0,
            feeds: feeds,
            samplePrograms: Array.isArray(joined) ? joined.slice(0, 10).map(p => ({ id: p.id, name: p.name, category: p.primaryRegion?.name })) : []
        };

        fs.writeFileSync('MarvinMedia_audit_report.json', JSON.stringify(report, null, 2));
        console.log("🚀 Audit Report Saved: MarvinMedia_audit_report.json");

    } catch (error) {
        console.error("❌ Audit Error:", error.message);
    }
}

auditMarvinMedia();
