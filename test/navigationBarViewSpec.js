require('./loader');

var moment = require('moment'),
    chai = require('chai'),

    navigationBarView = require('navigationBarView'),
    defaultOptions = require('options');

chai.use(require('chai-string'));

var expect = chai.expect;

describe('Control Bar View', function () {

    beforeEach(function () {

        var selectedMonth = moment().year(2014).month(5);

        this.navigationBarView = navigationBarView(selectedMonth, defaultOptions);     // month is Jun - zero indexed

    });

    it('Should have the correct markup', function () {

        var markup = '<div class="navigation-bar">' +
            '<div class="previous-buttons">' +
            '<div class="group-buttons">' +
            '<button type="button" id="date-selector-prev-year" title="Previous Year">' +
            '<span class="icon icon-previous-year"></span></button>' +
            '<button type="button" id="date-selector-prev-month" title="Previous Month">' +
            '<span class="icon icon-previous-month"></span></button>' +
            '</div>' +
            '</div>' +
            '<div class="next-buttons">' +
            '<div class="group-buttons">' +
            '<button type="button" id="date-selector-today" title="Today">' +
            '<span class="icon icon-today"></span>' +
            '</button>' +
            '<button type="button" id="date-selector-next-month" title="Next Month">' +
            '<span class="icon icon-next-month"></span></button>' +
            '<button type="button" id="date-selector-next-year" title="Next Year">' +
            '<span class="icon icon-next-year"></span></button>' +
            '</div>' +
            '</div>' +
            '<div class="month-text">' +
            '<span>' + moment().year(2014).month(5).format('MMMM YYYY') + '</span>' +
            '</div>' +
            '</div>';

        expect(this.navigationBarView.markup).to.equalIgnoreSpaces(markup);
    });

});
