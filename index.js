'use strict';

var YuidocCompiler = require('broccoli-yuidoc');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-yuidoc',

  postprocessTree: function(type, workingTree){
    var yuidocTree = new YuidocCompiler('addon', {
      srcDir: '/',
      destDir: '/docs',
      yuidoc: {}
    });

    return mergeTrees([workingTree, yuidocTree]);
  },

  includedCommands: function() {
    return {
      'yuidoc': require('./lib/commands/yuidoc')
    }
  }
};
