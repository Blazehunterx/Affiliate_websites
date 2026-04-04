const accountSid = "IR9Yfq6ikDt47136577kPXBmtJoZopM5i1";
const authToken = "wcXTBcRmcy5aMPmpp3zi--nkmZyozpiX";

const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
const baseUrl = `https://api.impact.com/Partners/${accountSid}`;

async function impactApi() {
  try {
    console.log(`Testing Account: ${accountSid}`);
    const accountRes = await fetch(baseUrl, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });
    console.log(`Account Status: ${accountRes.status}`);
    if (accountRes.ok) {
      console.log(JSON.stringify(await accountRes.json(), null, 2));
    } else {
      console.log(await accountRes.text());
    }

    console.log("\nGetting Media Properties...");
    const propertiesRes = await fetch(`${baseUrl}/MediaProperties`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });
    console.log(`Media Properties Status: ${propertiesRes.status}`);
    if (propertiesRes.ok) {
      console.log(JSON.stringify(await propertiesRes.json(), null, 2));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

impactApi();
