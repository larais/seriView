import Vue from "vue";

var eventBus = new Vue();

var app = new Vue({
    el: "#app",
    data: {
        isErrorVisible: false,
        errorMessage: "",
        showModal: false,
        modalEntry: null,
        isLoadingLogs: false,
        logdata: [],

        filter: "",
        page: 1,
        pageSize: 50
    },

    methods: {
        onApplyFilter(filter: string) {
            this.filter = filter;
            this.loadLogs();
        },

        onPageNumberChange(pageNumber: number) {
            this.page = pageNumber;
            this.loadLogs();
        },

        handlePageSizeChanged(newSize: number) {
            this.pageSize = newSize;
            this.loadLogs();
        },

        loadLogs(): void {
            this.isLoadingLogs = true;

            console.debug("load logs with filter: " + this.filter);

            $.getJSON("/Log",
                {
                    filter: this.filter,
                    page: this.page,
                    pageSize: this.pageSize
                })
                .done((response: LogEntry[]) => {
                    this.isErrorVisible = false;
                    this.logdata = response;
                    console.debug("loaded " + response.length + " items.");
                    this.isLoadingLogs = false;
                })
                .fail((error) => {
                    this.isErrorVisible = true;
                    this.errorMessage = error.responseText;
                    console.log(this);
                    console.log(error);
                    this.isLoadingLogs = false;
                });
        }
    },

    mounted() {
        eventBus.$on("evPageSizeChanged", this.handlePageSizeChanged);

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