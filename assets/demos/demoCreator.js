var $ = require('jquery'),
    demoTemplate = require('./templates/demoTemplate.hbs');

function htmlEscape (str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

module.exports = function (demo) {

    var demos = $('body').find('#demos');

    var anchorName = demo.title.toLowerCase().replace(/\s/g, '-');

    var markup = $(demoTemplate({
        anchorName : anchorName,
        demoTitle : demo.title,
        demoDescription : demo.description
    }));

    var example = markup.find('.example');
    demo.present(example);

    markup.find('.code').append(htmlEscape(demo.present.toString()));

    demos.append(markup);
};