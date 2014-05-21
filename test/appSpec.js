require('./loader');

var app = require('app'),
    expect = require('chai').expect;

describe('App', function () {

    it('Should return hello world', function () {

        expect(app()).to.equal('hello world');
    });

});