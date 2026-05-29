/**
 * Google Indexing API Controller v1.0 | Marvin Sluis Media Group
 * This script bypasses manual GSC quotas to force-index new audits.
 */
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const KEY_FILE = path.join(__dirname, 'google_indexing_service_account.json');
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

/**
 * Auths and pushes a URL to the Google Indexing API.
 * @param {string} url The audit URL to index.
 */
async function forceIndexURL(url) {
    try {
        const keyData = require(KEY_FILE);
        const auth = google.auth.fromJSON(keyData);
        auth.scopes = SCOPES;

        await auth.authorize();

        const indexing = google.indexing({
            version: 'v3',
            auth: auth
        });

        console.log(`📡 [G-INDEX] Force-Pushing: ${url}`);
        
        const res = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED'
            }
        });

        if (res.status === 200) {
            console.log(`✅ [G-INDEX] Success: ${url}`);
            return true;
        }
    } catch (e) {
        console.error(`❌ [G-INDEX] Failed for ${url}: ${e.message}`);
        return false;
    }
}

/**
 * Batch indexer for the Daily Dispatch.
 * @param {Array} urls List of audit URLs to index.
 */
async function batchIndexAudits(urls) {
    console.log(`🚀 Starting Global Indexing Pulse (${urls.length} URLs)...`);
    for (const url of urls) {
        await forceIndexURL(url);
        // Small delay to respect API quotas (default 200/day)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log("✨ Indexing Pulse: COMPLETE.");
}

module.exports = { forceIndexURL, batchIndexAudits };
