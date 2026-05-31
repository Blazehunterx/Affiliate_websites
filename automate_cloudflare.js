const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  try {
    console.log("Launching clean headful Chrome...");
    const browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: false,
      defaultViewport: null,
      args: [
        "--start-maximized",
        "--disable-blink-features=AutomationControlled",
        "--exclude-switches=enable-automation"
      ]
    });
    
    const pages = await browser.pages();
    const page = pages[0] || await browser.newPage();
    
    // Bypass automation checks
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => undefined
      });
    });
    
    console.log("Navigating to Cloudflare Dashboard...");
    await page.goto("https://dash.cloudflare.com/", {
      waitUntil: "networkidle2"
    });
    
    while (true) {
      const url = page.url();
      console.log(`Current URL: ${url}`);
      
      try {
        await page.screenshot({ path: "C:\\Users\\marvi\\.gemini\\antigravity\\brain\\b045f834-ad94-4223-a443-6b94e1e42da2\\cloudflare_screen.png" });
        fs.writeFileSync("C:\\Users\\marvi\\.gemini\\antigravity\\brain\\b045f834-ad94-4223-a443-6b94e1e42da2\\cloudflare_url.txt", url);
      } catch (e) {
        console.error("Screenshot failed:", e.message);
      }
      
      await new Promise(r => setTimeout(r, 4000));
    }
  } catch (err) {
    console.error("Error in browser automation:", err);
  }
})();
