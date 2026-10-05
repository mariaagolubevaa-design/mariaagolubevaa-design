const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('file:///Users/mariagolubeva/mariaagolubevaa-design/12storeez.html');
  await page.waitForLoadState('networkidle');

  // Scroll to Insights section
  await page.evaluate(() => {
    const section = document.querySelector('.ut-insights-block') || 
                    Array.from(document.querySelectorAll('*')).find(el => el.textContent.includes('Инсайт'));
    if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(500);

  // Click the 2nd dot to go to slide 2
  const dots = await page.$$('.ut-insights__dot');
  console.log('Dots found:', dots.length);
  if (dots.length >= 2) {
    await dots[1].click();
    await page.waitForTimeout(500);
  }

  // Get the bounding box of the insights block
  const block = await page.$('.ut-insights-block') || await page.$('[class*="insights"]');
  if (block) {
    const box = await block.boundingBox();
    console.log('Block box:', JSON.stringify(box));
    await page.screenshot({ path: '/tmp/insights_slide2.png', clip: box });
  } else {
    await page.screenshot({ path: '/tmp/insights_slide2.png' });
  }

  await browser.close();
  console.log('Done');
})();
