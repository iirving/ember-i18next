import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Translation', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('English translations are correct', function(assert) {
  visit('/');
  click('a#change-language-en');
  click('a#change-count-1000');

  andThen(function() {
    assert.equal(find('div#translated').text(), 'test output');
    assert.equal(find('div#translated-with-args0').text(), '0 frogs');
    assert.equal(find('div#translated-with-args1').text(), '1 frog');
    assert.equal(find('div#translated-with-args3').text(), '3 frogs');
    assert.equal(find('div#translated-with-bound-args').text(), '1000 frogs');
  });
});

test('Changing locale changes text', function(assert) {
  visit('/');
  click('a#change-language-th');
  click('a#change-count-1000');

  andThen(function () {
    assert.equal(find('div#translated').text(), 'thai test output');
    assert.equal(find('div#translated-with-args0').text(), 'thai 0 frog');
    assert.equal(find('div#translated-with-args1').text(), 'thai 1 frog');
    assert.equal(find('div#translated-with-args3').text(), 'thai 3 frog');
    assert.equal(find('div#translated-with-bound-args').text(), 'thai 1000 frog');
  });
});

test('Changing bound params changes text', function(assert) {
  visit('/');
  click('a#change-language-en');
  click('a#change-count-1000');

  andThen(function () {
    assert.equal(find('div#translated-with-bound-args').text(), '1000 frogs');
  });

  click('a#change-count-5000');

  andThen(function () {
    assert.equal(find('div#translated-with-bound-args').text(), '5000 frogs');
  });
});

test('Markup is allowed in translation keys but substitutions are escaped', function(assert) {
  visit('/');
  click('a#change-language-en');

  andThen(function() {
    assert.equal(find('div#translated-with-markup b').length, 1, 'there should be a bold tag');
    assert.equal(find('div#translated-with-markup-malicious script').length, 0,
      '<script> tag in content should be escaped and not be rendered');
  });
});
