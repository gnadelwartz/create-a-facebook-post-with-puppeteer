const newPostFormSelector = `div[aria-label="Add to your post"]`;

// Main function
(async () => {
  // Initiate puppeteer
  const puppeteer = require("puppeteer");

  // Initial settings
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "data",
  });

  // Get the page
  const page = (await browser.pages())[0];

  // Go to the Facebook page
  await page.goto("https://facebook.com", {
    waitUntil: "networkidle2",
  });

  // Use keyboard shortcut to open and focus on create new post
  await page.keyboard.press("KeyP");

  // Wait for the create new post form
  await page.waitForSelector(newPostFormSelector);

  // Write down our message
  await page.keyboard.type(`Hey, Facebook!`);

  // Submit the message
  await page.keyboard.down("Control");
  await page.keyboard.down("Enter");

  // Wait until the create new post form disappear
  await page.waitForSelector(newPostFormSelector, {
    hidden: true,
    visible: false,
  });

  // Close the browser
  await browser.close();
})();