import { assemble, md2html } from '$lib';
import { WkhtmltopdfConverter, PuppeteerConverter } from '$lib/server/converters';
import { error } from '@sveltejs/kit';

/** @type {Record<string, import('$lib/server/converters').Converter>} */
const converters = {
    wkhtmltopdf: new WkhtmltopdfConverter('file'),
    puppeteer: new PuppeteerConverter()
}

/** @type {Promise<Buffer>[]} */
const pending = [];

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params }) {
    try {
        const converter = converters[params.method] || error(400, 'Invalid method');

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
                'Content-Disposition': 'attachment'
            }
        });
    }
    catch (err) {
        error(500, String(err));
    }
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, fetch }) {
    try {
        const url = new URL(request.url);
        const b64 = url.searchParams.get('data') || error(400, 'No data provided')
        const data = atob(b64);

        const response = await fetch(url.pathname, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            },
            body: data
        });

        response.headers.set('Content-Disposition', 'inline');
        return response;
    }
    catch (err) {
        error(500, String(err));
    }
}