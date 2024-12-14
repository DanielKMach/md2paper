import { spawn } from "child_process";
import { WritableStream } from "stream/web";
import { escapeCLI } from "../cli_util";

export class Wkhtmltopdf {

    /**
     * @param {string} doc
     * @returns {Promise<Buffer>}
     */
    async convert(doc) {
        /** @type {Promise<Buffer>} */
        const promise = new Promise((res, rej) => {
            let buffer = Buffer.from([]);

            const command = `${escapeCLI(doc)} | wkhtmltopdf - -`;
            const process = spawn('powershell', ['/c', command]);
            let stderr = "";

            process.stdout.on('data', (chunk) => buffer = Buffer.concat([buffer, chunk])); // buffer.write(String(chunk)));
            process.stderr.on('data', (chunk) => stderr += String(chunk));

            process.on('close', (code) => {
                if (code !== 0) {
                    rej(stderr);
                    return;
                }
                res(buffer);
            })
        });
        return promise;
    }
}