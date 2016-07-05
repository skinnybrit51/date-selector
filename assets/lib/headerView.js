var tableHeaderCellTemplate = require('./templates/tableHeaderCellTemplate.hbs');

module.exports = function (options) {

    var lang = options.lang;

    // opening tag
    var markup = '<thead><tr>';

    // create days
    var dayNamesClone = lang.dayNames.slice(0);  // clone
    var index = options.startingDay;

    while (dayNamesClone.length) {
        if (dayNamesClone[index] == null) {
            index = 0;
        }
        markup += tableHeaderCellTemplate({
            dayName : dayNamesClone[index].charAt(0)
        });
        dayNamesClone.splice(index, 1);
    }

    // closing tag
    markup += '</tr></thead>';

    return {
        markup : markup
    };

};
