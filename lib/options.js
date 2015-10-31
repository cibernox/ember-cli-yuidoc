'use strict';

var getVersion  = require('git-repo-version');
var fs          = require('fs');
var Y           = require('yuidocjs');

function defaultOption(options, name, defaultValue) {
  if (!options) {
    return defaultValue;
  }

  return options.hasOwnProperty(name) ? options[name] : defaultValue;
}

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
      console.log("No yuidoc.json file in root folder. Run `ember g ember-cli-yuidoc` to generate one.");
      process.exit(1);
    }

    if (exclusions.indexOf(config.options.exclude) === -1){
      exclusions.push(config.options.exclude)
    }

    var outDir = config.options.outdir || 'docs';
    var yuidocOptions = config.options.yuidoc;

    var options = Y.Project.init({
      outdir: outDir,
      destDir: outDir,
      paths: config.options.paths || '.',
      ignorePaths: ['tmp', 'node_modules'],
      version: getVersion(),
      external: config.external || config.options.external || {},
      yuidoc: {
        linkNatives: defaultOption(yuidocOptions, 'linkNatives',  true),
        quiet: defaultOption(yuidocOptions, 'quiet', true),
        parseOnly: defaultOption(yuidocOptions, 'parseOnly', false),
        lint: defaultOption(yuidocOptions, 'lint', false),
        exclude: exclusions.join(',')
      }
    });

    return options;
  }
}
