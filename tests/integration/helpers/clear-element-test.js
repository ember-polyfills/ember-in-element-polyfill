import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { helper } from '@ember/component/helper';

module('Integration | Helper | clear-element', function(hooks) {
  setupRenderingTest(hooks);

  test('it clears the provided element', async function(assert) {
    let element = document.createElement('div');
    element.innerHTML = `<p>Some Contents!</p>`;

    this.set('elementToClear', element);

    assert.strictEqual(
      element.outerHTML,
      '<div><p>Some Contents!</p></div>',
      'precond'
    );

    await render(hbs`{{-clear-element this.elementToClear}}`);

    assert.strictEqual(element.outerHTML, '<div></div>', 'element was emptied');
  });

  test('it returns the element', async function(assert) {
    let element = document.createElement('div');
    element.setAttribute('class', 'test-div');
    element.innerHTML = `<p>Some Contents!</p>`;

    this.set('elementToClear', element);

    await render(hbs`{{-clear-element this.elementToClear}}`);

    assert.dom('.test-div').exists();
  });

  test('it can be used with -in-element', async function(assert) {
    this.owner.register(
      'helper:query-selector',
      helper(function([selector]) {
        return document.querySelector(selector);
      })
    );

    await render(hbs`
      <div id='test-div'>Original Content!</div>
      {{#-in-element (-clear-element (query-selector '#test-div'))}}
        Replacement Content!
      {{/-in-element}}
    `);

    assert.dom('#test-div').hasText('Replacement Content!');
  });
});
