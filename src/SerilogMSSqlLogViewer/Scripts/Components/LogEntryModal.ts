import Vue from 'vue'
import $ from "jquery"

Vue.component("log-entry-modal", {
    template: "#logEntryModalTmpl",
    props: {
        pr_entry: {
            type: Object
        },
        pr_show: { type: Boolean, required: true }
    },

    data: function () {
        return {
            show: true
        };
    },
    methods: {
        showModal: function() {
            this.show = true;
            this.toggleModal();
        },

        toggleModal: function () {
            if (this.show) {
                $(".entryModal").modal("show");
            } else {
                $(".entryModal").modal("hide");
            }
        }
    }
});