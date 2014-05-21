var headerView = require('./headerView'),
    bodyView = require('./bodyView');

module.exports = function (thisMoment) {

    // opening tag
    var markup = '<table class="table table-bordered">';

    // header
    markup += headerView().markup;

    // body
    markup += bodyView(thisMoment).markup;

    // closing tag
    markup += '</table>';

    return {
        markup: markup
    };

};
