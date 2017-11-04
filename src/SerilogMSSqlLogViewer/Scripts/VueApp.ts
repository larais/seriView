import Vue from 'vue'
import $ from 'jquery'

var app = new Vue({
    el: "#app",
    data: {
        isErrorVisible: false,
        errorMessage: "",
        showModal: false,
        modalEntry: null,
        logdata: []
    },

    methods: {
        showEntryDetails: function (entry: LogEntry): void {
            this.modalEntry = entry;
            this.$refs.entryModal.$options.methods.showModal();
        }
    },

    mounted() {
        $.getJSON("/Log")
            .done((response: LogEntry[]) => {
                this.isErrorVisible = false;
                this.logdata = response;
                console.debug("loaded " + response.length + " items.");
            })
            .fail((error) => {
                this.isErrorVisible = true;
                this.errorMessage = error.response.data;
                console.log(this);
                console.log(error);
            });
    }
});

Vue.filter("levelClass", function (value) {
    switch (value) {
        case "Error":
            return "orange";
        case "Fatal":
            return "red";
        case "Warning":
            return "yellow";
        case "Debug":
            return "";
        default:
            return "blue";
    }
});

Vue.filter("timestampFormatted", function (value) {
    return (new Date(value)).toUTCString();
});