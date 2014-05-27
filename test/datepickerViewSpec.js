require('./loader');

var $ = require('jquery'),
    moment = require('moment'),
    expect = require('chai').expect,
    DatePickerView = require('datepickerView'),
    sinon = require('sinon');

describe('Datepicker View', function () {

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
        this.options = {
            // june - zero indexed
            selectedDate: moment().year(2014).month(5).date(1),
            input: $('<input/>'),
            formatter: function (value) {
                return value;
            },
            validator: function () {
                return true;
            }
        };
        this.datePickerView = new DatePickerView(this.options);

    });

    afterEach(function () {
        delete this.datePickerView;
        this.sandbox.restore();
    });

    it('Should have the table markup', function () {
        expect(this.datePickerView.el.is('#booty-datepicker')).to.be.true;
        expect(this.datePickerView.el.html()).to.contain('table');
    });

    it('Should set the date when a date is selected', function () {
        expect(this.options.input.val()).to.equal('');
        var spy = this.sandbox.spy();
        this.options.input.on('blur', spy);
        this.datePickerView.el.find('td[data-datepicker-date="2014-06-15"]').trigger('click');
        expect(spy.callCount).to.equal(1);
        expect(this.options.input.val()).to.equal('2014-06-15');
    });

    it('Should make the current month one less', function () {
        expect(this.datePickerView.el.html()).to.contain('2014-Jun');

        var prevMonthButton = this.datePickerView.el.find('#booty-datepicker-prev-month');
        prevMonthButton.trigger('click');

        expect(this.datePickerView.el.html()).to.contain('2014-May');

        this.datePickerView.decrementMonth();
        this.datePickerView.decrementMonth();
        this.datePickerView.decrementMonth();
        this.datePickerView.decrementMonth();
        this.datePickerView.decrementMonth();

        expect(this.datePickerView.el.html()).to.contain('2013-Dec');
    });

    it('Should make the current month one more', function () {
        expect(this.datePickerView.el.html()).to.contain('2014-Jun');

        var nextMonthButton = this.datePickerView.el.find('#booty-datepicker-next-month');
        nextMonthButton.trigger('click');

        expect(this.datePickerView.el.html()).to.contain('2014-Jul');

        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();
        this.datePickerView.incrementMonth();

        expect(this.datePickerView.el.html()).to.contain('2015-Jan');
    });

    it('Should make the current year one less', function () {
        expect(this.datePickerView.el.html()).to.contain('2014-Jun');

        var prevYearButton = this.datePickerView.el.find('#booty-datepicker-prev-year');
        prevYearButton.trigger('click');

        expect(this.datePickerView.el.html()).to.contain('2013-Jun');

        this.datePickerView.decrementYear();

        expect(this.datePickerView.el.html()).to.contain('2012-Jun');

    });

    it('Should make the current year one more', function () {
        expect(this.datePickerView.el.html()).to.contain('2014-Jun');

        var nextYearButton = this.datePickerView.el.find('#booty-datepicker-next-year');
        nextYearButton.trigger('click');

        expect(this.datePickerView.el.html()).to.contain('2015-Jun');

        this.datePickerView.incrementYear();

        expect(this.datePickerView.el.html()).to.contain('2016-Jun');

    });
})
;