# Ember-cli-yuidoc

This is an ember-cli addon for generate html documentation from YUIDoc comments in the source code.

## Installation

Just `npm install --save-dev ember-cli-yuidoc`.

This plugin expects to find a `yuidoc.json` manifest on the root of your project, but also includes a blueprint to
generate it for you un a breeze. 

Just run `ember g yuidoc` and one will be created in your project's root with some sensitive defaults.

##  Usage

### As an ember command

This addon adds a new `yuidoc` command to ember-cli to generate the documentation on demand. 

Just run `ember yuidoc` and yours docs will apear in your output directory (`/docs` by default).
You probably want to add this folder to the `.gitignore`.

### Watch mode

This plugin also integrates with the ember server, so you can access your docs from the browser in the `/docs` urls.
The documentation will update when you modify your code, as expected. 

While this is specially useful if your are editing your documentation, it adds some overhead to your build pipeline,
so this is disabled by default. Run `ember serve --docs` to enable it.

## Like coffescript? It's ok.

The plugin supports coffescript out of the box. In your application's `yuidoc.json` you can configure
the `syntaxtype` and `extension` like this: 

```json
{
  "name": "sample-app",
  "version": "1.2.3",
  "options": {
    "paths": [ "app"],
    "exclude": "vendor",
    "outdir": "docs",
    "syntaxtype": "coffee",
    "extension": ".coffee"
  }
}
```
