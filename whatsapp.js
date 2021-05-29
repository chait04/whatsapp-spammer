const puppeteer = require('puppeteer');

const app = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      ignoreDefaultArgs: ['--enable-automation'],
    });
    const page = await browser.newPage();
    await page._client.send('Emulation.clearDeviceMetricsOverride');

    // setting user agent
    await page.setUserAgent(
      `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36`
    );

    await page.goto(`https://web.whatsapp.com/`);

    // SEARCHES USER BY TITLE
    await page.waitForSelector(`span[title="Your_contact"]`); //Enter you contac name here
    await delay(5000);

    // selecting contact
    const contactName = 'Contact_name'; //Contact Name
    await page.click(`span[title='${contactName}']`);

    // focus on msgbar
    const editor = await page.$(`div[data-tab="6"]`);
    await editor.focus();

    // number of messages you want to send
    const amountOfMsg = 100;

    // automate msg
    for (let i = 0; i < amountOfMsg; i++) {
      await page.evaluate(() => {
        //   write msg you want to send
        const message = `Sample text to your contact`; //Enter message
        document.execCommand('InsertText', false, message);
      });
      await page.waitForSelector("span[data-testid='send']");
      await page.click("span[data-testid='send']");
      await delay(500);
    }
  } catch (error) {
    console.log(error);
  }
};

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
app();
