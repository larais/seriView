import Vue from 'vue'

var antlrValidator = new AntlrValidator();

Vue.component("log-filter", {
    template: "#logFilterTmpl",
    data: function () {
        return {
            filter: "",
            is_valid: false
        };
    },

    watch: {
        filter: function (newValue) {
            this.is_valid = antlrValidator.isValid(this.filter);
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