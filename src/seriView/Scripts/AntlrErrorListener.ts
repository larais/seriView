class AntlrErrorListener {
    private errors: string[] = [];

    get hasError(): boolean {
        return this.errors.length > 0;
    }

    reset(): void {
        this.errors = [];
    }

    syntaxError(recognizer: any, symbol: any, line: number, col: number, msg: string, recognitionException: any) {
        console.debug("syntax error");
        this.errors.push(msg);
    }
}