import Vue from 'vue'

Vue.component("log-filter", {
    template: "#logFilterTmpl",
    data: function () {
        return {
            filter: ""
        };
    },
    methods: {
        evClickApply: function () {
            this.$emit("em_apply_filter", this.filter);
        }
    }
});