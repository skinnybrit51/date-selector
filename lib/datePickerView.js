var $ = require('jquery'),
    controlBarView = require('./controlBarView'),
    headerView = require('./headerView'),
    bodyView = require('./bodyView');


module.exports = function (thisMoment) {

    var el = $('<div></div>');

    var refreshView = function () {
        el.empty();
        el.append(controlBarView(thisMoment).markup);
        el.append(headerView().markup);
        el.append(bodyView(thisMoment).markup);
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