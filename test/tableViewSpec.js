require('./loader');

var moment = require('moment'),
    $ = require('jquery'),
    expect = require('chai').expect,
    tableView = require('tableView');

describe('Table View', function () {

    it('Should have a header and body view attached', function () {

        var table = $(tableView(moment()).markup);

        expect(table.is('.table.table-bordered')).to.be.true;
        expect(table.find('thead th')).to.have.length(7);
        expect(table.find('tbody tr')).to.have.length(6);
        expect(table.find('tbody td')).to.have.length(42);

    });

});