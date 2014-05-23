require('./loader');

var moment = require('moment'),
    expect = require('chai').expect,
    controlBarView = require('controlBarView');

describe('Control Bar View', function () {

    beforeEach(function () {

        var selectedMonth = moment().year(2014).month(5);

        this.controlBarView = controlBarView(selectedMonth);     // month is Jun - zero indexed

    });

    it('Should have the correct markup', function () {

        var markup = '<div class="control-bar">' +
            '<div class="previous-buttons">' +
            '<button type="button" id="booty-datepicker-prev-year" ' +
            'class="btn btn-primary btn-xs">' +
            '<span class="glyphicon glyphicon-fast-backward"></span></button>' +
            '<button type="button" id="booty-datepicker-prev-month" ' +
            'class="btn btn-primary btn-xs">' +
            '<span class="glyphicon glyphicon-backward"></span></button>' +
            '</div>' +
            '<div class="next-buttons">' +
            '<button type="button" id="booty-datepicker-next-year" ' +
            'class="btn btn-primary btn-xs">' +
            '<span class="glyphicon glyphicon-fast-forward"></span></button>' +
            '<button type="button" id="booty-datepicker-next-month" ' +
            'class="btn btn-primary btn-xs">' +
            '<span class="glyphicon glyphicon-forward"></span></button>' +
            '</div>' +
            '<div class="center-text">' +
            '<span>' + moment().year(2014).month(5).format('YYYY-MMM') + '</span>' +
            '</div>' +
            '</div>';

        expect(this.controlBarView.markup).to.equal(markup);
    });

});