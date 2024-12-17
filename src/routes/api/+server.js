import { assemble, md2html } from '$lib';
import { Wkhtmltopdf } from '$lib/server/converters/wkhtmltopdf.js';
import { error } from '@sveltejs/kit';

/** @type {Wkhtmltopdf} */
const converter = new Wkhtmltopdf('file');

/** @type {Promise<Buffer>[]} */
const pending = [];

export async function POST({ request }) {
    try {
        /** @type {import('$lib').DocumentManifest} */
        const doc = await request.json();
        const html = await assemble(doc);

        const promise = (async () => {
            await Promise.all([...pending]);
            return await converter.convert(html);
        })();

        pending.push(promise);
        const pdf = await promise;
        const index = pending.indexOf(promise);
        if (index > -1) pending.splice(index, 1);

        return new Response(pdf, {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=document.pdf'
            }
        });
    }
    catch (err) {
        error(500, String(err));
    }
}

export async function GET({ request, fetch }) {
    try {
        const b64 = new URL(request.url).searchParams.get('data') || error(400, 'No data provided')
        const data = atob(b64);

        return await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            },
            body: data
        });
    }
    catch (err) {
        error(500, String(err));
    }
}