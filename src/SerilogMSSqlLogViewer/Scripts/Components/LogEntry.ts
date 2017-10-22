import Vue from 'vue'

Vue.component("log-entry", {
    template: "#logEntryTmpl",
    props: ["pr_entry"],
    data: function () {
        return { logEntry: this.pr_entry };
    },
    computed: {
        timestampFormatted: function (): string {
            return (new Date(this.logEntry.timestamp)).toUTCString();
        },
        levelClass: function (): string {
            let level: string = this.logEntry.level;

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
    },
    methods: {
        showDetails: function () {
            console.log("Show details of " + this.logEntry.id);
        }
    }
});