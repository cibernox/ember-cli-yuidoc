'use strict';

var YuidocCompiler = require('./lib/broccoli-yuidoc');
var optsGenerator  = require('./lib/options');
var mergeTrees     = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-yuidoc',

  postprocessTree: function(type, workingTree) {
    if (this.app.env !== 'development' || type !== 'all'){
      return workingTree;
    }

    var config = optsGenerator.generate();

    var yuidocTree = new YuidocCompiler(config.paths, config);
    return mergeTrees([workingTree, yuidocTree]);
  },

  includedCommands: function() {
    return {
      'yuidoc': require('./lib/commands/yuidoc')
    }
  }
};
