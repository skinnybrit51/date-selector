require('./loader');

var moment = require('moment'),
    expect = require('chai').expect,
    controlBarView = require('controlBarView');

describe('Control Bar View', function () {

    beforeEach(function () {

        var thisMoment = moment().year(2014).month(5).date(1);

        this.controlBarView = controlBarView(thisMoment);     // month is Jun - zero indexed

    });

    it('Should have the correct markup', function () {

        expect(this.controlBarView.markup).to.equal('<div>' +
            '<button id="booty-datepicker-prev-year">&#60;&#60;</button>' +   // previous year
            '<button id="booty-datepicker-prev-month">&#60;</button>' +       // previous month
            '<span>2014-Jun</span>' +       // current display year and month
            '<button id="booty-datepicker-next-month">&#62;</button>' +      // next month
            '<button id="booty-datepicker-next-year">&#62;&#62;</button>' + // next year
            '</div>');
    });

});