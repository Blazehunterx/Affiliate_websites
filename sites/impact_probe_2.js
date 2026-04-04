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
    }
  } catch (error) {}
  return false;
}

async function run() {
  const base = "https://api.impact.com";
  
  const endpoints = [
    "/Partners/Account",
    "/v1/Partners/Account",
    "/Partners/MediaProperties",
    "/v1/Partners/MediaProperties"
  ];

  for (const ep of endpoints) {
    await testEndpoint(`${base}${ep}`);
    await testEndpoint(`${base}${ep}.json`);
  }
}

run();
