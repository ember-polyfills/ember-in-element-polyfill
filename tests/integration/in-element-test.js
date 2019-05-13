import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | in-element', function(hooks) {
  setupRenderingTest(hooks);

  test('renders into destination element by replacing', async function(assert) {
    await render(hbs`
        <div id="test-destination-element">Dummy</div>
        {{#if ready}}
          {{#in-element destinationElement}}Some text{{/in-element}}
        {{/if}}
      `);
    this.set('destinationElement', document.querySelector('#test-destination-element'));
    this.set('ready', true);
    assert.dom('#test-destination-element').hasText('Some text', 'The content has been rendered in the destination element');
  });

  test('renders into destination element by appending', async function(assert) {
    await render(hbs`
        <div id="test-destination-element">Dummy</div>
        {{#if ready}}
          {{#in-element destinationElement insertBefore=null}}Some text{{/in-element}}
        {{/if}}
      `);
    this.set('destinationElement', document.querySelector('#test-destination-element'));
    this.set('ready', true);
    assert.dom('#test-destination-element').hasText('DummySome text', 'The content has been rendered in the destination element');
  });
});
