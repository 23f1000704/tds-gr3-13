const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Define the range of seeds provided in your task
  const seeds = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: 'networkidle' });

    // Scrape all numerical values from table cells
    const tableData = await page.$$eval('td', cells => 
      cells.map(td => td.innerText.trim())
           .map(text => parseFloat(text))
           .filter(num => !isNaN(num))
    );

    const pageSum = tableData.reduce((acc, val) => acc + val, 0);
    grandTotal += pageSum;
    
    console.log(`Seed ${seed} Sum: ${pageSum}`);
  }

  console.log('---');
  console.log(`FINAL_TOTAL_SUM: ${grandTotal}`);
  
  await browser.close();
})();