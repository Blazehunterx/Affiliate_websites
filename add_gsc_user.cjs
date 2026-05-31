const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  try {
    const wsUrl = process.env.AGY_BROWSER_WS_URL;
    if (!wsUrl) {
      console.error("AGY_BROWSER_WS_URL environment variable is not set!");
      process.exit(1);
    }
    console.log(`Connecting to browser at ${wsUrl}...`);
    const browser = await puppeteer.connect({ browserWSEndpoint: wsUrl, defaultViewport: null });
    
    console.log("Getting pages...");
    const pages = await browser.pages();
    // Open a new page or use the existing one
    const page = pages.length > 0 ? pages[0] : await browser.newPage();
    
    console.log("Navigating to GSC Users page...");
    await page.goto("https://search.google.com/search-console/users?resourceId=https://marvinsluis-media.pages.dev/", { waitUntil: "networkidle2" });
    
    console.log("Waiting 5 seconds for page content to load...");
    await new Promise(r => setTimeout(r, 5000));
    
    // Save initial screenshot to see if we're on the right page
    const screenshotPath = "C:\\Users\\marvi\\.gemini\ntigravity\\brain\\b045f834-ad94-4223-a443-6b94e1e42da2\\gsc_users_initial.png";
    await page.screenshot({ path: screenshotPath });
    console.log(`Saved initial screenshot to ${screenshotPath}`);

    const pageText = await page.evaluate(() => document.body.innerText);
    console.log("GSC Users page text snippet:\n", pageText.substring(0, 1000));

    // Try to find the "Add user" or "Gebruiker toevoegen" button
    // It usually has text "Gebruiker toevoegen" in Dutch or "Add user" in English
    const clickSuccess = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button, [role='button']"));
      const addBtn = buttons.find(b => 
        b.innerText.toLowerCase().includes("gebruiker toevoegen") || 
        b.innerText.toLowerCase().includes("add user")
      );
      if (addBtn) {
        addBtn.click();
        return { success: true, text: addBtn.innerText };
      }
      return { success: false, buttons: buttons.map(b => b.innerText) };
    });

    console.log("Click add user button result:", clickSuccess);

    if (!clickSuccess.success) {
      console.log("Could not find Add User button. Exiting.");
      process.exit(1);
    }

    console.log("Waiting 3 seconds for popup dialog...");
    await new Promise(r => setTimeout(r, 3000));

    // Fill in email and select owner role
    const fillSuccess = await page.evaluate(() => {
      // Find input element for email
      const inputs = Array.from(document.querySelectorAll("input[type='text'], input[type='email']"));
      // The email input usually has no specific ID but we can look for it
      // Let's filter inputs that are visible or have place holders
      const emailInput = inputs.find(input => {
        const style = window.getComputedStyle(input);
        return style.display !== 'none' && style.visibility !== 'hidden' && input.getAttribute('disabled') === null;
      });

      if (!emailInput) return { success: false, message: "Email input not found" };

      emailInput.value = "msm-indexer-200@shopping-os-indexer.iam.gserviceaccount.com";
      // Trigger change/input events
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      emailInput.dispatchEvent(new Event('change', { bubbles: true }));

      return { success: true, inputOuterHTML: emailInput.outerHTML };
    });

    console.log("Fill email result:", fillSuccess);

    // Let's take a screenshot after typing the email
    const typedScreenshotPath = "C:\\Users\\marvi\\.gemini\ntigravity\\brain\\b045f834-ad94-4223-a443-6b94e1e42da2\\gsc_users_typed.png";
    await page.screenshot({ path: typedScreenshotPath });
    console.log(`Saved typed screenshot to ${typedScreenshotPath}`);

    // Now let's click the permission role dropdown and select Owner / Eigenaar
    const roleSuccess = await page.evaluate(() => {
      // Find the dropdown
      // In Google GSC, the permission dropdown is usually a custom div with role="listbox" or class="ry3ee" / similar.
      // Let's find elements that display "Volledig" or "Full" or "Beperkt" or "Restricted"
      const dropdowns = Array.from(document.querySelectorAll("[role='listbox'], [aria-haspopup='listbox'], [jsname='V67aGc']"));
      // Let's print their texts
      return { foundDropdowns: dropdowns.map(d => d.innerText) };
    });
    console.log("Dropdown search result:", roleSuccess);

    // Let's select Owner
    const selectRoleSuccess = await page.evaluate(async () => {
      // Find listbox dropdown trigger
      const dropdownTrigger = Array.from(document.querySelectorAll("*")).find(el => 
        el.innerText && (el.innerText.includes("Volledig") || el.innerText.includes("Full") || el.innerText.includes("Beperkt") || el.innerText.includes("Restricted"))
      );
      if (!dropdownTrigger) return { success: false, message: "Dropdown trigger not found" };

      dropdownTrigger.click();
      await new Promise(r => setTimeout(r, 1000));

      // Find the Owner / Eigenaar option in the popped up menu
      const options = Array.from(document.querySelectorAll("[role='option'], span, div")).filter(el => 
        el.innerText && (el.innerText === "Eigenaar" || el.innerText === "Owner")
      );

      if (options.length === 0) return { success: false, message: "Owner option not found in menu" };

      options[0].click();
      return { success: true, selectedText: options[0].innerText };
    });

    console.log("Select owner role result:", selectRoleSuccess);

    // Wait 1 second and take screenshot
    await new Promise(r => setTimeout(r, 1000));
    const roleScreenshotPath = "C:\\Users\\marvi\\.gemini\ntigravity\\brain\\b045f834-ad94-4223-a443-6b94e1e42da2\\gsc_users_role.png";
    await page.screenshot({ path: roleScreenshotPath });
    console.log(`Saved role screenshot to ${roleScreenshotPath}`);

    // Now click the "Toevoegen" or "Add" button to submit
    const submitResult = await page.evaluate(() => {
      // The add button in the dialog usually has text "Toevoegen" or "Add"
      const buttons = Array.from(document.querySelectorAll("button, [role='button']"));
      // Filter out the main "Gebruiker toevoegen" button, we want the submit button in the dialog
      // The submit button inside the dialog usually has text "Toevoegen" or "Add"
      const submitBtn = buttons.find(b => 
        (b.innerText === "Toevoegen" || b.innerText === "Add") && 
        b.getAttribute('disabled') === null
      );
      if (submitBtn) {
        submitBtn.click();
        return { success: true, text: submitBtn.innerText };
      }
      return { success: false, message: "Submit button not found", buttonTexts: buttons.map(b => b.innerText) };
    });

    console.log("Submit result:", submitResult);

    // Wait 5 seconds for addition to persist and take final screenshot
    await new Promise(r => setTimeout(r, 5000));
    const finalScreenshotPath = "C:\\Users\\marvi\\.gemini\ntigravity\\brain\\b045f834-ad94-4223-a443-6b94e1e42da2\\gsc_users_final.png";
    await page.screenshot({ path: finalScreenshotPath });
    console.log(`Saved final screenshot to ${finalScreenshotPath}`);

  } catch (err) {
    console.error("Error adding GSC user:", err);
  }
})();
