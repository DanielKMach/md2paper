<script>
    import { assemble } from "$lib";

    /** @type {{"doc-manifest": import("$lib").DocumentManifest, [key: string]: any}} */
    let { "doc-manifest": doc, children = null, ...props } = $props();

    /** @type {HTMLIFrameElement | null} */
    let iframe = $state(null);

    $effect(() => {
        doc.content;
        doc.styles.forEach((s) => s);
        doc.config;
        let timeout = setTimeout(async () => {
            if (iframe && iframe.contentDocument && iframe.contentDocument.body.parentElement) {
                const html = await assemble(doc);
                iframe.contentDocument.body.parentElement.innerHTML = html;
            }
        }, 250);
        return () => clearTimeout(timeout);
    });

    export function print() {
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.print();
        }
    }
</script>

<iframe bind:this={iframe} {...props} title="Preview"></iframe>

<style>
    iframe {
        display: block;

        width: var(--width, auto);
        height: var(--height, auto);
        box-sizing: border-box;

        border: 1px solid var(--g-bg2);
        border-radius: var(--g-rad);
        background-color: #fff;
    }
</style>
