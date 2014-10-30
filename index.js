'use strict';

var YuidocCompiler = require('broccoli-yuidoc');
var mergeTrees = require('broccoli-merge-trees');
var fs = require('fs');

module.exports = {
  name: 'ember-cli-yuidoc',

  postprocessTree: function(type, workingTree) {
    var codeFolder = fs.existsSync('addon') ? 'addon' : 'app';

    var yuidocTree = new YuidocCompiler(codeFolder, {
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
