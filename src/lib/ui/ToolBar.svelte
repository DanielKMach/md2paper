<script>
    /** @type {{[key: string]: any}} */
    let { children = null, ...props } = $props();
</script>

<div {...props} class="tools">
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .tools {
        display: flex;
        flex-flow: var(--direction, row) var(--wrap, nowrap);
        justify-content: var(--align, start);
        gap: var(--g-gap);
    }

    .tools :global(> *) {
        flex: var(--flex);
    }
</style>
