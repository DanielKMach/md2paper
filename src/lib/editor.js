
/** 
 * @type {import('svelte/action').Action<HTMLTextAreaElement, string>}
 * @param {HTMLTextAreaElement} ta
 * @param {string | undefined} key
 */
export function tab(ta, key = 'Tab') {
    ta.addEventListener("keydown", function (e) {
        if (e.key !== key) return;

        e.preventDefault();
        const start = ta.selectionStart || 0;
        const end = ta.selectionEnd || 0;

        if (start === end) {
            document.execCommand("insertText", false, "\t");
            return;
        }

        const firstLine = ta.value.lastIndexOf("\n", start);
        let totalTabs = 0;
        let startTabs = 0;
        for (let i = firstLine; i < end; i = ta.value.indexOf("\n", i + 1)) {
            if (ta.value[i + 1] === "\n") continue;
            if (e.shiftKey) {
                if (ta.value[i + 1] !== "\t") continue;
                this.selectionStart = i + 1;
                this.selectionEnd = i + 2;
                document.execCommand("delete");
                if (i == firstLine) startTabs--;
                totalTabs--;
            } else {
                this.selectionStart = this.selectionEnd = i + 1;
                document.execCommand("insertText", false, "\t");
                if (i == firstLine) startTabs++;
                totalTabs++;
            }
        }
        setTimeout(() => {
            this.selectionStart = start + startTabs;
            this.selectionEnd = end + totalTabs;
        });
    });
}

/**
 * @type {import('svelte/action').Action<HTMLTextAreaElement, string>}
 * @param {HTMLTextAreaElement} ta
 * @param {string | undefined} key
 */
export function bold(ta, key = 'b') {
    ta.addEventListener("keydown", function (e) {
        if (e.key !== key || !e.ctrlKey) return;

        e.preventDefault();
        const start = ta.selectionStart || 0;
        const end = ta.selectionEnd || 0;

        if (start === end) {
            ta.selectionStart = ta.selectionEnd = ta.value.lastIndexOf(" ", start) + 1;
            document.execCommand("insertText", false, "**");
            ta.selectionStart = ta.selectionEnd = ta.value.indexOf(" ", end);
            document.execCommand("insertText", false, "**");
            ta.selectionStart = ta.selectionEnd = start + 2;
            return;
        }

        const firstLine = ta.value.lastIndexOf("\n", start);
        let totalBold = 0;
        let startBold = 0;
        for (let i = firstLine; i < end; i = ta.value.indexOf("\n", i + 1)) {
            if (ta.value[i + 1] === "\n") continue;
            if (ta.value[i + 1] === "*" && ta.value[i + 2] === "*") {
                this.selectionStart = i + 1;
                this.selectionEnd = i + 3;
                document.execCommand("delete");
                if (i == firstLine) startBold--;
                totalBold--;
            } else {
                this.selectionStart = this.selectionEnd = i + 1;
                document.execCommand("insertText", false, "**");
                if (i == firstLine) startBold++;
                totalBold++;
            }
        }
        setTimeout(() => {
            this.selectionStart = start + startBold;
            this.selectionEnd = end + totalBold;
        });
    })
}