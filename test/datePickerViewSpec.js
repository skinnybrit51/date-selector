require('./loader');

var moment = require('moment'),
    expect = require('chai').expect,
    DatePickerView = require('datePickerView');

describe('DatePicker View', function () {

    beforeEach(function () {

        var thisMoment = moment().year(2014).month(5).date(1);  // june - zero indexed

        this.datePickerView = new DatePickerView(thisMoment);

    });

    afterEach(function () {
        delete this.datePickerView;
    });

    it('Should have the table markup', function () {
        expect(this.datePickerView.el.html()).to.contain('table');
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

});