import Vue from 'vue'
declare var eventBus: Vue;

var antlrValidator = new AntlrValidator();

Vue.component("log-filter", {
    template: "#logFilterTmpl",
    data: function () {
        return {
            filter: "",
            is_valid: false,
            page_size: 50
        };
    },

    watch: {
        filter: function (newValue) {
            this.is_valid = antlrValidator.isValid(this.filter);
        },
        page_size: function (newSize) {
            console.log("emit size: " + newSize + " and " + this.page_size);
            eventBus.$emit("evPageSizeChanged", this.page_size);
        }
    },

    methods: {
        evClickApply: function () {
            if (this.is_valid) {
                this.$emit("em_apply_filter", this.filter);
            }
        }
    }
});