import { WkhtmltopdfConverter } from "./wkhtmltopdf";
import { PuppeteerConverter } from "./puppeteer";

/**
 * @typedef Converter
 * @property {(doc: string) => Promise<Buffer>} convert
 */

export {
    WkhtmltopdfConverter,
    PuppeteerConverter
}