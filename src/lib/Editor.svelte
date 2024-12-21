<script>
    // @ts-nocheck

    import Prism from "prismjs";
    import "prismjs/themes/prism-dark.min.css";
    import "prismjs/components/prism-markdown.js";
    import "prismjs/components/prism-css.js";

    import { tab, bold } from "$lib/editor";

    /** @type {{value: string, lang: string, [key: string]: any}} */
    let { value = $bindable(), lang, ...props } = $props();

    const tokens = $derived(Prism.highlight(value, Prism.languages[lang], lang));

    /** @type {HTMLElement | null} */
    let code = $state(null);
    /** @type {HTMLTextAreaElement | null} */
    let textarea = $state(null);

    $effect(() => {
        const interval = setInterval(() => {
            if (code && textarea) {
                code.scrollTop = textarea.scrollTop;
                code.scrollLeft = textarea.scrollLeft;
            }
        });
        return () => clearInterval(interval);
    });
</script>

<div class="editor">
    <pre class="code" bind:this={code}>{@html tokens}</pre>
    <textarea {...props} bind:this={textarea} bind:value use:tab use:bold></textarea>
</div>

<style>
    @import "$lib/vars.css";

    .editor {
        position: relative;
        overflow: hidden;
    }

    textarea,
    .code {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        resize: none;
        overflow: auto;

        padding: 10px;
        margin: 0;

        font-family: monospace;
        font-weight: normal;
        font-size: 16px;
        text-align: left;
        text-wrap: wrap;
        line-height: normal;
        tab-size: var(--tabsize, 4);
    }

    textarea {
        background-color: transparent;
        color: transparent;
        caret-color: var(--g-color);
        border: none;
    }

    .editor {
        position: relative;

        flex: 1;
        width: var(--width, auto);
        height: var(--height, auto);
        box-sizing: border-box;
        overflow-y: hidden;

        border: 1px solid var(--g-bg2);
        border-radius: var(--g-rad);
        background-color: var(--g-bg1);
        color: var(--g-color);
        transition:
            background-color 100ms,
            border-color 100ms;
    }

    .editor:has(> textarea:hover) {
        border-color: var(--g-hover);
    }

    .editor:has(> textarea:focus) {
        border-color: var(--g-focus);
    }
</style>
