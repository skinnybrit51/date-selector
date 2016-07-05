var jsdom = require('jsdom'),
    fs = require('fs'),
    Handlebars = require('handlebars');

/* Create the dom */
global.document = global.document || jsdom.jsdom();
global.window = global.window || global.document.defaultView;

/* Compile handlebar (*.hbs) files on the fly */
require.extensions['.hbs'] = function (module, filename) {
    var contents = fs.readFileSync(filename).toString();
    return module._compile('var templater = require("handlebars/runtime")["default"].template;' +
        'module.exports = templater(' + Handlebars.precompile(contents) + ');');
};
