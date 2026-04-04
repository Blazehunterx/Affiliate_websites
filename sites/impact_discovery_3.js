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
        console.log("SUCCESS DATA:", JSON.stringify(json).substring(0, 500));
        return true;
    }
  } catch (error) {}
  return false;
}

async function run() {
  const accountSidTrimmed = accountSid.trim();
  const base = "https://api.impact.com";
  
  const resources = [
    "/Partners",
    "/Mediapartners",
    "/Advertisers",
    "/Advocates"
  ];
  
  const endpoints = [
    "/Account",
    "/MediaProperties",
    ""
  ];

  for (const res of resources) {
    for (const ep of endpoints) {
        // Variation 1: Case sensitive
        await testEndpoint(`${base}${res}/${accountSidTrimmed}${ep}.json`);
        // Variation 2: Lowercase resource
        await testEndpoint(`${base}${res.toLowerCase()}/${accountSidTrimmed}${ep}.json`);
    }
  }
}

run();
