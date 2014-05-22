var $ = require('jquery'),
    controlBarView = require('./controlBarView'),
    tableView = require('./tableView');


module.exports = function (thisMoment) {

    var el = $('<div class="booty-datepicker"></div>');

    var refreshView = function () {
        el.empty();
        el.append(controlBarView(thisMoment).markup);
        el.append(tableView(thisMoment).markup);
    };

    refreshView();

    var api = {
        el: el,
        incrementYear: function () {
            thisMoment.add('years', 1);
            refreshView();
        },
        incrementMonth: function () {
            thisMoment.add('months', 1);
            refreshView();
        },
        decrementYear: function () {
            thisMoment.subtract('years', 1);
            refreshView();
        },
        decrementMonth: function () {
            thisMoment.subtract('months', 1);
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


    return api;

};