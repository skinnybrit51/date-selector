var dateUtil = require('./dateUtil');

module.exports = function () {

    // opening tag
    var markup = '<thead><tr>';

    // create days
    for (var i = dateUtil.week.sunday; i <= dateUtil.week.saturday; i++) {
        markup += '<th>' + dateUtil.dayNames[i].charAt(0) + '</th>';
    }

    // closing tag
    markup += '</tr></thead>';


    return {

        markup: markup

    };

};