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
