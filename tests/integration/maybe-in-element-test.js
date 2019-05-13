import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | maybe-in-element', function(hooks) {
  setupRenderingTest(hooks);

  test('works with maybe-in-element', async function(assert) {
    await render(hbs`
        <div id="test-destination-element"></div>
        {{#if ready}}
          {{#maybe-in-element destinationElement false}}Some text{{/maybe-in-element}}
        {{/if}}
      `);
    this.set('destinationElement', document.querySelector('#test-destination-element'));
    this.set('ready', true);
    assert.dom('#test-destination-element').containsText('Some text', 'The content has been rendered in the destination element');
  });
});
