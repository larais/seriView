import Vue from 'vue'

Vue.component("log-entry-property-item", {
    template: "#logEntryPropertyItemTmpl",
    props: {
        pr_prop: {
            type: Object, required: true
        }
    }
});