'use strict';

module.exports = class RenameInElement {
  transform(ast) {
    this.syntax.traverse(ast, {
      BlockStatement(node) {
        if (node.path.original === 'in-element') {
          node.path.original = '-in-element';
          node.path.parts = ['-in-element'];

          let insertBeforeHash = node.hash.pairs.find(pair => pair.key === "insertBefore");
          // Somehow `insertBefore=undefined` gets effectively passed when invoking `{{#in-element dest}}`
          // which later throws in Ember's own AST transform, so removing this here.
          if (insertBeforeHash && insertBeforeHash.value.type === 'UndefinedLiteral') {
            node.hash.pairs = node.hash.pairs.filter(hash => hash !== insertBeforeHash);
          }
        }
      }
    });

    return ast;
  }
};
