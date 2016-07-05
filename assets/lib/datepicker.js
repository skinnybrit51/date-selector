var $ = require('jquery'),
    _ = require('lodash'),
    moment = require('moment'),

    DatePickerView = require('./datepickerView'),
    defaultOptions = require('./options');

module.exports = function (options) {

    options = _.defaults(options || {}, defaultOptions);

    if (options.startingDay > 6 || options.startingDay < 0) {
        // reset to something sensible
        options.startingDay = 0; // sunday
    }

    var $body = $(window.document.body),
        datePickerView = null;

    var close = function () {
        if (datePickerView != null) {
            datePickerView.el.remove();
            datePickerView = null;
        }
    };

    // var open = function (input) {
    //     var inputGroup = input.closest('.input-group');
    //
    //     if (input.is('input')) {
    //         var selectedDate = input.val();
    //         if (options.validate(selectedDate)) {
    //             selectedDate = moment(options.parser(selectedDate));
    //         } else {
    //             selectedDate = moment(); // just set today
    //         }
    //         _.extend(options, {
    //             selectedDate : selectedDate,
    //             input : input
    //         });
    //         datePickerView = new DatePickerView(options);
    //         datePickerView.el.hide();
    //         datePickerView.el.on('click', function (e) {
    //             e.stopPropagation();
    //         });
    //         datePickerView.el.on('date-selector-close', function () {
    //             close();
    //         });
    //         $body.append(datePickerView.el);
    //         var left = (inputGroup.offset().left + parseFloat(inputGroup.css('width'))) -
    //             parseFloat(datePickerView.el.css('width'));
    //         datePickerView.el.css('left', left);
    //         datePickerView.el.css('top', inputGroup.offset().top + inputGroup.height());
    //         datePickerView.el.show();
    //     }
    // };

    var open = function (button) {
        datePickerView = new DatePickerView(options, null, options.outputTarget);
        datePickerView.el.hide();
        datePickerView.el.on('click', function (e) {
            e.stopPropagation();
        });
        datePickerView.el.on('date-selector-close', function () {
            close();
        });

        datePickerView.show(options.position, button);
    };

    var isOpen = function () {
        return $body.find('#date-selector').length;
    };

    // global listeners
    $body.off('click', '[data-toggle="date-selector"]');
    $body.on('click', '[data-toggle="date-selector"]', function (e) {
        if (!isOpen()) {
            open($(this));
        } else {
            close();
        }
        e.stopPropagation();
    });

    $(window.document).off('click', ':not(#date-selector)');
    $(window.document).on('click', ':not(#date-selector)', function () {
        close();
    });

    $(window.document).off('keyup');
    $(window.document).on('keyup', function (e) {
        if (e.keyCode === 27) {// esc
            if (isOpen()) {
                close();
            }
        }
    });

};
