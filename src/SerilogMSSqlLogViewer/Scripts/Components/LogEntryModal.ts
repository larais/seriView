import Vue from 'vue'
import $ from "jquery"
declare var eventBus: Vue;

Vue.component("log-entry-modal", {
    template: "#logEntryModalTmpl",

    data: function () {
        return {
            logEntry: null,
            properties: []
        };
    },
    methods: {
        showModal: function (logEntry: LogEntry) {
            console.log("show modal");
            this.logEntry = logEntry;

            var properties: LogProperty[] = [];

            $(logEntry.properties).find("property").each(function (i, item) {
                properties.push({
                    key: $(item).attr("key"),
                    value: $(item).text()
                });
            });

            this.properties = properties;

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