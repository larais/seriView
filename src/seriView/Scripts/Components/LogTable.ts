import Vue, { PropOptions } from 'vue'

Vue.component("log-table", {
    template: "#logTableTmpl",
    data: function () {
        return {
            current_page: 1,
            page_size: 50
        };
    },

    props: {
        pr_logdata: { type: Array, required: true } as PropOptions<LogEntry[]>,
        pr_is_loading: { type: Boolean } as PropOptions<Boolean>
    },

    watch: {
        page_size: function (newSize) {
            this.pageValueChanged();
        }
    },

    methods: {
        firstPage: function () {
            this.current_page = 1;
            this.pageValueChanged();
        },
        previousPage: function () {
            if (this.current_page > 1) {
                this.current_page--;
                this.pageValueChanged();
            }
        },
        nextPage: function () {
            if (this.pr_logdata.length >= this.page_size) {
                this.current_page++;
                this.pageValueChanged();
            }
        },
        pageValueChanged: function () {
            this.$emit("em_page_change", [this.current_page, this.page_size]);
        }
    }
});