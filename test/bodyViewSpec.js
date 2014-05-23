require('./loader');

var $ = require('jquery'),
    moment = require('moment'),
    expect = require('chai').expect,
    bodyView = require('bodyView');

describe('Body View', function () {

    it('Should display today class', function () {
        var today = moment(),
            selectedMonth = moment();
        var markup = bodyView(selectedMonth).markup;
        var cell = $(markup).find('td[data-datepicker-date="' + today.format('YYYY-MM-DD') + '"]');
        expect(cell.is('.today')).to.be.true;
    });

    it('Should display the selected day class', function () {

        var selectedMonth = moment().year(2014).month(4),
            selectedDate = moment().year(2014).month(4).date(3);

        var markup = bodyView(selectedMonth, selectedDate).markup;
        var cell = $(markup).find('td[data-datepicker-date="' +
            selectedDate.format('YYYY-MM-DD') + '"]');

        expect(cell.is('.selected-day')).to.be.true;

        selectedMonth = moment().year(2014).month(5);

        markup = bodyView(selectedMonth, selectedDate).markup;
        cell = $(markup).find('td[data-datepicker-date="' +
            selectedDate.format('YYYY-MM-DD') + '"]');
        expect(cell.is('.selected-day')).to.be.false;

    });

    it('Should create all the days for the 2014-Apr', function () {

        var selectedMonth = moment().year(2014).month(3);

        var markup = bodyView(selectedMonth).markup;  // month is Apr - zero indexed

        expect(markup).to.equal('<tbody>' +
                '<tr>' +
                '<td class="not-current-month" data-datepicker-date="2014-03-30">30</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-03-31">31</td>' +
                '<td class="" data-datepicker-date="2014-04-01">1</td>' +
                '<td class="" data-datepicker-date="2014-04-02">2</td>' +
                '<td class="" data-datepicker-date="2014-04-03">3</td>' +
                '<td class="" data-datepicker-date="2014-04-04">4</td>' +
                '<td class="" data-datepicker-date="2014-04-05">5</td>' +
                '</tr>' +
                '<tr>' +
                '<td class="" data-datepicker-date="2014-04-06">6</td>' +
                '<td class="" data-datepicker-date="2014-04-07">7</td>' +
                '<td class="" data-datepicker-date="2014-04-08">8</td>' +
                '<td class="" data-datepicker-date="2014-04-09">9</td>' +
                '<td class="" data-datepicker-date="2014-04-10">10</td>' +
                '<td class="" data-datepicker-date="2014-04-11">11</td>' +
                '<td class="" data-datepicker-date="2014-04-12">12</td>' +
                '</tr>' +
                '<tr>' +
                '<td class="" data-datepicker-date="2014-04-13">13</td>' +
                '<td class="" data-datepicker-date="2014-04-14">14</td>' +
                '<td class="" data-datepicker-date="2014-04-15">15</td>' +
                '<td class="" data-datepicker-date="2014-04-16">16</td>' +
                '<td class="" data-datepicker-date="2014-04-17">17</td>' +
                '<td class="" data-datepicker-date="2014-04-18">18</td>' +
                '<td class="" data-datepicker-date="2014-04-19">19</td>' +
                '</tr>' +
                '<tr>' +
                '<td class="" data-datepicker-date="2014-04-20">20</td>' +
                '<td class="" data-datepicker-date="2014-04-21">21</td>' +
                '<td class="" data-datepicker-date="2014-04-22">22</td>' +
                '<td class="" data-datepicker-date="2014-04-23">23</td>' +
                '<td class="" data-datepicker-date="2014-04-24">24</td>' +
                '<td class="" data-datepicker-date="2014-04-25">25</td>' +
                '<td class="" data-datepicker-date="2014-04-26">26</td>' +
                '</tr>' +
                '<tr>' +
                '<td class="" data-datepicker-date="2014-04-27">27</td>' +
                '<td class="" data-datepicker-date="2014-04-28">28</td>' +
                '<td class="" data-datepicker-date="2014-04-29">29</td>' +
                '<td class="" data-datepicker-date="2014-04-30">30</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-01">1</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-02">2</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-03">3</td>' +
                '</tr>' +
                '<tr>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-04">4</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-05">5</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-06">6</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-07">7</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-08">8</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-09">9</td>' +
                '<td class="not-current-month" data-datepicker-date="2014-05-10">10</td>' +
                '</tr>' +
                '</tbody>'
        );
    });

});