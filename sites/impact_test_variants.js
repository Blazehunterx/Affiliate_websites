const accountSid = "IR9Yfq6ikDt47136577kPXBmtJoZopM5i1";
const authToken = "wcXTBcRmcy5aMPmpp3zi--nkmZyozpiX";

const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

async function testEndpoint(url) {
  console.log(`\n--- Testing: ${url} ---`);
  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });
    console.log(`Status: ${res.status}`);
    const text = await res.text();
    if (res.ok) {
        try {
            console.log(JSON.stringify(JSON.parse(text), null, 2));
        } catch (e) {
            console.log("Response text (not JSON):", text.substring(0, 500));
        }
    } else {
      console.log("Error body:", text.substring(0, 500));
    }
  } catch (error) {
    console.error("Fetch Error:", error.message);
  }
}

async function run() {
  const accountSidTrimmed = accountSid.trim();
  
  const variants = [
    `https://api.impact.com/Partners/${accountSidTrimmed}/Account.json`,
    `https://api.impact.com/v1/Partners/${accountSidTrimmed}/Account.json`,
    `https://api.impact.com/Partners/${accountSidTrimmed}/MediaProperties.json`,
    `https://api.impact.com/v1/Partners/${accountSidTrimmed}/MediaProperties.json`
  ];

  for (const url of variants) {
    await testEndpoint(url);
  }
}

run();
