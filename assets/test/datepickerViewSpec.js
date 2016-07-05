require('./loader');

var _ = require('lodash'),
    $ = require('jquery'),
    moment = require('moment'),
    expect = require('chai').expect,
    sinon = require('sinon'),

    DatePickerView = require('datepickerView'),
    defaultOptions = require('options');

describe('Datepicker View', function () {

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
        this.options = _.extend({
            // june - zero indexed
            selectedDate : moment().year(2014).month(5).date(1),
            input : $('<input/>'),
            formatter : function (value) {
                return value;
            },
            validator : function () {
                return true;
            }
        }, defaultOptions);
        this.datePickerView = new DatePickerView(this.options);

    });

    afterEach(function () {
        delete this.datePickerView;
        this.sandbox.restore();
    });

    it('Should have the table markup', function () {
        expect(this.datePickerView.el.is('#date-selector')).to.be.true;
        expect(this.datePickerView.el.html()).to.contain('table');
    });

    it('Should set the date when a date is selected', function () {
        expect(this.options.input.val()).to.equal('');
        var spy = this.sandbox.spy();
        this.options.input.on('blur', spy);
        this.datePickerView.el.find('td[data-datepicker-date="2014-06-15"]').trigger('click');
        expect(spy.callCount).to.equal(1);
        expect(this.options.input.val()).to.equal('06/15/2014');    // display format
    });

    it('Should make the current month one less', function () {
        expect(this.datePickerView.el.html()).to.contain('June 2014');

        var prevMonthButton = this.datePickerView.el.find('#date-selector-prev-month');
        prevMonthButton.trigger('click');

        expect(this.datePickerView.el.html()).to.contain('May 2014');

        this.datePickerView.decrementMonth();
        this.datePickerView.decrementMonth();
        this.datePickerView.decrementMonth();
        this.datePickerView.decrementMonth();
        this.datePickerView.decrementMonth();

        expect(this.datePickerView.el.html()).to.contain('December 2013');
    });

    it('Should make the current month one more', function () {
        expect(this.datePickerView.el.html()).to.contain('June 2014');

        var nextMonthButton = this.datePickerView.el.find('#date-selector-next-month');
        nextMonthButton.trigger('click');

        expect(this.datePickerView.el.html()).to.contain('July 2014');

        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();

        expect(this.datePickerView.el.html()).to.contain('January 2015');
    });

    it('Should make the current year one less', function () {
        expect(this.datePickerView.el.html()).to.contain('June 2014');

        var prevYearButton = this.datePickerView.el.find('#date-selector-prev-year');
        prevYearButton.trigger('click');

        expect(this.datePickerView.el.html()).to.contain('June 2013');

        this.datePickerView.decrementYear();

        expect(this.datePickerView.el.html()).to.contain('June 2012');

    });

    it('Should make the current year one more', function () {
        expect(this.datePickerView.el.html()).to.contain('June 2014');

        var nextYearButton = this.datePickerView.el.find('#date-selector-next-year');
        nextYearButton.trigger('click');

        expect(this.datePickerView.el.html()).to.contain('June 2015');

        this.datePickerView.incrementYear();

        expect(this.datePickerView.el.html()).to.contain('June 2016');

    });
})
;
