'use strict';

module.exports = {
  name: 'ember-cli-yuidoc',
  includedCommands: function() {
    return {
      'yuidoc': require('./lib/commands/yuidoc')
    }
  },
};
