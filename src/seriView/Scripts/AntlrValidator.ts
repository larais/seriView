declare var require: any;

var antlr4 = require('antlr4/index');
var SQELexer = require('lib/SQE/SQELexer');
var SQEParser = require('lib/SQE/SQEParser');

class AntlrValidator {
    private errorListener: AntlrErrorListener = new AntlrErrorListener();


    isValid(input: string): boolean {
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
    }
}