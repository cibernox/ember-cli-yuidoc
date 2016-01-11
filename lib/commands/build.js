'use strict';

module.exports = {
  name: 'yuidoc:build',
  description: 'Builds html documentation using YUIDoc',

  run: function(/* commandOptions */) {
    var Y             = require('yuidocjs');
    var rsvp          = require('rsvp');
    var optsGenerator = require('../options');
    var options       = optsGenerator.generate();

    var yuidocCompiler = new Y.YUIDoc(options);
    var json = yuidocCompiler.run();
    var builder = new Y.DocBuilder(options, json);

    return new rsvp.Promise(function(resolve) {
      builder.compile(function() { resolve(); });
    });
  }
}
