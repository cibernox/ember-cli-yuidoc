'use strict';

module.exports = {
  name: 'ember-cli-yuidoc',
  includedCommands: function() {
    console.log('passing though includedCommands');
    return {
      'yuidoc': require('./lib/commands/yuidoc')
    }
  },
};
