var moment = require('moment');

module.exports = function (selectedMonth, selectedDate) {

    // set the selected month to the first day of the month
    selectedMonth.date(1);

    var selectedDateNow = null;
    if (selectedDate != null) {
        selectedDateNow = parseInt(selectedDate.format('YYYYMMDD'), 10);
    }

    var now = parseInt(moment().format('YYYYMMDD'), 10),
        previousMoment = selectedMonth.clone().subtract('months', 1),
        nextMoment = selectedMonth.clone().add('months', 1);

    var daysInCurrentMonth = selectedMonth.daysInMonth(),
        daysInPreviousMonth = previousMoment.daysInMonth(),
        startDay = selectedMonth.day(),
        i = 0;

    var days = [];
    // calculate how many days to display from previous month
    for (i = (daysInPreviousMonth - startDay) + 1; i <= daysInPreviousMonth; i++) {
        days.push(previousMoment.clone().date(i));
    }

    // insert current month days into days array
    for (i = 1; i <= daysInCurrentMonth; i++) {
        days.push(selectedMonth.clone().date(i));
    }

    // calculate the remaining days to add to day array
    // array should be 42 in length (6 weeks * 7 days)
    for (i = 1; days.length < 42; i++) {
        days.push(nextMoment.clone().date(i));
    }

    days.reverse();

    // opening tag
    var markup = '<tbody>';

    // loop through the 6 weeks to be displayed
    for (var w = 1; w <= 6; w++) {
        // opening week tag
        markup += '<tr>';

        // loop through the 7 days of the week
        for (var d = 1; d <= 7; d++) {

            var aMoment = days.pop(),
                classes = [],
                aNow = parseInt(aMoment.format('YYYYMMDD'), 10);

            if (aNow === now) {
                // today
                classes.push('today');
            }

            if (aMoment.month() !== selectedMonth.month()) {
                // current month
                classes.push('not-current-month');
            }

            if (selectedDateNow && (aNow === selectedDateNow)) {
                classes.push('selected-day');
            }

            markup += '<td class="' + classes.join(' ') + '" data-datepicker-date="' +
                aMoment.format('YYYY-MM-DD') + '">' + aMoment.date() + '</td>';

        }

        // closing week tag
        markup += '</tr>';
    }

    // closing tag
    markup += '</tbody>';

    return {

        markup: markup
    };

};