import Vue from 'vue';

Vue.component("log-entry", {
    template: "#logEntryTmpl",
    props: ["entry"],
    data: function () {
        return { logEntry: this.entry }
    },
    computed: {
        timestampFormatted: function (): string {
            return (<Date>this.logEntry.timestamp).toTimeString();
        }
    },
    methods: {
        showDetails: function () {
            console.log("Show details of " + this.logEntry.id);
        }
    }
});