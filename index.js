'use strict';

var YuidocCompiler = require('broccoli-yuidoc-fork');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-yuidoc',

  postprocessTree: function(type, workingTree) {
    if (this.app.env !== 'development' || type !== 'all'){
      return workingTree;
    }

    var codeFolder = this.app.constructor.name === 'EmberAddon' ? 'addon' : 'app';
    var yuidocTree = new YuidocCompiler(codeFolder, {
      srcDir: '/',
      destDir: '/docs',
      yuidoc: {}
    });

    return mergeTrees([workingTree, yuidocTree]);
  },

  included: function(app){
    this.app = app;
  },

  includedCommands: function() {
    return {
      'yuidoc': require('./lib/commands/yuidoc')
    }
  }
};
