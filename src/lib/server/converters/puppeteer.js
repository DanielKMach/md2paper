import puppeteer from "puppeteer";

export class PuppeteerConverter {

    /**
     * @param {string} doc
     * @returns {Promise<Buffer>}
     */
    async convert(doc) {
        const browser = await launch();
        const page = await browser.newPage();

        // Define o conteúdo HTML
        await page.setContent(doc);

        // Gere o PDF
        const pdf = await page.pdf({
            path: 'temp.pdf',
            format: 'A4',
            printBackground: true
        });

        page.close();

        return Buffer.from(pdf);
    }
}

/** @type {NodeJS.Timeout | null} */
let timeoutID;
/** @type {import('puppeteer').Browser | null} */
let browser;

async function launch() {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
        console.log('Closing browser');
        browser?.close();
        browser = null;
    }, 30000);

    if (browser) return browser;

    console.log('Launching browser');
    browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--mute-audio']
    });
    return browser;
}