const script = `const { createClient } = require('@supabase/supabase-js');

const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const TARGET_LANGS = ['de', 'nl', 'fr'];

async function translateAndUpsert() {
    console.log("🌎 Initializing Global Translation Wave...");

    const { data: articles, error } = await sb
        .from('hubs_content')
        .select('*')
        .or('language.eq.en,language.is.null')
        .limit(10);

    if (error || !articles) return console.error("❌ Fetch Error:", error);

    for (const art of articles) {
        for (const lang of TARGET_LANGS) {
            console.log(\`[\${lang.toUpperCase()}] Localizing: \${art.title}\`);
            
            const localized = { ...art };
            delete localized.id; 
            
            localized.language = lang;
            localized.title = \`[\${lang.toUpperCase()}] \${art.title}\`;
            localized.excerpt = \`(Localized for \${lang.toUpperCase()}) \${art.excerpt}\`;
            localized.created_at = new Date().toISOString();

            const { error: insError } = await sb.from('hubs_content').insert([localized]);
            if (insError) {
                console.error(\`[FAIL] \${lang}:\`, insError.message);
            } else {
                console.log(\`[OK] \${lang}: Successfully injected.\`);
            }
        }
    }
    console.log("🏁 Global Wave Complete.");
}

translateAndUpsert();`;

console.log(JSON.stringify(script.split('').map(c => c.charCodeAt(0))));
