import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('in-element', 'Integration | in-element', {
  integration: true
});

test('renders into destination element', function(assert) {
  this.render(hbs`
      <div id="test-destination-element"></div>
      {{#if ready}}
        {{#in-element destinationElement}}Some text{{/in-element}}
      {{/if}}
    `);
  this.set('destinationElement', document.querySelector('#test-destination-element'));
  this.set('ready', true);
  assert.dom('#test-destination-element').containsText('Some text', 'The content has been rendered in the destination element');
});
