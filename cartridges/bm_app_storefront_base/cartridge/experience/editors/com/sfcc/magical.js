'use strict';

var Resource = require('dw/web/Resource');
var HashMap = require('dw/util/HashMap');

module.exports.init = function (editor) {
  // add some more options programmatically
  editor.configuration.options.put('init', [
    'Wynstar',
    'Jasper',
    'Joshi',
    'Rainbow',
    'Blythe',
    'Mika',
    'Nightwind',
    'Cadillac',
    'Julius',
    'Calimerio'
  ]);

  // add some localizations
  var localization = {
    placeholder: 'Select your favorite unicorn',
    description: 'Unicorns are magical creatures you want for every component. Select the one of your choice now!',
    group1: 'Unicorns from JSON Config',
    group2: 'Unicorns from init()',
    group3: 'Unicorns from OCAPI request'
  };
  editor.configuration.put('localization', Object.keys(localization).reduce(function (acc, key) {
    acc.put(key, Resource.msg(key, 'experience.editors.com.sfcc.magical', localization[key]));
    return acc;
  }, new HashMap()));

  // add some resources only required for a lot of unicorns
  if ((editor.configuration.options.config.length + editor.configuration.options.init.length) > 10) {
     //editor.resources.styles.push("/experience/editors/com/sfcc/magical-extreme.css");
  }
}
