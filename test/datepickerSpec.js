require('./loader');

var datepicker = require('datepicker'),
    moment = require('moment'),
    $ = require('jquery'),
    expect = require('chai').expect,
    sinon = require('sinon');

describe('Date Picker', function () {

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
        $(document.body).empty();
        $('body').empty();
        $(window.document.body).empty();
        this.inputGroup = $('<div class="input-group">' +
            '<input type="text" class="form-control" placeholder="yyyy-mm-dd">' +
            '<span class="input-group-addon" data-toggle="booty-datepicker">' +
            '<span class="glyphicon glyphicon-calendar"></span></span>' +
            '</div>');
        this.input = this.inputGroup.find('input');
        this.launcher = this.inputGroup.find('.input-group-addon');

        $(document.body).append(this.inputGroup);

        $(function () {
            datepicker();
        });
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    it('Should open the calendar', function () {
        expect($('body').find('#booty-datepicker').length).to.equal(0);
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(1);

    });

    it('Should close the picker', function () {

        // clicking outside of picker
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(1);
        $(document.body).trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(0);

        // clicking on launcher again
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(1);
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(0);

        // clicking on a date
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(1);
        $('body').find('td:not(.not-current-month)').trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(0);

        // hitting the escape key
        this.launcher.trigger('click');
        expect($('body').find('#booty-datepicker').length).to.equal(1);
        $(document).trigger($.Event('keyup', { keyCode: 27 }));
        expect($('body').find('#booty-datepicker').length).to.equal(0);
    });

    it('Should set the input date once a date is selected', function () {
        var aMoment = moment();
        expect(this.input.val()).to.equal('');
        this.launcher.trigger('click');
        $('body').find('td[data-datepicker-date="' + aMoment.format('YYYY-MM-DD') + '"]')
            .trigger('click');
        expect(this.input.val()).to.equal(aMoment.format('MM/DD/YYYY'));
    });

    it('Should format a date', function () {
        datepicker({formatter: function (value) {
            return moment(value).format('DD MMM YYYY');
        }});

        var date = moment().format('YYYY-MM-DD');
        this.launcher.trigger('click');
        $('body').find('td[data-datepicker-date="' + date + '"]').trigger('click');
        expect(this.input.val()).to.equal(moment(date).format('DD MMM YYYY'));
    });

    it('Should set the selected date in the picker from the input', function () {
        var date = moment().format('YYYY-MM-DD');
        this.input.val(date);
        this.launcher.trigger('click');
        var cell = $('body').find('td[data-datepicker-date="' + date + '"]');
        expect(cell.is('.selected-day')).to.be.true;
    });

    it('Should validate the date from the input', function () {

        var date = 'asdasdasd';
        this.input.val(date);

        // date not valid so should use now
        this.launcher.trigger('click');
        var cell = $('body').find('td[data-datepicker-date="' + date + '"]');
        expect(cell.is('.selected-day')).to.be.false;
        this.launcher.trigger('click');

        // valid date
        var aMoment = moment('2014-01-15');
        this.input.val(aMoment.format('MM/DD/YYYY'));
        this.launcher.trigger('click');
        cell = $('body').find('td[data-datepicker-date="' + aMoment.format('YYYY-MM-DD') + '"]');
        expect(cell.is('.selected-day')).to.be.true;
        this.launcher.trigger('click');
    });

    it('Should call the parser', function () {
        var parser = this.sandbox.spy();
        datepicker({parser: parser, validate: function () {
            return true;
        }});
        expect(parser.callCount).to.equal(0);

        this.input.val('2014-05-15');
        this.launcher.trigger('click');
        expect(parser.callCount).to.equal(1);
        expect(parser.args[0][0]).to.equal('2014-05-15');

    });
});