Vue.component("log-entry", {
    template: "#logEntryTmpl",
    props: {
        pr_entry: {
            type: Object, required: true
        }
    },
    methods: {
        showDetails: function () {
            console.log("Show details of " + this.pr_entry.id);
            eventBus.$emit("evClickEntry", this.pr_entry);
        }
    }
});

//# sourceMappingURL=LogEntry.js.map
