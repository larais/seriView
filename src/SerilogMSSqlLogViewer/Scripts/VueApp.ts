import Vue from 'vue'
import $ from 'jquery'

var eventBus = new Vue();

var app = new Vue({
    el: "#app",
    data: {
        isErrorVisible: false,
        errorMessage: "",
        showModal: false,
        modalEntry: null,
        isLoadingLogs: false,
        logdata: []
    },

    methods: {
        applyFilter: function (filter: string): void {
            console.log("apply filter '" + filter + "'");
        },

        loadLogs(filter: string = null): void {
            this.isLoadingLogs = true;
            $.getJSON("/Log")
                .done((response: LogEntry[]) => {
                    this.isErrorVisible = false;
                    this.logdata = response;
                    console.debug("loaded " + response.length + " items.");
                    this.isLoadingLogs = false;
                })
                .fail((error) => {
                    this.isErrorVisible = true;
                    this.errorMessage = error.response.data;
                    console.log(this);
                    console.log(error);
                    this.isLoadingLogs = false;
                });
        }
    },

    mounted() {
        this.loadLogs();
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