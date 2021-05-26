const puppeteer = require('puppeteer')

const app = async() => {

    try {
        const browser = await puppeteer.launch({ 
            headless: false,
            ignoreDefaultArgs: ["--enable-automation"]
        })
        const page = await browser.newPage();
        await page._client.send("Emulation.clearDeviceMetricsOverride")

        // setting user agent
        await page.setUserAgent(`Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36`)

        await page.goto(`https://web.whatsapp.com/`)

        // SEARCHES USER BY TITLE
        await page.waitForSelector("div[data-tab='6']")
        await delay(5000);

        // selecting contact
        const contactName = 'Anjali Gupta Linkedin'
        await page.click(`span[title='${contactName}']`)
        // await page.waitForSelector('._1JAUF')

        // focus on msgbar
        const editor = await page.$("div[data-tab='6']")
        await editor.focus()


        // no. of messages
        const amountOfMsg = 5;

        // automate msg
        for(let i = 0; i < amountOfMsg; i++) {
            await page.evaluate(() => {
                const message = `testing automate message vro`
                document.execCommand("InsertText", false, message)
            })
            await page.waitForSelector("span[data-testid='send']")
            await page.click("span[data-testid='send']")
            await delay(500)
        }

    } catch (error) {
        console.log(error);
    }

}

function delay(time){
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
app()