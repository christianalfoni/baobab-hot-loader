// Webpack converts ES6 to require
var baobabRequires = [
  '=require(\'baobab\')',
  '=require("baobab")',
  '= require(\'baobab\')',
  '= require("baobab")',
  ' = require(\'baobab\')',
  ' = require("baobab")'
];

module.exports = function (source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  // If module using Baobab
  if (source.indexOf('(\'baobab\')') >= 0 || source.indexOf('("baobab"') >= 0) {

    if (source.indexOf('/* REACT HOT LOADER */') >= 0) {
      throw new Error('Be sure to use react-hot-loader before baobab-hot-loader');
    }

    // Find what type of require is used at what position
    var result = baobabRequires.reduce(function (result, requireString) {
      var position = source.indexOf(requireString);
      if (position >= 0) {
        result.position = position;
        result.requireString = requireString; 
      }
      return result;
    }, {});

    // Find start of variable declaration
    var charSearch = result.position - 1;
    while(source.charAt(charSearch) !== '\n' && source.charAt(charSearch) !== ' ') {
      charSearch--;
    }
    var baobabVar = source.substr(charSearch, result.position - charSearch).trim();
    var instanceRegexp = new RegExp('\n.*new ' + baobabVar+'2' + '.*\n');
    var instance = source.match(instanceRegexp);

    if (instance) {
      instance = instance[0];
      var treeVar = instance.match(/var (.*) \= /)[1];
      var stateVar = instance.match(/\((.*)\[/)[1];
      stateVar = stateVar.substr(0, stateVar.length - 1) // Remove 2 from end of name
      var stateModuleRegexp = new RegExp('var _state = require\\((.*)\\);');
      var stateModule = source.match(stateModuleRegexp)[1];

      source += [
        '\n',
        'if (module.hot) {\n',
        '  require(\'baobab-react/mixins\').makeHot();\n',
        '  require(\'baobab-react/higher-order\').makeHot();\n',
        '  module.hot.accept([' + stateModule + '], function () {\n',
        '    var newState = require(' + stateModule + ');\n',
        '    Object.keys(newState).forEach(function (key) {\n',
        '      ' + treeVar + '.set(key, newState[key]);\n',
        '    });\n',
        '  });\n',
        '}'
      ].join('');
    }

  }

  return this.callback(null, source, map);

}