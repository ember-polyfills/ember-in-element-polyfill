'use strict';

module.exports = class InElementTransform {
  transform(ast) {
    let b = this.syntax.builders;

    this.syntax.traverse(ast, {
      BlockStatement(node) {
        if (node.path.original === 'in-element' || node.path.original === '-in-element') {
          return b.block(
            'ember-wormhole',
            undefined,
            b.hash([
              b.pair('destinationElement', node.params[0])
            ]),
            node.program
          );
        }
      }
    });

    return ast;
  }
};
