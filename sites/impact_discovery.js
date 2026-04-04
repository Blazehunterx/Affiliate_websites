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
  } catch (error) {
    // console.error("Error:", error.message);
  }
  return false;
}

async function run() {
  const accountSidTrimmed = accountSid.trim();
  const base = "https://api.impact.com";
  
  const endpoints = [
    "/Partners",
    "/Accounts",
    "/Account"
  ];
  
  const versions = [
    "",
    "/v1",
    "/v12",
    "/v13",
    "/v14",
    "/v15"
  ];

  const extensions = [
    "",
    ".json"
  ];

  for (const v of versions) {
    for (const ep of endpoints) {
        for (const ext of extensions) {
            // Path structure 1: /Partners/{SID}/Account
            const url1 = `${base}${v}/Partners/${accountSidTrimmed}${ep}${ext}`;
            await testEndpoint(url1);
            
            // Path structure 2: /Partners/Account
            const url2 = `${base}${v}/Partners${ep}${ext}`;
            await testEndpoint(url2);
        }
    }
  }
}

run();
