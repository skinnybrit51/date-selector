module.exports = function (selectedMonth) {

    var markup = '<div class="control-bar">' +
        '<div class="previous-buttons">' +
        '<button type="button" id="booty-datepicker-prev-year" class="btn btn-primary btn-xs">' +
        '<span class="glyphicon glyphicon-fast-backward"></span></button>' +
        '<button type="button" id="booty-datepicker-prev-month" class="btn btn-primary btn-xs">' +
        '<span class="glyphicon glyphicon-backward"></span></button>' +
        '</div>' +
        '<div class="next-buttons">' +
        '<button type="button" id="booty-datepicker-next-year" class="btn btn-primary btn-xs">' +
        '<span class="glyphicon glyphicon-fast-forward"></span></button>' +
        '<button type="button" id="booty-datepicker-next-month" class="btn btn-primary btn-xs">' +
        '<span class="glyphicon glyphicon-forward"></span></button>' +
        '</div>' +
        '<div class="center-text">' +
        '<span>' + selectedMonth.format('YYYY-MMM') + '</span>' +
        '</div>' +
        '</div>';

    return {
        markup: markup
    };

};