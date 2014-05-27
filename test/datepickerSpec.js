require('./loader');
require('datepicker');

var moment = require('moment'),
    $ = require('jquery'),
    expect = require('chai').expect;

describe('Date Picker', function () {

    beforeEach(function () {
        $(document.body).empty();
        this.inputGroup = $('<div class="input-group">' +
            '<input type="text" class="form-control" placeholder="yyyy-mm-dd">' +
            '<span class="input-group-addon" data-toggle="booty-datepicker">' +
            '<span class="glyphicon glyphicon-calendar"></span></span>' +
            '</div>');
        this.input = this.inputGroup.find('input');
        this.launcher = this.inputGroup.find('.input-group-addon');
        $(document.body).append(this.inputGroup);

    });

    it('Should open the calendar', function () {
        expect($('body').find('#booty-datepicker').length).to.equal(0);
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(1);
    });

    it('Should close the picker', function () {
        // clicking on launcher again
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(1);
        $(document.body).trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(0);

        // clicking outside of picker
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(1);
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(0);

        // clicking on a date
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(1);
        $('body').find('td:not(.not-current-month)').trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(0);
    });

    it('Should set the input date once a date is selected', function () {
        var date = moment().format('YYYY-MM-DD');
        expect(this.input.val()).to.equal('');
        this.launcher.trigger('click');
        $('body').find('td[data-datepicker-date="' + date + '"]').trigger('click');
        expect(this.input.val()).to.equal(date);
    });

    it('Should set the selected date in the picker from the input', function () {
        var date = moment().format('YYYY-MM-DD');
        this.input.val(date);
        this.launcher.trigger('click');
        var cell = $('body').find('td[data-datepicker-date="' + date + '"]');
        expect(cell.is('.selected-day')).to.be.true;

    });

});