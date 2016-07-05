var $ = require('jquery'),
    moment = require('moment'),
    navigationBarView = require('./navigationBarView'),
    tableView = require('./tableView');

require('jquery-ui/position');

module.exports = function (options, selectedDate, outputTarget) {

    if (!moment.isMoment(selectedDate)) {

        // just default today
        selectedDate = moment();
    }

    var el = $('<div id="date-selector"></div>');

    var selectedMonth = selectedDate.clone().date(1);

    var refreshView = function () {
        el.empty();
        el.append(navigationBarView(selectedMonth, options).markup);
        el.append(tableView(selectedMonth, selectedDate, options).markup);
    };

    refreshView();

    var api = {
        el : el,
        incrementYear : function () {
            selectedMonth.add(1, 'years');
            refreshView();
        },
        incrementMonth : function () {
            selectedMonth.add(1, 'months');
            refreshView();
        },
        decrementYear : function () {
            selectedMonth.subtract(1, 'years');
            refreshView();
        },
        decrementMonth : function () {
            selectedMonth.subtract(1, 'months');
            refreshView();
        },
        todaysMonth : function () {
            selectedMonth = moment();
            refreshView();
        },
        show : function (position, button) {
            $(window.document.body).append(el);

            // position = north, east, south, west
            position = position || 'south';

            switch (position.toLowerCase()) {
                case 'north':
                case 'south':
                case 'east':
                case 'west':
                default:
                {
                    el.position({
                        my : 'right bottom',
                        at : 'right top',
                        of : button
                    });
                }
            }
            el.show();
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

    el.on('click', '#date-selector-today', function () {
        api.todaysMonth();
    });

    el.on('click', 'td:not(.not-current-month)', function () {
        var cell = $(this);
        var date = cell.attr('data-datepicker-date');
        cell.trigger('date-selector-close');

        if (outputTarget) {
            if (outputTarget.is('input')) {
                outputTarget.val(options.formatter(date));
                outputTarget.trigger('blur');
            } else {
                outputTarget.text(options.formatter(date));
            }

        }

    });

    return api;

};
