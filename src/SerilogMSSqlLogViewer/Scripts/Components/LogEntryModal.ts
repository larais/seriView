import Vue from 'vue'

Vue.component("log-entry-modal", {
    template: "#logEntryModalTmpl",
    props: ["pr_entry"],
    computed: {
        timestampFormatted: function (): string {
            return (new Date(this.pr_entry.timestamp)).toUTCString();
        },
        levelClass: function (): string {
            let level: string = this.pr_entry.level;

            switch (level) {
                case "Error":
                    return "orange";
                case "Fatal":
                    return "red";
                case "Warning":
                    return "yellow";
                default:
                    return "blue";
            }
        }
    }
});