'use strict';

var getVersion  = require('git-repo-version');
var fs          = require('fs');
var Y           = require('yuidocjs');

module.exports = {
  generate: function generateYuidocOptions(){
    var config;
    var exclusions = [
      '.DS_Store',
      '.git',
      'node_modules',
      'vendor',
      'bower_components',
      'tmp',
      'tests'
    ];

    try {
      config = JSON.parse(fs.readFileSync('yuidoc.json'));
    } catch(e){
      console.log("No yuidoc.json file in root folder. Run `ember g yuidoc` to generate one.");
      process.exit(1);
    }

    if (exclusions.indexOf(config.options.exclude) === -1){
      exclusions.push(config.options.exclude)
    }

    var outDir = config.options.outdir || 'docs';

    var options = Y.Project.init({
      outdir: outDir,
      destDir: outDir,
      paths: config.options.paths || '.',
      version: getVersion(),
      yuidoc: {
        linkNatives: true,
        quiet: true,
        parseOnly: false,
        lint: false,
        exclude: exclusions.join(',')
      }
    });

    return options;
  }
}
