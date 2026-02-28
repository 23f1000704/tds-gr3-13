const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 11; seed <= 20; seed++) {
    const url = `https://sanand0.github.io/tdsdata/table_sum/index.html?seed=${seed}`;

    console.log(`Visiting Seed ${seed}...`);

    await page.goto(url, { waitUntil: "load", timeout: 60000 });

    // Hard wait to allow module JS execution
    await page.waitForTimeout(3000);

    const numbers = await page.$$eval("td", cells =>
      cells
        .map(td => parseInt(td.textContent.trim(), 10))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed} sum: ${sum}`);

    grandTotal += sum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();