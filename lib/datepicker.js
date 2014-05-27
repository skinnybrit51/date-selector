var $ = require('jquery'),
    DatePickerView = require('./datepickerView'),
    moment = require('moment');


$(function () {

    var $body = $(window.document.body),
        datePickerView = null;

    var close = function () {
        if (datePickerView != null) {
            datePickerView.el.remove();
            datePickerView = null;
        }
    };

    var open = function (input) {
        var inputGroup = input.closest('.input-group');

        if (input.is('input')) {
            var selectedDate = (moment(input.val()));
            if (!selectedDate.isValid()) {
                selectedDate = moment(); // just set today
            }

            datePickerView = new DatePickerView(selectedDate, input);
            datePickerView.el.on('click', function (e) {
                e.stopPropagation();
            });
            datePickerView.el.on('booty-datepicker-close', function () {
                close();
            });
            datePickerView.el.css('right', inputGroup.offset().left);
            datePickerView.el.css('top', inputGroup.offset().top + inputGroup.height());
            $body.append(datePickerView.el);
        }
    };

    var isOpen = function () {
        return $body.find('#booty-datepicker').length;
    };

    // global listeners
    $body.on('click', '[data-toggle="booty-datepicker"]', function (e) {

        if (!isOpen()) {
            open($(this).prev());
        } else {
            close();
        }
        e.stopPropagation();
    });

    $(window.document).on('click', ':not(#booty-datepicker)', function () {
        close();
    });

});
