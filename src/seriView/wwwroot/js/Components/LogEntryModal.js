Vue.component("log-entry-modal", {
    template: "#logEntryModalTmpl",
    data: function () {
        return {
            logEntry: null,
            properties: []
        };
    },
    methods: {
        showModal: function (logEntry) {
            console.log("show modal");
            this.logEntry = logEntry;
            var properties = [];
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
    mounted: function () {
        eventBus.$on("evClickEntry", this.showModal);
    }
});

//# sourceMappingURL=LogEntryModal.js.map
