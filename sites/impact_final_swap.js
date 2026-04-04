const accountSid = "IR9Yfq6ikDt47136577kPXBmtJoZopM5i1";
const authToken = "wcXTBcRmcy5aMPmpp3zi--nkmZyozpiX";

async function testEndpoint(url, user, pass) {
  const auth = Buffer.from(`${user}:${pass}`).toString('base64');
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });
    console.log(`${res.status} | User=${user.substring(0,4)}... | Pass=${pass.substring(0,4)}...`);
    if (res.ok) {
        console.log("SUCCESS!");
        return true;
    }
  } catch (error) {}
  return false;
}

async function run() {
  const base = "https://api.impact.com/MediaPartners/IR9Yfq6ikDt47136577kPXBmtJoZopM5i1/Campaigns.json";
  
  console.log("Testing Standard (SID:Token)...");
  await testEndpoint(base, accountSid, authToken);
  
  console.log("\nTesting Swapped (Token:SID)...");
  await testEndpoint(base, authToken, accountSid);
}

run();
