'use strict';

module.exports = class InElementTransform {
  transform(ast) {
    let b = this.syntax.builders;

    this.syntax.traverse(ast, {
      BlockStatement(node) {
        if (node.path.original === 'in-element') {
          node.path.original = '-in-element';
          node.path.parts = ['-in-element'];

          let insertBeforeHash = node.hash.pairs.find(pair => pair.key === "insertBefore");

          // Somehow `insertBefore=undefined` gets effectively passed when invoking `{{#in-element dest}}` in Ember 3.17+
          // which later throws in Ember's own AST transform, so removing this here.
          if (insertBeforeHash && insertBeforeHash.value.type === 'UndefinedLiteral') {
            node.hash.pairs = node.hash.pairs.filter(hash => hash !== insertBeforeHash);
            insertBeforeHash = null;
          }

          if (insertBeforeHash) {
            if (insertBeforeHash.value.type !== "NullLiteral") {
              throw new SyntaxError('insertBefore only takes `null` as an argument');
            }

            node.hash.pairs = node.hash.pairs.filter(hash => hash !== insertBeforeHash);
          } else {
            let [targetNode] = node.params;

            node.params[0] = b.sexpr(
              '-clear-element',
              [targetNode]
            );
          }
        }
      }
    });

    return ast;
  }
};
