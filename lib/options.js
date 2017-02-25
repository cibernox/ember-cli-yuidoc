'use strict';

var getVersion  = require('git-repo-version');
var fs          = require('fs');

module.exports = {
  load: function loadYuidocOptions(){
    try {
      return JSON.parse(fs.readFileSync('yuidoc.json'));
    } catch(e){
      console.log("No yuidoc.json file in root folder. Run `ember g ember-cli-yuidoc` to generate one.");
      process.exit(1);
    }
  },

  generate: function generateYuidocOptions(config){
    var Y          = require('yuidocjs');
    var exclusions = [
      '.DS_Store',
      '.git',
      'node_modules',
      'vendor',
      'bower_components',
      'tmp',
      'tests'
    ];

    if (!config) {
      config = this.load();
    }

    config.version = getVersion();
    config.options.outdir = config.options.outdir || 'docs';

    var confExclusions = config.options.exclude;
    if(confExclusions && typeof confExclusions === 'string') {
      confExclusions = confExclusions.split(',');
      confExclusions.forEach(function(e) {
        e = e.trim();
        if(e !== '' && exclusions.indexOf(e) === -1) {
          exclusions.push(e);
        }
      });
    }
    config.options.exclude = exclusions.join(',');

    return Y.Project.init(config);
  }
}
