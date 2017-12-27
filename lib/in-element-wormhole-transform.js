'use strict';

module.exports = class InElementTransform {
  transform(ast) {
    let walker = new this.syntax.Walker();

    let b = this.syntax.builders;

    walker.visit(ast, function(node) {
      if (node.type === 'BlockStatement' && (node.path.original === 'in-element' || node.path.original === '-in-element')) {
        node.path.parts[0] = node.path.original = 'ember-wormhole';
        let destEl = node.params[0];
        node.params = [];
        node.hash =  b.hash([
          b.pair('destinationElement', destEl)
        ]);
      }
    });

    return ast;
  }
};
