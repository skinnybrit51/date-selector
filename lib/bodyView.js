module.exports = function (thisMoment) {

    var daysInCurrentMonth = thisMoment.daysInMonth(),
        daysInPreviousMonth = thisMoment.clone().subtract('months', 1).daysInMonth(),
        startDay = thisMoment.day(),
        i = 0;

    var days = [];
    // calculate how many days to display from previous month
    for (i = (daysInPreviousMonth - startDay) + 1; i <= daysInPreviousMonth; i++) {
        days.push(i);
    }

    // insert current month days into days array
    for (i = 1; i <= daysInCurrentMonth; i++) {
        days.push(i);
    }

    // calculate the remaining days to add to day array
    // array should be 42 in length (6 weeks * 7 days)
    for (i = 1; days.length < 42; i++) {
        days.push(i);
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

            markup += '<td>' + days.pop() + '</td>';

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