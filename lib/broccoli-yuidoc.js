'use strict';

var Y       = require('yuidocjs');
var rsvp    = require('rsvp');
var CachingWriter = require('broccoli-caching-writer');

var BroccoliYuidoc = CachingWriter.extend({
  updateCache: function(srcPaths, destDir) {
    this.paths = this.paths || srcPaths;
    this.outdir = [destDir, this.destDir].join('/');

    var json = (new Y.YUIDoc(this)).run();
    var builder = new Y.DocBuilder(this, json);

    return new rsvp.Promise(function(resolve) {
      builder.compile(function() { resolve(); });
    });
  }
});

module.exports = BroccoliYuidoc;
