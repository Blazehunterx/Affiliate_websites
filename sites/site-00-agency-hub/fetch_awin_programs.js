const https = require('https');
const fs = require('fs');
const path = require('path');

const API_CONFIG = {
    token: '6975f078-a13b-4265-b772-76b99ea46fd6',
    publisherId: '2834344'
};

const options = {
    hostname: 'api.awin.com',
    path: `/publishers/${API_CONFIG.publisherId}/programmes?relationship=joined`,
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${API_CONFIG.token}`
    }
};

console.log(`[*] Fetching joined programs for Publisher ${API_CONFIG.publisherId}...`);

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const programs = JSON.parse(data);
            if (Array.isArray(programs)) {
                const dataPath = path.join(__dirname, 'awin_programs_full.json');
                fs.writeFileSync(dataPath, JSON.stringify(programs, null, 2));
                console.log(`[+] Success! Saved ${programs.length} programs to: ${dataPath}`);
            } else {
                console.error('[!] Unexpected data format:', typeof programs);
                console.log('Response excerpt:', data.substring(0, 500));
            }
        } catch (e) {
            console.error('[!] Failed to parse JSON response:', e.message);
            console.log('Raw data excerpt:', data.substring(0, 500));
        }
    });
});

req.on('error', (error) => {
    console.error('[!] HTTP Request Error:', error.message);
});

req.end();
