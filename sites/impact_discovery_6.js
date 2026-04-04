const accountSid = "IR9Yfq6ikDt47136577kPXBmtJoZopM5i1";
const authToken = "wcXTBcRmcy5aMPmpp3zi--nkmZyozpiX";

async function testEndpoint(url, token) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    console.log(`${res.status} | ${url} | Bearer=${token.substring(0,4)}...`);
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
  const url = `${base}/MediaPartners/${accountSid}/Account.json`;
  const url2 = `${base}/MediaPartners/Account.json`;

  await testEndpoint(url, accountSid);
  await testEndpoint(url, authToken);
  await testEndpoint(url2, accountSid);
  await testEndpoint(url2, authToken);
}

run();
