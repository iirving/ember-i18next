import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

function textForElement(selector) {
  return find(selector).text();
}

module('Acceptance: Translation', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'reset');
  }
});

test('English translations are correct', function() {
  visit('/');

  andThen(function() {
    equal(find('div#translated').text(), 'test output');
    equal(find('div#translated-with-args0').text(), '0 frogs');
    equal(find('div#translated-with-args1').text(), '1 frog');
    equal(find('div#translated-with-args3').text(), '3 frogs');
  });
});

test('Changing locale changes text', function () {
  visit('/');
  click('a#change-language-link');

  andThen(function () {
    equal(find('div#translated').text(), 'thai test output');
    equal(find('div#translated-with-args0').text(), 'thai 0 frog');
    equal(find('div#translated-with-args1').text(), 'thai 1 frog');
    equal(find('div#translated-with-args3').text(), 'thai 3 frog');
  });
});