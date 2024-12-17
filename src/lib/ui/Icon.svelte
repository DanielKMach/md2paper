<script>
    /** @type {{[key: string]: any}} */
    let { spin = false, ...props } = $props();

    const map = {
        loading: "/icons/progress.svg",
        download: "/icons/download.svg",
        text: "/icons/text.svg",
        "format-size": "/icons/format-size.svg",
    };

    const src = $derived(map[Object.keys(props)[0]]);
</script>

<img {...props} {src} class:spin />

<style>
    img {
        width: calc(1em * var(--size, 1));
        height: auto;
        translate: 0 2px;
    }

    img.spin {
        animation: 1s linear 0s infinite spin;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
