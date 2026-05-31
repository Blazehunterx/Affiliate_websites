const puppeteer = require("puppeteer");

(async () => {
  try {
    console.log("Launching headful Chrome...");
    const browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: false,
      defaultViewport: null
    });
    
    console.log("Opening new page...");
    const page = await browser.newPage();
    
    console.log("Navigating to GSC file...");
    await page.goto("https://marvinsluis-media.pages.dev/google0487ecf4d8ab43eb.html", {
      waitUntil: "networkidle2"
    });
    
    console.log("Waiting 5 seconds...");
    await new Promise(r => setTimeout(r, 5000));
    
    console.log("Taking screenshot...");
    await page.screenshot({ path: "C:\\Users\\marvi\\.gemini\\antigravity\\brain\\b045f834-ad94-4223-a443-6b94e1e42da2\\chrome_test.png" });
    
    console.log("Closing browser...");
    await browser.close();
    console.log("Done!");
  } catch (err) {
    console.error("Error:", err);
  }
})();
