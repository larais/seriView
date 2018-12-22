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

        filter: {},
        page: 1,
        pageSize: 50
    },

    methods: {
        onApplyFilter(filter: LogFilter) {
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

            // add level filter
            if (this.filter.levels != null && this.filter.levels.length > 0) {
                let q = "";
                if (this.filter.query != null && this.filter.query.length > 0) {
                    q = "(" + this.filter.query + ") and (";
                } else {
                    q = "(";
                }

                for (var i = 0; i < this.filter.levels.length; i++) {
                    if (i == 0) {
                        q += "Level = \"" + this.filter.levels[i] + "\"";
                    } else {
                        q += " or Level = \"" + this.filter.levels[i] + "\"";
                    }
                }

                q += ")";

                this.filter.query = q;
            }

            // add time filter
            if (this.filter.startDate != null) {
                let qTime = "(TimeStamp > \"" + this.filter.startDate.format() + "\" and TimeStamp < \"" + this.filter.startDate.format() + "\")";

                if (this.filter.query != null && this.filter.query.length > 0) {
                    this.filter.query = "(" + this.filter.query + ") and ";
                }

                this.filter.query += qTime;
            }

            $.getJSON("/Log",
                {
                    query: this.filter.query,
                    startDate: this.filter.startDate != null ? this.filter.startDate.format() : null,
                    endDate: this.filter.endDate != null ? this.filter.endDate.format() : null,
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