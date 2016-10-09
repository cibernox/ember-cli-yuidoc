module.exports = {
  description: 'Generates yuidoc.json manifest',
  normalizeEntityName: function() {},
  afterInstall: function() {
    var fs = require('fs');
    var pkginfo = this.project.pkg;
    var config = {
      name: pkginfo.name,
      description: pkginfo.description,
      version: pkginfo.version,
      options: {
        "external": {
          "data": [
            {
              "base": "http://emberjs.com/api/",
              "json": "http://builds.emberjs.com/tags/v2.8.2/ember-docs.json"
            },
            {
              "base": "http://emberjs.com/api/data/",
              "json": "http://builds.emberjs.com/tags/v2.8.0/ember-data-docs.json"
            }
          ]
        },
        paths: [],
        exclude: "vendor",
        outdir: "docs",
        linkNatives: true,
        quiet: true,
        parseOnly: false,
        lint: false
      }
    };
    if (pkginfo.keywords && pkginfo.keywords.indexOf('ember-addon') !== -1){
      console.log("Generating yuidoc.json for ember-addon named " + config.name);
      config.options.paths.push("addon");
    } else {
      console.log("Generating yuidoc.json for app named " + config.name);
      config.options.paths.push("app");
    }
    fs.writeFileSync('yuidoc.json', JSON.stringify(config, null, 2));
  }
};
