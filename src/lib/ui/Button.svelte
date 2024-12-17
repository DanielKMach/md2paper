<script>
    let { children = null, ...props } = $props();
</script>

<button {...props}>
    {#if children}
        {@render children()}
    {/if}
</button>

<style>
    button {
        height: 40px;
        min-width: 40px;
        padding: 0 15px;
        text-align: center;
        cursor: pointer;
        font-size: 110%;

        background-color: var(--g-bg2);
        color: var(--g-color);
        border: 1px solid transparent;
        border-radius: 20px;
        transition:
            background-color 100ms,
            border-color 100ms;
    }

    button:hover {
        border-color: var(--g-hover);
    }

    button:disabled {
        cursor: not-allowed;
        background-color: var(--g-disab);
    }

    button:disabled:hover {
        border-color: transparent;
    }
</style>
