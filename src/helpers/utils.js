import moment from 'moment'

var util = {}

util.formatDate = function(date) {
    const d = moment(new Date(date));
    return d.format("MMMM DD, YYYY");
}

module.exports = util;