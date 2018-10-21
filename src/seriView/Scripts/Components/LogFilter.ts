﻿import Vue from 'vue'
import * as moment from 'moment';
declare var eventBus: Vue;

var antlrValidator = new AntlrValidator();

Vue.component("log-filter", {
    template: "#logFilterTmpl",
    data: function () {
        return {
            filter: "",
            is_valid: false,
            page_size: 50,
            startDate: null,
            endDate: null,
            levelFilter: []
        };
    },

    watch: {
        filter: function (newValue) {
            this.is_valid = antlrValidator.isValid(this.filter);
        },
        page_size: function (newSize) {
            eventBus.$emit("evPageSizeChanged", this.page_size);
        }
    },

    methods: {
        evClickApply: function () {
            if (this.is_valid) {
                this.$emit("em_apply_filter", <LogFilter>{
                    query: this.filter,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    levels: this.levelFilter
                });
            }
        }
    },
    mounted: function () {
        $('#timepicker').daterangepicker({
            timePicker: true,
            buttonClasses: ["small ui button"],
            applyButtonClasses: "primary",
            cancelButtonClasses: "",
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        });

        $("#timepicker").on('apply.daterangepicker', (ev, picker) => {
            $("#timepicker").val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
            this.startDate = picker.startDate;
            this.endDate = picker.endDate;
        });

        $("#timepicker").on('cancel.daterangepicker', (ev, picker) => {
            $("#timepicker").val('');
            this.startDate = null
            this.endDate = null;
        });

        $(".ui.fluid.dropdown").dropdown();
    }
});