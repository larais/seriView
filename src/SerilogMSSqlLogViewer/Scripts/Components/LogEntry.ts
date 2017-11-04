import Vue from 'vue'

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
        }
    }
});