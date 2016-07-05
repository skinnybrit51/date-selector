var moment = require('moment');

module.exports = Object.freeze({
    lang : {
        previous_year : 'Previous Year',
        next_year : 'Next Year',
        previous_month : 'Previous Month',
        next_month : 'Next Month',
        today : 'Today',
        selected_day : 'Selected Day',
        dayNames : ['Sunday', 'Monday', 'Tuesday', 'WednesDay', 'Thursday', 'Friday', 'Saturday']
    },
    showYearButtons : true,
    startingDay : 0, // Sunday`
    RAW_FORMAT : 'YYYY-MM-DD',
    INPUT_FORMATS : ['MM/DD/YYYY'],
    DISPLAY_FORMAT : 'MM/DD/YYYY',
    SELECTED_MONTH_FORMAT : 'MMMM YYYY',
    position : 'south',
    outputTarget : null,
    formatter : function (value) {
        return moment(value, this.RAW_FORMAT, true).format(this.DISPLAY_FORMAT);
    },
    validate : function (value) {
        return moment(value, this.INPUT_FORMATS, true).isValid();
    },
    parser : function (value) {
        return moment(value, this.INPUT_FORMATS, true).format(this.RAW_FORMAT);
    }
});
