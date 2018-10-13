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
            var propRoot = this.parseComplexProperty({ key: "Root", type: "root", properties: [] }, $(logEntry.properties).children("property"));
            this.properties = propRoot.properties;
            $(".entryModal").modal("show");
        },
        hideModal: function () {
            console.log("hide modal");
            $(".entryModal").modal("hide");
            this.logEntry = null;
        },
        parseComplexProperty: function (parentProp, props) {
            var _this = this;
            props.each(function (index, item) {
                var property = $(item);
                var structure = property.children("structure");
                if (structure.length > 0) {
                    var newProp = {
                        key: property.attr("key"),
                        type: structure.first().attr("type"),
                        properties: []
                    };
                    parentProp.properties.push(_this.parseComplexProperty(newProp, structure.children("property")));
                }
                else {
                    parentProp.properties.push({
                        key: property.attr("key"),
                        value: property.text()
                    });
                }
            });
            return parentProp;
        }
    },
    mounted: function () {
        eventBus.$on("evClickEntry", this.showModal);
    }
});

//# sourceMappingURL=LogEntryModal.js.map
