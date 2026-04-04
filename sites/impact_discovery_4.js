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
        const text = await res.text();
        console.log("SUCCESS DATA:", text.substring(0, 500));
        return true;
    } else if (res.status === 403 || res.status === 401) {
        const text = await res.text();
        console.log("AUTH/PERMISSION ERROR BODY:", text.substring(0, 500));
    }
  } catch (error) {}
  return false;
}

async function run() {
  const accountSidTrimmed = accountSid.trim();
  const base = "https://api.impact.com";
  
  const resources = [
    "/Mediapartners",
    "/MediaPartners",
    "/mediapartners",
    "/Partners",
    "/partners"
  ];
  
  const endpoints = [
    "/Account",
    "/MediaProperties",
    ""
  ];

  for (const res of resources) {
    for (const ep of endpoints) {
        await testEndpoint(`${base}${res}/${accountSidTrimmed}${ep}.json`);
    }
  }
}

run();
