var expect = require('chai').expect,
    dateUtil = require('dateUtil');

describe('Date Util', function () {

    it('Should have constants for week days', function () {

        expect(dateUtil.week.sunday).to.equal(0);
        expect(dateUtil.week.monday).to.equal(1);
        expect(dateUtil.week.tuesday).to.equal(2);
        expect(dateUtil.week.wednesday).to.equal(3);
        expect(dateUtil.week.thursday).to.equal(4);
        expect(dateUtil.week.friday).to.equal(5);
        expect(dateUtil.week.saturday).to.equal(6);

    });

    it('Should give the name for each day', function(){

        expect(dateUtil.dayNames[0]).to.equal('Sunday');
        expect(dateUtil.dayNames[1]).to.equal('Monday');
        expect(dateUtil.dayNames[2]).to.equal('Tuesday');
        expect(dateUtil.dayNames[3]).to.equal('Wednesday');
        expect(dateUtil.dayNames[4]).to.equal('Thursday');
        expect(dateUtil.dayNames[5]).to.equal('Friday');
        expect(dateUtil.dayNames[6]).to.equal('Saturday');

    });

});