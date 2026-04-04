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
    console.log(`${res.status} | ${url} | User=${user.substring(0,4)}...`);
    if (res.ok) {
        const text = await res.text();
        console.log("SUCCESS DATA:", text.substring(0, 500));
        return true;
    } else {
        const text = await res.text();
        console.log("ERROR BODY:", text.substring(0, 500));
    }
  } catch (error) {}
  return false;
}

async function run() {
  const base = "https://api.impact.com";
  
  // Versions mentioned in recent search results
  const versions = ["", "/v1", "/v14", "/v15"];
  
  for (const v of versions) {
    const url = `${base}${v}/MediaPartners/${accountSid}/Account.json`;
    
    // Try Standard: SID:Token
    await testEndpoint(url, accountSid, authToken);
    
    // Try Swapped: Token:SID
    await testEndpoint(url, authToken, accountSid);
  }
}

run();
