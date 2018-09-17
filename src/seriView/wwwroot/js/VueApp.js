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
        loadLogs: function (filter) {
            var _this = this;
            if (filter === void 0) { filter = null; }
            this.isLoadingLogs = true;
            console.debug("load logs with filter: " + filter);
            $.getJSON("/Log", {
                filter: filter
            })
                .done(function (response) {
                _this.isErrorVisible = false;
                _this.logdata = response;
                console.debug("loaded " + response.length + " items.");
                _this.isLoadingLogs = false;
            })
                .fail(function (error) {
                _this.isErrorVisible = true;
                _this.errorMessage = error.statusText;
                console.log(_this);
                console.log(error);
                _this.isLoadingLogs = false;
            });
        }
    },
    mounted: function () {
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

//# sourceMappingURL=VueApp.js.map
