var AntlrErrorListener = /** @class */ (function () {
    function AntlrErrorListener() {
        this.errors = [];
    }
    Object.defineProperty(AntlrErrorListener.prototype, "hasError", {
        get: function () {
            return this.errors.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    AntlrErrorListener.prototype.reset = function () {
        this.errors = [];
    };
    AntlrErrorListener.prototype.syntaxError = function (recognizer, symbol, line, col, msg, recognitionException) {
        console.debug("syntax error");
        this.errors.push(msg);
    };
    return AntlrErrorListener;
}());

//# sourceMappingURL=AntlrErrorListener.js.map
