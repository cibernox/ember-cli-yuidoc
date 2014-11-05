'use strict';

var YuidocCompiler = require('broccoli-yuidoc');
var mergeTrees     = require('broccoli-merge-trees');
var fs             = require('fs');

module.exports = {
  name: 'ember-cli-yuidoc',

  postprocessTree: function(type, workingTree) {
    if (this.app.env !== 'development' || type !== 'all'){
      return workingTree;
    }

    var config;
    try {
      var buffer = fs.readFileSync('yuidoc.json');
      config = JSON.parse(buffer);
    } catch(e){
      console.log("No yuidoc.json file in root folder. Run `ember g yuidoc` to generate one.");
      process.exit(1);
    }

    var yuidocTree = new YuidocCompiler(config.options.paths, {
      srcDir: '/',
      destDir: '/docs',
      yuidoc: {
        linkNatives: true,
        quiet: true,
        parseOnly: false,
        lint: false
      }
    });

    return mergeTrees([workingTree, yuidocTree]);
  },

  includedCommands: function() {
    return {
      'yuidoc': require('./lib/commands/yuidoc')
    }
  }
};
