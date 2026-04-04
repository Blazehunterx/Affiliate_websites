const accountSid = "IR9Yfq6ikDt47136577kPXBmtJoZopM5i1";
const authToken = "wcXTBcRmcy5aMPmpp3zi--nkmZyozpiX";

const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

async function testEndpoint(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });
    console.log(`${res.status} | ${url}`);
    if (res.ok) {
        const json = await res.json();
        console.log("SUCCESS DATA RECEIVED.");
        // Log keys to see what we got
        console.log("Keys:", Object.keys(json));
        // If it's a list, show first item
        const listKey = Object.keys(json).find(k => Array.isArray(json[k]));
        if (listKey && json[listKey].length > 0) {
            console.log("First item:", JSON.stringify(json[listKey][0], null, 2));
        } else {
            console.log("Full data:", JSON.stringify(json, null, 2).substring(0, 500));
        }
        return true;
    } else {
        const text = await res.text();
        console.log("ERROR BODY:", text.substring(0, 500));
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  return false;
}

async function run() {
  const base = `https://api.impact.com/MediaPartners/${accountSid}`;
  
  const endpoints = [
    "/Ads.json",
    "/Campaigns.json",
    "/Actions.json",
    "/Deals.json"
  ];

  for (const ep of endpoints) {
    await testEndpoint(`${base}${ep}`);
  }
}

run();
