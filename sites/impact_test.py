import requests
from requests.auth import HTTPBasicAuth
import json

account_sid = "IR9Yfq6ikDt47136577kPXBmtJoZopM5i1"
auth_token = "wcXTBcRmcy5aMPmpp3zi--nkmZyozpiX"

base_url = f"https://api.impact.com/Partners/{account_sid}"

if __name__ == "__main__":
    headers = {"Accept": "application/json"}
    
    # Test Account
    print(f"Testing Account: {account_sid}")
    r = requests.get(base_url, auth=HTTPBasicAuth(account_sid, auth_token), headers=headers)
    print(f"Account Status: {r.status_code}")
    if r.status_code == 200:
        print(json.dumps(r.json(), indent=2))
        
    # Get Media Properties
    print("\nGetting Media Properties...")
    r = requests.get(f"{base_url}/MediaProperties", auth=HTTPBasicAuth(account_sid, auth_token), headers=headers)
    print(f"Media Properties Status: {r.status_code}")
    if r.status_code == 200:
        print(json.dumps(r.json(), indent=2))
