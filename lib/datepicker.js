var $ = require('jquery'),
    DatePickerView = require('./datePickerView'),
    moment = require('moment');


$(function () {

    var datePickerView = new DatePickerView(moment());
    $('.container').append(datePickerView.el);

});
