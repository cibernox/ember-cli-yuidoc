'use strict';

var execSync = require('execSync');
var fs       = require('fs');
var calculateVersion = require('ember-cli-calculate-version').calculatedVersion;

module.exports = {
  name: 'yuidoc',
  description: 'Generates html documentation using YUIDoc',
  run: function(options, rawArgs) {
    console.log('calculatedVersion', calculatedVersion);
    var config;
    try {
      var buffer = fs.readFileSync('yuidoc.json');
      config = JSON.parse(buffer);
    } catch(e){
      console.log("No yuidoc.json file in root folder. Run `ember g yuidoc` to generate one.");
      process.exit(1);
    }
    console.log('Generating documentation...');

    var command = fs.realpathSync('./node_modules/ember-cli-yuidoc/node_modules/.bin/yuidoc') + ' -q --project-version ' + calculateVersion();
    execSync.run("mkdir -p " + config.options.outdir);
    execSync.run(command);
  }
}
