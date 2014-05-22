module.exports = function (thisMoment) {

    var markup = '<div>' +
        '<button id="booty-datepicker-prev-year" class="btn btn-primary btn-xs">' +
        '&#60;&#60;</button>' +
        '<button id="booty-datepicker-prev-month" class="btn btn-primary btn-xs">&#60;</button>' +
        '<span>' + thisMoment.format('YYYY-MMM') + '</span>' +
        '<button id="booty-datepicker-next-month" class="btn btn-primary btn-xs">&#62;</button>' +
        '<button id="booty-datepicker-next-year" class="btn btn-primary btn-xs">' +
        '&#62;&#62;</button>' +
        '</div>';

    return {
        markup: markup
    };

};