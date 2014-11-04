# Ember-cli-yuidoc

This is an ember-cli addon for generate html documentation from YUIDoc comments in the source code

## Installation

Just `npm install --save-dev ember-cli-yuidoc`.
This plugin expects to find a `yuidoc.json` manifest on the root of your project. You can generate one
automatically with `ember g yuidoc`.

## Running

This addon adds a new `yuidoc` command to ember-cli. To generate the documentation just run `ember yuidoc`
Documentation is generated in the `/docs` folder by default. You might want to add this folder to the gitignore.

Also, for live updating, when you run `ember serve` you can visit the `/docs` url to see it.

## Running Tests

No tests yet

## TODOS

* Allow to pass parameters to `ember yuidoc` and forward them to the `yuidoc` executable.
* Add a middleware to ember-cli that exposes the documentation in `/docs` (like tests are exposed in `/tests`)
