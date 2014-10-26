'use strict';

module.exports = {
  name: 'ember-cli-yuidoc',
  includedCommands: function() {
    return {
      'yuidoc': require('./lib/commands/yuidoc')
    }
  },

  serverMiddleware: function(config) {
    var app = config.app;
    console.log('registring middleware...');
    app.use('/docs', function(request, response, next) {
      console.log('docs middleware invoked!!!');
      response.send("Hello world");
    });
  }
};
