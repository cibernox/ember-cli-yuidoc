'use strict';

var rsvp    = require('rsvp');
var path    = require('path');
var CachingWriter = require('broccoli-caching-writer');
var Y       = require('yuidocjs');

var originalHandleComment = Y.DocParser.prototype.handlecomment;

var AT_PLACEHOLDER = '---AT-PLACEHOLDER---';
var AT_PLACEHOLDER_REGEX = new RegExp(AT_PLACEHOLDER, 'g');

Y.DocParser.prototype.handlecomment = function(comment, file, line) {
  var lines = comment.split(/\r\n|\n/);

  var inMarkdownBlock = false;

  var newLines = lines.map((line) => {
    if (line.match(/^(\s*\*)?\s*```/)) {
      inMarkdownBlock = !inMarkdownBlock;
    }

    return inMarkdownBlock ? line.replace(/@/g, AT_PLACEHOLDER) : line;
  });

  var ret = originalHandleComment.call(this, newLines.join('\n'), file, line);
  var description = ret.find(t => t.tag === 'description');

  if (description) {
    description.value = description.value.replace(AT_PLACEHOLDER_REGEX, '@');
  }

  return ret;
}

BroccoliYuidoc.prototype = Object.create(CachingWriter.prototype);
BroccoliYuidoc.prototype.constructor = BroccoliYuidoc;
function BroccoliYuidoc(inputNodes, options) {
  this.options = options || {};

  CachingWriter.call(this, inputNodes, {
      annotation: this.options.annotation
  });
};

BroccoliYuidoc.prototype.build = function() {
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
