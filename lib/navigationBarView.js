var controlBarTemplate = require('./templates/controlBarTemplate.hbs');

module.exports = function (selectedMonth, options) {

    return {
        markup : controlBarTemplate({
            showYearButtons : options.showYearButtons,
            lang : options.lang,
            month : selectedMonth.format(options.SELECTED_MONTH_FORMAT)
        })
    };

};
