<script>
    import { assemble } from "$lib";

    let { html, css = [], ready = null, ...props } = $props();
    const res = $derived(html instanceof Promise ? html : Promise.resolve(html));
</script>

<div>
    {#await res}
        <p>Loading...</p>
    {:then html}
        {#if html}
            {@const doc = assemble(html, css)}
            <iframe {...props} srcdoc={doc} title="Preview"></iframe>
            {#if ready}
                {@render ready(doc)}
            {/if}
        {:else}
            <p>Nothing to preview</p>
        {/if}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>

<style>
    div {
        display: flex;
        flex-flow: column;
        gap: 5px;

        width: var(--width, auto);
        height: var(--height, auto);
        box-sizing: border-box;
    }
    iframe {
        display: block;
        flex: 1;
        width: 100%;
        box-sizing: border-box;
    }
</style>
