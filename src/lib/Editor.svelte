<script>
    let { value = $bindable(), lang, children = null, ...props } = $props();
</script>

<div>
    <textarea {...props} bind:value></textarea>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    textarea {
        flex: 1;
        width: var(--width, auto);
        height: var(--height, auto);
        box-sizing: border-box;
        padding: 10px;
        resize: horizontal;
        min-width: 200px;
        max-width: 75vw;
    }
</style>
