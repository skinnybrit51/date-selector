var $ = require('jquery');

var start = function () {
    return 'hello world';
};

$(function () {

    window.alert(start());

});
module.exports = start;