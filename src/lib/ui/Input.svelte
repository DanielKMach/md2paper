<script>
    /** @type {{value: string, children: () => any, [key: string]: any}} */
    let { value = $bindable(), children, ext = ".pdf", ...props } = $props();

    function onblur() {
        if (!value || value == ext) value = "document";
        if (ext && !value.endsWith(ext)) value += ext;
    }
</script>

<label>
    {@render children()}
    <input {...props} {onblur} bind:value />
</label>

<style>
    label {
        display: inline-flex;
        height: 40px;
        min-width: 120px;
        padding: 0 5px 0 15px;
        text-align: left;
        font-size: 110%;

        flex-flow: row nowrap;
        align-items: center;
        justify-content: start;
        gap: 10px;

        background-color: var(--g-bg2);
        color: var(--g-color);
        border: 1px solid transparent;
        border-radius: 20px;
        cursor: text;
        transition:
            background-color 100ms,
            border-color 100ms;
    }

    label:has(input:hover) {
        border-color: var(--g-hover);
    }

    label:has(input:focus) {
        border-color: var(--g-focus);
    }

    label:has(input:disabled) {
        cursor: not-allowed;
        background-color: var(--g-disab);
    }

    input {
        display: inline;
        height: 30px;
        padding: 0 10px;

        border: none;
        border-radius: 15px;
        outline: none;
        background-color: var(--g-bg1);
        color: var(--g-color);
    }
</style>
