var $ = require('jquery'),
    template = require('./templates/defaultConfigurationTemplate.hbs');

module.exports = {

    title : 'Default  Options',

    description : 'Out the box configuration.',

    present : function (el) {

        var markup = $(template({}));

        el.append(markup);

    }

};
