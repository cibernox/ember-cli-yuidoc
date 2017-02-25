'use strict';

var rsvp    = require('rsvp');
var path    = require('path');
var CachingWriter = require('broccoli-caching-writer');

BroccoliYuidoc.prototype = Object.create(CachingWriter.prototype);
BroccoliYuidoc.prototype.constructor = BroccoliYuidoc;
function BroccoliYuidoc(inputNodes, options) {
  this.options = options || {};

  CachingWriter.call(this, inputNodes, {
      annotation: this.options.annotation
  });
};

BroccoliYuidoc.prototype.build = function() {
  var Y       = require('yuidocjs');
  var options = this.options;
  options.outdir = path.resolve(this.outputPath, options.outdir);

  var json = (new Y.YUIDoc(options)).run();

  if (this.options.parseOnly) {
    return;
  }

  var builder = new Y.DocBuilder(options, json);
  return new rsvp.Promise(function(resolve) {
    builder.compile(function() { resolve(); });
  });
}

module.exports = BroccoliYuidoc;
