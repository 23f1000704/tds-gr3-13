const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 11; seed <= 20; seed++) {
    const url = `https://sanand0.github.io/tdsdata/table_sum/index.html?seed=${seed}`;

    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for tables to load
    await page.waitForSelector("table");

    // Extract all numbers from all tables
    const numbers = await page.$$eval("table td", cells =>
      cells.map(td => {
        const val = td.innerText.trim();
        return parseFloat(val);
      }).filter(n => !isNaN(n))
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