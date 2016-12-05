# Ember-cli-yuidoc

This is an ember-cli addon for generate html documentation from YUIDoc comments in the source code.

## Installation

If you're using ember-cli > 0.1.5, you can just run `ember install ember-cli-yuidoc` and you're done.

If you are using an older version, first install the addon from npm with `npm install --save-dev ember-cli-yuidoc`.

Then, you need to add a `yuidoc.json` manifest on the root of your project. Run `ember g ember-cli-yuidoc` to generate
once with some sensitive defaults.

##  Usage

### As an ember command

This addon adds a new `ember-cli-yuidoc` command to ember-cli to generate the documentation on demand. 

Just run `ember ember-cli-yuidoc` and your docs will apear in your output directory (`/docs` by default).
You probably want to add this folder to the `.gitignore`.

### Watch mode

This plugin also integrates with the ember server, so you can access your docs from the browser in the `/docs` urls.
The documentation will update when you modify your code, as expected. 

While this is specially useful if your are editing your documentation, it adds some overhead to your build pipeline,
so this is disabled by default. Run `ember serve --docs` to enable it.

### Environment specific generation

This plugin supports the ability to force generate your documentation via the `enabledEnvironments` option that may be defined in your `yuidoc.json`.

```json
{
  "name": "sample-app",
  "version": "1.2.3",
  "options": {
    "enabledEnvironments": ["development", "production"]
  }
}
```

This will generate your documentation when using `ember build` `ember build --environment=production` `ember s` and so on without needing to use `--docs`.

## Like coffescript? It's ok.

The plugin supports coffescript out of the box. In your application's `yuidoc.json` you can configure
the `syntaxtype` and `extension` like this: 

```json
{
  "name": "sample-app",
  "version": "1.2.3",
  "options": {
    "paths": ["app"],
    "exclude": "vendor",
    "outdir": "docs",
    "syntaxtype": "coffee",
    "extension": ".coffee"
  }
}
```
