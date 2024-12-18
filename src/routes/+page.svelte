<script>
    import { manifest, md2html, download } from "$lib";
    import { Button, Input, Icon } from "$lib/ui";
    import Editor from "$lib/Editor.svelte";
    import Preview from "$lib/Preview.svelte";
    import { onMount } from "svelte";
    import ToolBar from "$lib/ui/ToolBar.svelte";

    let mode = $state("md");
    let isDownloading = $state(false);
    let pdfname = $state("document.pdf");

    /** @type {import("$lib").DocumentManifest} */
    let doc = $state({ content: "", styles: [""], config: {} });

    onMount(() => {
        doc.content = localStorage.getItem("md") || "";
        doc.styles[0] = localStorage.getItem("css") || "";
    });

    $effect(() => localStorage.setItem("md", doc.content));
    $effect(() => localStorage.setItem("css", doc.styles[0]));

    async function requestDownload() {
        isDownloading = true;
        try {
            const config = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(doc),
            };
            const res = await fetch("/api", config);
            if (res.status !== 200) throw new Error(await res.text());
            const blob = await res.blob();
            download(blob, pdfname);
        } catch (err) {
            alert(err);
        }
        isDownloading = false;
    }
</script>

<main>
    <div class="editor column">
        {#if mode === "md"}
            <Editor bind:value={doc.content} lang="md" />
        {:else if mode === "css"}
            <Editor bind:value={doc.styles[0]} lang="css" spellcheck={false} />
        {/if}
        <ToolBar --align="stretch" --flex="1">
            <Button onclick={() => (mode = "md")} disabled={mode == "md"}>
                <Icon text /> Editar conteúdo
            </Button>
            <Button onclick={() => (mode = "css")} disabled={mode == "css"}>
                <Icon format-size /> Editar estilo
            </Button>
        </ToolBar>
    </div>
    <div class="column preview">
        <Preview doc-manifest={doc}></Preview>
        <ToolBar>
            <Button onclick={requestDownload} disabled={isDownloading}>
                {#if isDownloading}
                    <Icon loading spin --size={1.2} />
                {:else}
                    <Icon download /> Download
                {/if}
            </Button>
            <Input type="text" bind:value={pdfname}>Salvar como</Input>
        </ToolBar>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 10px;
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
        height: 100vh;
        box-sizing: border-box;
        background-color: var(--g-bg1);
    }
    main {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 100%;
        width: 100%;
        height: 100%;
        gap: var(--g-gap);
    }

    .column {
        display: flex;
        flex-flow: column nowrap;
        justify-content: stretch;
        align-items: stretch;
        gap: var(--g-gap);
    }

    .column > :global(:first-child) {
        flex: 1;
    }

    .editor {
        flex-flow: column-reverse nowrap;
    }

    @media (max-width: 500px) {
        main {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 100%;
            --direction: column;
        }
        :global(body) {
            overflow-y: hidden;
            width: 190vw;
        }
    }
</style>
