const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('file:///Users/mariagolubeva/mariaagolubevaa-design/12storeez.html');
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    const block = document.querySelector('.ut-insights-block');
    if (block) block.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(500);

  const dots = await page.$$('.ut-insights__dot');
  if (dots.length >= 2) {
    await dots[1].click();
    await page.waitForTimeout(600);
  }

  // Zoom in on the phone/screen area
  const phone = await page.$('.ut-insights-block__phone');
  if (phone) {
    const box = await phone.boundingBox();
    console.log('Phone box:', JSON.stringify(box));
    // Add some padding
    const clip = { x: box.x - 10, y: box.y - 10, width: box.width + 20, height: box.height + 20 };
    await page.screenshot({ path: '/tmp/insights_slide2_phone.png', clip });
  }

  await browser.close();
  console.log('Done');
})();
