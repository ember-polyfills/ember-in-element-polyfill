import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('maybe-in-element', 'Integration | maybe-in-element', {
  integration: true
});

test('works with maybe-in-element', function(assert) {
  this.render(hbs`
      <div id="test-destination-element"></div>
      {{#if ready}}
        {{#maybe-in-element destinationElement false}}Some text{{/maybe-in-element}}
      {{/if}}
    `);
  this.set('destinationElement', document.querySelector('#test-destination-element'));
  this.set('ready', true);
  assert.dom('#test-destination-element').containsText('Some text', 'The content has been rendered in the destination element');
});
