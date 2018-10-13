import Vue from 'vue';
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

            let propRoot: LogPropertyComplex = this.parseComplexProperty(<LogPropertyComplex>{ key: "Root", type: "root", properties: [] }, $(logEntry.properties).children("property"));

            this.properties = propRoot.properties;

            $(".entryModal").modal("show");
        },

        hideModal: function () {
            console.log("hide modal");
            $(".entryModal").modal("hide");
            this.logEntry = null;
        },

        parseComplexProperty: function (parentProp: LogPropertyComplex, props: JQuery<HTMLElement>): LogPropertyComplex {
            props.each((index, item) => {
                let property = $(item);
                let structure = property.children("structure");

                if (structure.length > 0) {
                    let newProp: LogPropertyComplex = {
                        key: property.attr("key"),
                        type: structure.first().attr("type"),
                        properties: []
                    };

                    parentProp.properties.push(this.parseComplexProperty(newProp, structure.children("property")));

                } else {
                    parentProp.properties.push(<LogPropertySimple>{
                        key: property.attr("key"),
                        value: property.text()
                    });
                }
            });

            return parentProp;
        }
    },

    mounted() {
        eventBus.$on("evClickEntry", this.showModal);
    }
});