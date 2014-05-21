require('./loader');

var expect = require('chai').expect,
    headerView = require('headerView');


describe('Header View', function () {

    it('Should create thead with the label week day as titles', function () {

        var markup = headerView().markup;

        expect(markup).to.equal('<thead>' +
            '<tr>' +
            '<th>S</th>' +
            '<th>M</th>' +
            '<th>T</th>' +
            '<th>W</th>' +
            '<th>T</th>' +
            '<th>F</th>' +
            '<th>S</th>' +
            '</tr>' +
            '</thead>');


    });

});