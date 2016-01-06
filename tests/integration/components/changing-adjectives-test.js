import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('changing-adjectives', 'Integration | Component | changing adjectives', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{changing-adjectives}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#changing-adjectives}}
      template block text
    {{/changing-adjectives}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
