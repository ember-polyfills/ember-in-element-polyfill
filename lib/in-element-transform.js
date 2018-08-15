'use strict';

module.exports = class InElementTransform {
  transform(ast) {
    this.syntax.traverse(ast, {
      BlockStatement(node) {
        if (node.path.original === 'in-element') {
          node.path.original = '-in-element';
          node.path.parts = ['-in-element'];
        }
      }
    });

    return ast;
  }
};
