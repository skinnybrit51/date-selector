module.exports = function (thisMoment) {

    var markup = '<div>' +
        '<button id="booty-datepicker-prev-year">&#60;&#60;</button>' +
        '<button id="booty-datepicker-prev-month">&#60;</button>' +
        '<span>' + thisMoment.format('YYYY-MMM') + '</span>' +
        '<button id="booty-datepicker-next-month">&#62;</button>' +
        '<button id="booty-datepicker-next-year">&#62;&#62;</button>' +
        '</div>';

    return {
        markup: markup
    };

};