// Generated from SQE.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');
var SQEVisitor = require('./SQEVisitor').SQEVisitor;

var grammarFileName = "SQE.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\f\"\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0005\u0003\u0015\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u001d\n\u0003\f\u0003",
    "\u000e\u0003 \u000b\u0003\u0003\u0003\u0002\u0003\u0004\u0004\u0002",
    "\u0004\u0002\u0002\u0002#\u0002\u0006\u0003\u0002\u0002\u0002\u0004",
    "\u0014\u0003\u0002\u0002\u0002\u0006\u0007\u0005\u0004\u0003\u0002\u0007",
    "\b\u0007\u0002\u0002\u0003\b\u0003\u0003\u0002\u0002\u0002\t\n\b\u0003",
    "\u0001\u0002\n\u000b\u0007\u0003\u0002\u0002\u000b\f\u0005\u0004\u0003",
    "\u0002\f\r\u0007\u0004\u0002\u0002\r\u0015\u0003\u0002\u0002\u0002\u000e",
    "\u000f\u0007\t\u0002\u0002\u000f\u0010\u0007\u0007\u0002\u0002\u0010",
    "\u0015\u0007\b\u0002\u0002\u0011\u0012\u0007\t\u0002\u0002\u0012\u0013",
    "\u0007\u0007\u0002\u0002\u0013\u0015\u0007\n\u0002\u0002\u0014\t\u0003",
    "\u0002\u0002\u0002\u0014\u000e\u0003\u0002\u0002\u0002\u0014\u0011\u0003",
    "\u0002\u0002\u0002\u0015\u001e\u0003\u0002\u0002\u0002\u0016\u0017\f",
    "\u0006\u0002\u0002\u0017\u0018\u0007\u0005\u0002\u0002\u0018\u001d\u0005",
    "\u0004\u0003\u0007\u0019\u001a\f\u0005\u0002\u0002\u001a\u001b\u0007",
    "\u0006\u0002\u0002\u001b\u001d\u0005\u0004\u0003\u0006\u001c\u0016\u0003",
    "\u0002\u0002\u0002\u001c\u0019\u0003\u0002\u0002\u0002\u001d \u0003",
    "\u0002\u0002\u0002\u001e\u001c\u0003\u0002\u0002\u0002\u001e\u001f\u0003",
    "\u0002\u0002\u0002\u001f\u0005\u0003\u0002\u0002\u0002 \u001e\u0003",
    "\u0002\u0002\u0002\u0005\u0014\u001c\u001e"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'('", "')'", "'and'", "'or'", null, null, null, 
                     null, "' '" ];

var symbolicNames = [ null, null, null, "AND", "OR", "OPERATOR", "NUMBER", 
                      "PROPERTY", "ESCAPEDSTRING", "WHITESPACE", "NEWLINE" ];

var ruleNames =  [ "expression", "mainExpr" ];

function SQEParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

SQEParser.prototype = Object.create(antlr4.Parser.prototype);
SQEParser.prototype.constructor = SQEParser;

Object.defineProperty(SQEParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

SQEParser.EOF = antlr4.Token.EOF;
SQEParser.T__0 = 1;
SQEParser.T__1 = 2;
SQEParser.AND = 3;
SQEParser.OR = 4;
SQEParser.OPERATOR = 5;
SQEParser.NUMBER = 6;
SQEParser.PROPERTY = 7;
SQEParser.ESCAPEDSTRING = 8;
SQEParser.WHITESPACE = 9;
SQEParser.NEWLINE = 10;

SQEParser.RULE_expression = 0;
SQEParser.RULE_mainExpr = 1;

function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SQEParser.RULE_expression;
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.mainExpr = function() {
    return this.getTypedRuleContext(MainExprContext,0);
};

ExpressionContext.prototype.EOF = function() {
    return this.getToken(SQEParser.EOF, 0);
};

ExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SQEVisitor ) {
        return visitor.visitExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SQEParser.ExpressionContext = ExpressionContext;

SQEParser.prototype.expression = function() {

    var localctx = new ExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, SQEParser.RULE_expression);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 4;
        this.mainExpr(0);
        this.state = 5;
        this.match(SQEParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function MainExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SQEParser.RULE_mainExpr;
    return this;
}

MainExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MainExprContext.prototype.constructor = MainExprContext;


 
MainExprContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function AndExpContext(parser, ctx) {
	MainExprContext.call(this, parser);
    MainExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AndExpContext.prototype = Object.create(MainExprContext.prototype);
AndExpContext.prototype.constructor = AndExpContext;

SQEParser.AndExpContext = AndExpContext;

AndExpContext.prototype.mainExpr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(MainExprContext);
    } else {
        return this.getTypedRuleContext(MainExprContext,i);
    }
};

AndExpContext.prototype.AND = function() {
    return this.getToken(SQEParser.AND, 0);
};
AndExpContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SQEVisitor ) {
        return visitor.visitAndExp(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function CompareNumberExpContext(parser, ctx) {
	MainExprContext.call(this, parser);
    MainExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CompareNumberExpContext.prototype = Object.create(MainExprContext.prototype);
CompareNumberExpContext.prototype.constructor = CompareNumberExpContext;

SQEParser.CompareNumberExpContext = CompareNumberExpContext;

CompareNumberExpContext.prototype.PROPERTY = function() {
    return this.getToken(SQEParser.PROPERTY, 0);
};

CompareNumberExpContext.prototype.OPERATOR = function() {
    return this.getToken(SQEParser.OPERATOR, 0);
};

CompareNumberExpContext.prototype.NUMBER = function() {
    return this.getToken(SQEParser.NUMBER, 0);
};
CompareNumberExpContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SQEVisitor ) {
        return visitor.visitCompareNumberExp(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ParenthesisExpContext(parser, ctx) {
	MainExprContext.call(this, parser);
    MainExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ParenthesisExpContext.prototype = Object.create(MainExprContext.prototype);
ParenthesisExpContext.prototype.constructor = ParenthesisExpContext;

SQEParser.ParenthesisExpContext = ParenthesisExpContext;

ParenthesisExpContext.prototype.mainExpr = function() {
    return this.getTypedRuleContext(MainExprContext,0);
};
ParenthesisExpContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SQEVisitor ) {
        return visitor.visitParenthesisExp(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function OrExpContext(parser, ctx) {
	MainExprContext.call(this, parser);
    MainExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

OrExpContext.prototype = Object.create(MainExprContext.prototype);
OrExpContext.prototype.constructor = OrExpContext;

SQEParser.OrExpContext = OrExpContext;

OrExpContext.prototype.mainExpr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(MainExprContext);
    } else {
        return this.getTypedRuleContext(MainExprContext,i);
    }
};

OrExpContext.prototype.OR = function() {
    return this.getToken(SQEParser.OR, 0);
};
OrExpContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SQEVisitor ) {
        return visitor.visitOrExp(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function CompareStringExpContext(parser, ctx) {
	MainExprContext.call(this, parser);
    MainExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CompareStringExpContext.prototype = Object.create(MainExprContext.prototype);
CompareStringExpContext.prototype.constructor = CompareStringExpContext;

SQEParser.CompareStringExpContext = CompareStringExpContext;

CompareStringExpContext.prototype.PROPERTY = function() {
    return this.getToken(SQEParser.PROPERTY, 0);
};

CompareStringExpContext.prototype.OPERATOR = function() {
    return this.getToken(SQEParser.OPERATOR, 0);
};

CompareStringExpContext.prototype.ESCAPEDSTRING = function() {
    return this.getToken(SQEParser.ESCAPEDSTRING, 0);
};
CompareStringExpContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SQEVisitor ) {
        return visitor.visitCompareStringExp(this);
    } else {
        return visitor.visitChildren(this);
    }
};



SQEParser.prototype.mainExpr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new MainExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 2;
    this.enterRecursionRule(localctx, 2, SQEParser.RULE_mainExpr, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 18;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
        switch(la_) {
        case 1:
            localctx = new ParenthesisExpContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 8;
            this.match(SQEParser.T__0);
            this.state = 9;
            this.mainExpr(0);
            this.state = 10;
            this.match(SQEParser.T__1);
            break;

        case 2:
            localctx = new CompareNumberExpContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 12;
            this.match(SQEParser.PROPERTY);
            this.state = 13;
            this.match(SQEParser.OPERATOR);
            this.state = 14;
            this.match(SQEParser.NUMBER);
            break;

        case 3:
            localctx = new CompareStringExpContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 15;
            this.match(SQEParser.PROPERTY);
            this.state = 16;
            this.match(SQEParser.OPERATOR);
            this.state = 17;
            this.match(SQEParser.ESCAPEDSTRING);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 28;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 26;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new AndExpContext(this, new MainExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, SQEParser.RULE_mainExpr);
                    this.state = 20;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 21;
                    this.match(SQEParser.AND);
                    this.state = 22;
                    this.mainExpr(5);
                    break;

                case 2:
                    localctx = new OrExpContext(this, new MainExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, SQEParser.RULE_mainExpr);
                    this.state = 23;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 24;
                    this.match(SQEParser.OR);
                    this.state = 25;
                    this.mainExpr(4);
                    break;

                } 
            }
            this.state = 30;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


SQEParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 1:
			return this.mainExpr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

SQEParser.prototype.mainExpr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 4);
		case 1:
			return this.precpred(this._ctx, 3);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.SQEParser = SQEParser;
