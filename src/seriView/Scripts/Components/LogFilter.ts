import Vue from 'vue'

declare var require: any;

var antlr4 = require('antlr4/index');
var SQELexer = require('lib/SQE/SQELexer');
var SQEParser = require('lib/SQE/SQEParser');

Vue.component("log-filter", {
    template: "#logFilterTmpl",
    data: function () {
        return {
            filter: ""
        };
    },
    methods: {
        evClickApply: function () {

            var chars = new antlr4.InputStream(this.filter);
            var lexer = new SQELexer.SQELexer(chars);

            var tokens = new antlr4.CommonTokenStream(lexer);
            var parser = new SQEParser.SQEParser(tokens);

            var tree = parser.expression();

            console.log("Parsed: " + tree.toStringTree());

            this.$emit("em_apply_filter", this.filter);
        }
    }
});