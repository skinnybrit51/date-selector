var $ = require('jquery'),
    datepicker = require('./datepicker');

$(function () {
    datepicker({
        outputTarget : $('#date-input-demo1')
    });
});