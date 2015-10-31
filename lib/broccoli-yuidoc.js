'use strict';

var Y       = require('yuidocjs');
var rsvp    = require('rsvp');
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
  this.paths = this.inputPaths;
  this.outdir = [this.outputPath, this.options.destDir].join('/');

  var json = (new Y.YUIDoc(this)).run();

  if (this.options.yuidoc.parseOnly) {
    return;
  }

  var builder = new Y.DocBuilder(this, json);

  return new rsvp.Promise(function(resolve) {
    builder.compile(function() { resolve(); });
  });
}

module.exports = BroccoliYuidoc;
