var $ = require('jquery'),
    _ = require('underscore'),
    DatePickerView = require('./datepickerView'),
    moment = require('moment');

var defaultOptions = {
    RAW_FORMAT: 'YYYY-MM-DD',
    INPUT_FORMATS: ['MM/DD/YYYY'],
    DISPLAY_FORMAT: 'MM/DD/YYYY',
    formatter: function (value) {
        return moment(value, this.RAW_FORMAT, true).format(this.DISPLAY_FORMAT);
    },
    validate: function (value) {
        return moment(value, this.INPUT_FORMATS, true).isValid();
    },
    parser: function (value) {
        return moment(value, this.INPUT_FORMATS, true).format(this.RAW_FORMAT);
    }
};

module.exports = function (options) {

    options = _.defaults(options || {}, defaultOptions);

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
            var selectedDate = input.val();
            if (options.validate(selectedDate)) {
                selectedDate = moment(options.parser(selectedDate));
            } else {
                selectedDate = moment(); // just set today
            }
            _.extend(options, {
                selectedDate: selectedDate,
                input: input
            });
            datePickerView = new DatePickerView(options);
            datePickerView.el.hide();
            datePickerView.el.on('click', function (e) {
                e.stopPropagation();
            });
            datePickerView.el.on('booty-datepicker-close', function () {
                close();
            });
            $body.append(datePickerView.el);
            var left = (inputGroup.offset().left + parseFloat(inputGroup.css('width'))) -
                parseFloat(datePickerView.el.css('width'));
            datePickerView.el.css('left', left);
            datePickerView.el.css('top', inputGroup.offset().top + inputGroup.height());
            datePickerView.el.show();
        }
    };

    var isOpen = function () {
        return $body.find('#booty-datepicker').length;
    };

    // global listeners
    $body.off('click', '[data-toggle="booty-datepicker"]');
    $body.on('click', '[data-toggle="booty-datepicker"]', function (e) {
        if (!isOpen()) {
            open($(this).prev());
        } else {
            close();
        }
        e.stopPropagation();
    });

    $(window.document).off('click', ':not(#booty-datepicker)');
    $(window.document).on('click', ':not(#booty-datepicker)', function () {
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
