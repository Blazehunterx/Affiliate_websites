const { google } = require('googleapis');

const PKEY = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDGOEYrhJFn4PJi
Th/D1ZJCHAliUbADcDoori5MN3Xt0sL/PhZojTc3nSkMd0jq+8Bn3oYs+YTE+pSk
UgAJX2IqxdBRjZd5AzHbLp1M+zUhlMBc7sNSRPSs/dpy4Lynfg2/O/kVBLvbtGvG
tB/m0C5QKZRpv7sFklXKR3R/86Pyc498Gp38f3W92B58lhaaD7ncEkl2kI+PMPb6
M/izC7bj4IGajMYQraTwkjV3XSYdDGO+yvwkRi0uMYMLWQCdjPr8QS5Y7DMfhnGS
89DF3HN5MDYNoEMC1tiMnuveLHqHApGmLcWk4G5YrnXb8oOckpxLh+oRBEkP3SXA
ed8XBY9BAgMBAAECggEALTAyCwS3U1usVi3iPvZm1+xlVUUzH62LjK+cvWJdX6DP
NHoWiLI81tBcxctB09QdunA33XPqyS8pCMbq3Dgi/IZJJfZmBD/usz2Ovbh9FdFA
A0+pNo2iy/c5QDwstfBeOOz2rUx9eSpJ8awpo6htDnhULcF4ZN5F8Y3VqL/F7eTz
436ajyLjr4GJ1e9LL329GLT98RWKNXJHQx5TSrkWkx/jr/lq2sZTxwwVzHmKJEzE
sqU9alMA2pBeRkP4Skz4tNB4P+cGrGVprLTtWKK0YHskZKTa8X+MSoBldK6p/7yY
kQOS1JC7dmIjtihzk+rjdgolroYUlxLIpK4YnlR+2QKBgQD+nmC7r4v0EBr2FDRg
QhdiPuUi+kU32v3G+/A4np19ovDpikpv4b/GFl6wJRCpls56K60U4L958HJLhwTV
8z8yzB5N9xbezDdYvwY4GijsfmKEemEFrKsXUqFXmYOOKYF4/cljZiL1Kgy+sNpO
nrFaFwGEzbAFvNZHMHeGrITgI5QKBgQDHS5FcEoOwYYL62xQmefMJnjhWMhNxxBNO
DsW6A2jLoZWdXEZvTKVmEFuMyFeP3RK5fxICyhpdBvJS3IrRDhdp5ln6+jCUHnbb
T/1b/MF7s7HGYVr0EBclO2JBI1+v0CrpmHrvhIupmkc+NblLRF/6h5gL9HohvQoD
FrY8IEcTLQKBgFYx83lWIkDLOvVXPavgc94UgKlopAoWnpbAL0BboeEoSfolkLFz
cOJ0LDXhNlTS8q81HfDVbLyxA2BCIwbyw9BEfXXTUfC2nX3znP1dDcGRv3Qtoa60
F29bz7bCB2EW9/enood9yhPI2murnxvHB7tbtwwbYhjtv5+j9gNiyX9pAoGABv28
pKk1m2tgR+KFi2/9uZmmSkfJbNU/BB76irLx6yrI79M72U2sA6+RNpgUkkRkEsPF
YvmqARdsSsHX0MuYwKtG/snmCFwlOT5OGfr84pUEKHxjz2n9Fd5GbRiLk8ROrREf
RuW0bIev9hu2W1CTuVsmV00FN8fE4STb0bIkLCUCgYAChOUInbXQ/xsrd7WofipS
RUaYoVjkpS3aMHIwy+iEp5QJiiYFU2VnFu9dUdQbCqjii8aNzNNwKEgt01JGpbyd
J6EBkH9Caspz9+2iOH/A9eKQQdD5rCl5EaYbo7CDziDCtb6c3RWkpToZWKSzoZHa
7D7HKvli3hRyAdFtatY6Hg==
-----END PRIVATE KEY-----`;

const EMAIL = 'msm-indexer-200@shopping-os-indexer.iam.gserviceaccount.com';

async function hardForceTest() {
    console.log("🛠️ HARD-FORCE Test: Google Indexing API...");
    
    try {
        const client = new google.auth.JWT(
            EMAIL,
            null,
            PKEY,
            ['https://www.googleapis.com/auth/indexing']
        );

        await client.authorize();
        console.log("✅ OAuth Handshake: SUCCESS.");

        const indexing = google.indexing({
            version: 'v3',
            auth: client
        });

        const res = await indexing.urlNotifications.publish({
            requestBody: {
                url: 'https://marvinsluis-media.pages.dev/audit/the-dispatch/',
                type: 'URL_UPDATED'
            }
        });

        console.log("✨ GLOBAL SUCCESS! Response Code: " + res.status);
    } catch (e) {
        console.error("❌ FAILED: " + e.message);
    }
}

hardForceTest();
