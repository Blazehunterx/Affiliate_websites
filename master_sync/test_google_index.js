const { forceIndexURL } = require('./google_indexer');

async function testIndex() {
    console.log("🛠️ Testing Google Indexing API Handshake...");
    const testUrl = "https://marvinsluis-media.pages.dev/audit/the-dispatch/"; // Using a known live URL
    const success = await forceIndexURL(testUrl);
    
    if (success) {
        console.log("✨ TEST SUCCESS! Your Service Account is officially AUTHORIZED to push to Google.");
    } else {
        console.log("❌ TEST FAILED. Check if you added the email as an 'Owner' in Search Console.");
    }
}

testIndex();
