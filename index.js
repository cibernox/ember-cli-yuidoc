'use strict';

var YuidocCompiler = require('broccoli-yuidoc');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-yuidoc',
  treeForApp: function(tree){
    debugger;
    var yuidocTree = new YuidocCompiler(tree, {
      srcDir: '/',
      destDir: '/docs',
      yuidoc: {}
    });

    this.yuidocTree = yuidocTree;
  },

  postprocessTree: function(type, workingTree){
    return mergeTrees([workingTree, this.yuidocTree]);
  },

  includedCommands: function() {
    return {
      'yuidoc': require('./lib/commands/yuidoc')
    }
  }
};
