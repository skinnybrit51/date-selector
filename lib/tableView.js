var headerView = require('./headerView'),
    bodyView = require('./bodyView');

module.exports = function (selectedMonth, selectedDate) {

    // opening tag
    var markup = '<table class="table table-bordered">';

    // header
    markup += headerView().markup;

    // body
    markup += bodyView(selectedMonth, selectedDate).markup;

    // closing tag
    markup += '</table>';

    return {
        markup: markup
    };

};
