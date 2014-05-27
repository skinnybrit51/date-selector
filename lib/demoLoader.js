var $ = require('jquery'),
    moment = require('moment'),
    datepicker = require('./datepicker');

$(function () {
    datepicker({
        formatter: function (value) {
            return moment(value, 'YYYY-MM-DD').format('DD MMM YYYY');
        }
    });
});