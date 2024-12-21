<script>
    /** @type {{[key: string]: any}} */
    let { spin = false, ...props } = $props();

    const src = $derived(`/icons/${Object.keys(props)[0]}.svg`);
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
