'use strict';

var fs          = require('fs');
var getVersion  = require('git-repo-version');
var Y           = require('yuidocjs');
var rsvp        = require('rsvp');

module.exports = {
  name: 'yuidoc',
  description: 'Generates html documentation using YUIDoc',
  run: function(options, rawArgs) {
    var config;
    try {
      var buffer = fs.readFileSync('yuidoc.json');
      config = JSON.parse(buffer);
    } catch(e){
      console.log("No yuidoc.json file in root folder. Run `ember g yuidoc` to generate one.");
      process.exit(1);
    }
    console.log('Generating documentation...');

    var exclusions = [
      '.DS_Store',
      '.git',
      'node_modules',
      'vendor',
      'bower_components',
      'tmp',
      'tests'
    ];

    if (exclusions.indexOf(config.options.exclude) === -1){
      exclusions.push(config.options.exclude)
    }

    var options = Y.Project.init({
      outdir: config.options.outdir || 'docs',
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

    var yuidocCompiler = new Y.YUIDoc(options);
    var json = yuidocCompiler.run();
    var builder = new Y.DocBuilder(options, json);

    return new rsvp.Promise(function(resolve) {
      builder.compile(function() { resolve(); });
    });
  }
}
