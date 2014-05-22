var $ = require('jquery'),
    DatePickerView = require('./datePickerView'),
    moment = require('moment');


$(function () {

    var $body = $(window.document.body);

    $body.on('click', '[data-toggle="booty-datepicker"]', function (e) {

        if (!$body.find('#booty-datepicker').length) {
            var input = $(this).prev(),
                inputGroup = input.closest('.input-group');

            if (input.is('input')) {
                var thisMoment = (moment(input.val()));
                if (!thisMoment.isValid()) {
                    thisMoment = moment(); // just set today
                }

                var datePickerView = new DatePickerView(thisMoment);
                datePickerView.el.on('click', function (e) {
                    e.stopPropagation();
                });
                datePickerView.el.css('right', inputGroup.offset().left);
                datePickerView.el.css('top', inputGroup.offset().top + inputGroup.height());
                $body.append(datePickerView.el);


            }
        }
        e.stopPropagation();
    });

    $(window.document).on('click', ':not(#booty-datepicker)', function () {
        $('#booty-datepicker').remove();
    });

});
