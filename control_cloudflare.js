const puppeteer = require("puppeteer");

(async () => {
  try {
    const wsUrl = "ws://127.0.0.1:64869/devtools/browser/65d376e0-ce8c-4fa1-931a-f13e8bc6760d";
    console.log("Connecting to browser...");
    const browser = await puppeteer.connect({ browserWSEndpoint: wsUrl, defaultViewport: null });
    
    console.log("Getting pages...");
    const pages = await browser.pages();
    const page = pages.find(p => p.url().includes("google.com") || p.url().includes("search.google")) || pages[0];
    
    console.log(`Using page: ${page.url()}`);
    
    console.log("Navigating back to welcome page to ensure clean state...");
    await page.goto("https://search.google.com/search-console/welcome", { waitUntil: "networkidle2" });
    
    await new Promise(r => setTimeout(r, 3000));
    
    console.log("Waiting for URL prefix input...");
    const selector = "input[aria-label='https://www.example.com']";
    await page.waitForSelector(selector);
    
    console.log("Focusing and typing URL prefix...");
    await page.focus(selector);
    await page.type(selector, "https://marvinsluis-media.pages.dev/");
    
    await new Promise(r => setTimeout(r, 1000));
    
    console.log("Clicking the corresponding Continue button...");
    const clickedBtnHtml = await page.evaluate(() => {
      const input = document.querySelector("input[aria-label='https://www.example.com']");
      if (!input) return "Input not found";
      
      let container = input.parentElement;
      while (container && !container.innerText.includes("DOORGAAN") && !container.innerText.includes("CONTINUE")) {
        container = container.parentElement;
      }
      
      if (!container) return "Container not found";
      
      const buttons = Array.from(container.querySelectorAll("button, [role='button']"));
      const btn = buttons.find(b => b.innerText.includes("DOORGAAN") || b.innerText.includes("CONTINUE") || b.innerText.includes("Continue"));
      if (btn) {
        btn.click();
        return btn.outerHTML;
      }
      return "Button not found in container";
    });
    
    console.log("Clicked button HTML:", clickedBtnHtml);
    
    console.log("Waiting for GSC verification popup (10 seconds)...");
    await new Promise(r => setTimeout(r, 10000));
    
    console.log("Taking verification screenshot...");
    await page.screenshot({ path: "C:\\Users\\marvi\\.gemini\\antigravity\\brain\\b045f834-ad94-4223-a443-6b94e1e42da2\\gsc_verify.png" });
    console.log("Saved gsc_verify.png");
    
    const pageText = await page.evaluate(() => document.body.innerText);
    console.log("GSC verification page text snippet:\n", pageText.substring(0, 1500));
    
  } catch (err) {
    console.error("Error in GSC script:", err);
  }
})();
