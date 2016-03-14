var $ = require('jquery'),
    controlBarView = require('./controlBarView'),
    tableView = require('./tableView');


module.exports = function (options) {

    var el = $('<div id="date-selector"></div>');

    var selectedMonth = options.selectedDate.clone().date(1);

    var refreshView = function () {
        el.empty();
        el.append(controlBarView(selectedMonth).markup);
        el.append(tableView(selectedMonth, options.selectedDate).markup);
    };

    refreshView();

    var api = {
        el: el,
        incrementYear: function () {
            selectedMonth.add(1, 'years');
            refreshView();
        },
        incrementMonth: function () {
            selectedMonth.add(1, 'months');
            refreshView();
        },
        decrementYear: function () {
            selectedMonth.subtract(1, 'years');
            refreshView();
        },
        decrementMonth: function () {
            selectedMonth.subtract(1, 'months');
            refreshView();
        }
    };

    // listeners
    el.on('click', '#date-selector-prev-year', function () {
        api.decrementYear();
    });

    el.on('click', '#date-selector-prev-month', function () {
        api.decrementMonth();
    });

    el.on('click', '#date-selector-next-month', function () {
        api.incrementMonth();
    });

    el.on('click', '#date-selector-next-year', function () {
        api.incrementYear();
    });

    el.on('click', 'td:not(.not-current-month)', function () {
        var cell = $(this);
        var date = cell.attr('data-datepicker-date');
        options.input.val(options.formatter(date));
        cell.trigger('date-selector-close');
        options.input.trigger('blur');
    });

    return api;

};
