const axios = require('axios');

/**
 * Bonusarrive Advertiser Fetcher
 * Use this script to retrieve live merchant data for your 10 hubs.
 * Replace 'YOUR_BEARER_TOKEN' with your actual token from the dashboard.
 */

const API_CONFIG = {
    url: 'https://www.bonusarrive.com/slapi/service/advertisers',
    token: 'YOUR_BEARER_TOKEN', // Replace with your actual token
    m_id: 11167 // Your Member ID
};

async function fetchAdvertisers(page = 1) {
    try {
        console.log(`[*] Fetching Bonusarrive Advertisers (Page ${page})...`);
        
        const response = await axios.post(API_CONFIG.url, {
            per_page: 100,
            page: page,
            m_id: API_CONFIG.m_id
        }, {
            headers: {
                'Authorization': `Bearer ${API_CONFIG.token}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        if (response.data && response.data.data) {
            const advertisers = response.data.data;
            console.log(`[+] Successfully retrieved ${advertisers.length} advertisers.`);
            return advertisers;
        } else {
            console.error('[!] Unexpected API response format:', response.data);
            return [];
        }
    } catch (error) {
        console.error('[!] API Request Failed:', error.response ? error.response.data : error.message);
        return [];
    }
}

// Example usage: Fetch first 100
fetchAdvertisers(1).then(data => {
    if (data.length > 0) {
        // Here we will add logic to map these to saas, pet, travel etc.
        console.log('[*] Ready to map data to hubs.');
    }
});
