'use strict';

var YuidocCompiler = require('./lib/broccoli-yuidoc');
var optsGenerator  = require('./lib/options');
var mergeTrees     = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-yuidoc',

  postprocessTree: function(type, workingTree) {
    if(type === 'all') {
      var env = this.app.env;
      var config = optsGenerator.generate();

      if((this.liveDocsEnabled && env === 'development') || (config.enabledEnvironments && config.enabledEnvironments.indexOf(env) !== -1)) {
        return this.addDocsToTree(workingTree, config);
      }
    }
    return workingTree;
  },

  included: function(){
    var cmdOpts = process.argv.slice(3);
    this.liveDocsEnabled = cmdOpts.indexOf('--docs') !== -1;
  },

  includedCommands: function() {
    return {
      'ember-cli-yuidoc': require('./lib/commands/ember-cli-yuidoc')
    };
  },

  addDocsToTree: function(inputTree, config){
    var yuidocTree = new YuidocCompiler(config.paths, config);
    return mergeTrees([inputTree, yuidocTree]);
  }
};
