'use strict';

var EmberServe = require('ember-cli/lib/commands/serve');

module.exports = {
  name: 'yuidoc:serve',
  description: 'Serves html documentation using YUIDoc',

  beforeRun: function() {
    this._emberServe = new EmberServe({
      ui: this.ui,
      analytics: this.analytics,
      project: this.project,
      tasks: this.tasks
    });
    this.availableOptions = this._emberServe.availableOptions;
  },

  run: function(commandOptions) {
    return this._emberServe.run(commandOptions);
  }
};
