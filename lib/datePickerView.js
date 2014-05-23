var $ = require('jquery'),
    controlBarView = require('./controlBarView'),
    tableView = require('./tableView');


module.exports = function (selectedDate, input) {

    var el = $('<div id="booty-datepicker"></div>');

    var selectedMonth = selectedDate.clone().date(1);

    var refreshView = function () {
        el.empty();
        el.append(controlBarView(selectedMonth).markup);
        el.append(tableView(selectedMonth, selectedDate).markup);
    };

    refreshView();

    var api = {
        el: el,
        incrementYear: function () {
            selectedMonth.add('years', 1);
            refreshView();
        },
        incrementMonth: function () {
            selectedMonth.add('months', 1);
            refreshView();
        },
        decrementYear: function () {
            selectedMonth.subtract('years', 1);
            refreshView();
        },
        decrementMonth: function () {
            selectedMonth.subtract('months', 1);
            refreshView();
        }
    };

    // listeners
    el.on('click', '#booty-datepicker-prev-year', function () {
        api.decrementYear();
    });

    el.on('click', '#booty-datepicker-prev-month', function () {
        api.decrementMonth();
    });

    el.on('click', '#booty-datepicker-next-month', function () {
        api.incrementMonth();
    });

    el.on('click', '#booty-datepicker-next-year', function () {
        api.incrementYear();
    });

    el.on('click', 'td:not(.not-current-month)', function () {
        var cell = $(this);
        var date = cell.attr('data-datepicker-date');
        input.val(date);
        cell.trigger('booty-datepicker-close');
    });

    return api;

};