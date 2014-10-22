'use strict';

var execSync = require('execSync');
var fs       = require('fs');

module.exports = {
  name: 'yuidoc',
  description: 'Generates html documentation using YUIDoc',
  run: function(options, rawArgs) {
    console.log('Generating documentation...')
    var command = fs.realpathSync('./node_modules/ember-cli-yuidoc/node_modules/.bin/yuidoc') + ' addon -q -o docs';
    var output = execSync.run(command);
  }
}
