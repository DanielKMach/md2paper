import { marked } from "marked"

/**
 * @typedef DocumentManifest
 * @type {object}
 * @property {string} content
 * @property {string[]} styles
 * @property {{[key: string]: any}} config
 */

/**
 * @param {DocumentManifest} pdfManifest 
 * @returns {Promise<string>}
 */
export async function assemble(pdfManifest) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                ${pdfManifest.styles.join('\n')}
            </style>
        </head>
        <body>
            ${await md2html(pdfManifest.content)}
        </body>
        </html>
    `
}

/**
 * @param {string} md
 * @returns {Promise<string>}
 */
export function md2html(md) {
    return marked(md, { async: true });
}

/**
 * @param {string} md 
 * @param {string[]} css 
 * @param {any} config 
 * @returns {DocumentManifest}
 */
export function manifest(md, css, config) {
    return { content: md, styles: css, config }
}

/**
 * @param {Blob} blob 
 * @param {string} filename 
 */
export function download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}