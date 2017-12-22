// Generated from SQE.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by SQEParser.

function SQEVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

SQEVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
SQEVisitor.prototype.constructor = SQEVisitor;

// Visit a parse tree produced by SQEParser#expression.
SQEVisitor.prototype.visitExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SQEParser#andExp.
SQEVisitor.prototype.visitAndExp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SQEParser#compareNumberExp.
SQEVisitor.prototype.visitCompareNumberExp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SQEParser#parenthesisExp.
SQEVisitor.prototype.visitParenthesisExp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SQEParser#orExp.
SQEVisitor.prototype.visitOrExp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SQEParser#compareStringExp.
SQEVisitor.prototype.visitCompareStringExp = function(ctx) {
  return this.visitChildren(ctx);
};



exports.SQEVisitor = SQEVisitor;