import { marked } from "marked"

/**
 * @param {string} content 
 * @param {string[]} css_array
 * @returns {string}
 */
export function assemble(content, css_array) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                ${css_array.join('\n')}
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `
}

/** @param {string} md
 * @returns {Promise<string>}
 */
export function md2html(md) {
    return marked(md, { async: true });
}