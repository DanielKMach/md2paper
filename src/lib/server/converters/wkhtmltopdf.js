import { spawn } from "child_process";
import fs from 'node:fs/promises'
import { escapeCLI } from "../cli_util";

export class WkhtmltopdfConverter {

    /** @type {'cli' | 'file'} */
    method

    /**
     * @param {'cli' | 'file'} method 
     */
    constructor(method) {
        this.method = method;
    }

    /**
     * @param {string} doc
     * @returns {Promise<Buffer>}
     */
    async convert(doc) {
        if (this.method === 'file')
            return await this.convertFile(doc);
        else
            return await this.convertStream(doc);
    }

    /**
     * @param {string} doc 
     * @returns {Promise<Buffer>}
     */
    async convertStream(doc) {
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

    /**
     * @param {string} doc 
     * @returns {Promise<Buffer>}
     */
    async convertFile(doc) {
        try {
            await fs.rm('temp.html', { force: true });
            await fs.writeFile('temp.html', doc, { encoding: 'utf-8', flag: 'w+' });

            /** @type {Promise<Buffer>} */
            return await new Promise((res, rej) => {
                let buffer = Buffer.from([]);
                const command = `wkhtmltopdf temp.html -`;
                const process = spawn('powershell', ['/c', command]);
                let stderr = "";

                process.stdout.on('data', (chunk) => {
                    buffer = Buffer.concat([buffer, chunk]);
                });
                process.stderr.on('data', (chunk) => {
                    stderr += String(chunk)
                });

                process.on('close', (code) => {
                    if (code !== 0) {
                        rej(stderr);
                        return;
                    }
                    res(buffer);
                })

                process.stdin.write(doc);
                process.stdin.end();
            });
        }
        catch (err) {
            await fs.rm('temp.html', { force: true });
            throw err;
        }
    }
}