var headerView = require('./headerView'),
    bodyView = require('./bodyView');

module.exports = function (selectedMonth, selectedDate, options) {

    // opening tag
    var markup = '<table>';

    // header
    markup += headerView(options).markup;

    // body
    markup += bodyView(selectedMonth, selectedDate, options).markup;

    // closing tag
    markup += '</table>';

    return {
        markup : markup
    };

};
