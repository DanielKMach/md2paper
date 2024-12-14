<script>
    import { md2html } from "$lib";
    import Editor from "$lib/Editor.svelte";
    import Preview from "$lib/Preview.svelte";
    import { onMount } from "svelte";

    let mode = $state("md");
    let md = $state("");
    let css = $state("");

    const html = $derived(md2html(md));

    onMount(() => {
        md = localStorage.getItem("md") || "";
        css = localStorage.getItem("css") || "";
    });

    $effect(() => localStorage.setItem("md", md));
    $effect(() => localStorage.setItem("css", css));
</script>

<main>
    {#if mode === "md"}
        <Editor bind:value={md} lang="md" --width="50vw">
            <button onclick={() => (mode = "css")}>Editar CSS</button>
        </Editor>
    {/if}
    {#if mode === "css"}
        <Editor bind:value={css} lang="css" --width="50vw">
            <button onclick={() => (mode = "md")}>Editar texto</button>
        </Editor>
    {/if}
    <Preview {html} css={[css]} --width="100%">
        {#snippet ready(/** @type {string} */ doc)}
            {@const param = encodeURIComponent(btoa(doc))}
            <a href="/api?data={param}"> Download </a>
        {/snippet}
    </Preview>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 10px;
        font-family: sans-serif;
        height: 100vh;
        box-sizing: border-box;
        overflow-x: hidden;
    }
    main {
        display: grid;
        grid-template-columns: 0fr 1fr;
        height: 100%;
        gap: 1rem;
    }
    main > :global(*) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
