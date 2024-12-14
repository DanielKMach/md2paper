import { assemble } from '$lib';
import { Wkhtmltopdf } from '$lib/server/converters/wkhtmltopdf.js';
import { error, text } from '@sveltejs/kit';

const converter = new Wkhtmltopdf();

export async function POST({ request }) {
    try {
        const doc = await request.text();
        const pdf = await converter.convert(doc);

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
        const content = atob(b64);

        return await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            },
            body: content
        });
    }
    catch (err) {
        error(500, String(err));
    }
}