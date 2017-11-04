import Vue from 'vue'
import $ from "jquery"
declare var eventBus: Vue;

Vue.component("log-entry-modal", {
    template: "#logEntryModalTmpl",

    data: function () {
        return {
            logEntry: null
        };
    },
    methods: {
        showModal: function (logEntry: LogEntry) {
            console.log("show modal");
            this.logEntry = logEntry;
            $(".entryModal").modal("show");
        },

        hideModal: function () {
            console.log("hide modal");
            $(".entryModal").modal("hide");
            this.logEntry = null;
        }
    },

    mounted() {
        eventBus.$on("evClickEntry", this.showModal);
    }
});