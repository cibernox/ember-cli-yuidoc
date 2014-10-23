'use strict';

var execSync = require('execSync');
var fs       = require('fs');

module.exports = {
  name: 'yuidoc',
  description: 'Generates html documentation using YUIDoc',
  run: function(options, rawArgs) {
    var buffer;
    try {
      buffer = fs.readFileSync('yuidoc.json');
    } catch(e){
      console.log("No yuidoc.json file in root folder. Run `ember g yuidoc` to generate one.")
    }
    var config = JSON.parse(buffer);
    console.log('Generating documentation...');
    var command = 'yuidoc -q';
    execSync.run("mkdir -p " + config.options.outdir);
    execSync.run(command);
  }
}
