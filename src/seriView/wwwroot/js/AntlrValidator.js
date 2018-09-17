var antlr4 = require('antlr4/index');
var SQELexer = require('lib/SQE/SQELexer');
var SQEParser = require('lib/SQE/SQEParser');
var AntlrValidator = /** @class */ (function () {
    function AntlrValidator() {
        this.errorListener = new AntlrErrorListener();
    }
    AntlrValidator.prototype.isValid = function (input) {
        this.errorListener.reset();
        var chars = new antlr4.InputStream(input);
        var lexer = new SQELexer.SQELexer(chars);
        lexer.removeErrorListeners();
        lexer.addErrorListener(this.errorListener);
        var tokens = new antlr4.CommonTokenStream(lexer);
        var parser = new SQEParser.SQEParser(tokens);
        parser.removeErrorListeners();
        parser.addErrorListener(this.errorListener);
        var tree = parser.expression();
        console.debug("Parsed: " + tree.toStringTree());
        return !this.errorListener.hasError;
    };
    return AntlrValidator;
}());

//# sourceMappingURL=AntlrValidator.js.map
