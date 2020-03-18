import moment from 'moment'

var util = {}

util.formatDate = function(date) {
    const d = moment(new Date(date));
    return d.format("MMMM DD, YYYY");
}

util.formatPrice = function (cents, location = "USD"){
    return (cents / 100).toLocaleString("en-US", {
        style: 'currency',
        currency: location
    })
}

util.discounts = {
    SAVE20PERCENT: total => total * 0.2,
    SAVE10BUCKS: () => 1000,
    SAVE20OVER100: total => (total >= 10000 ? 2000 : 0),
    SAVE30JAN2019: () =>
      Date.now().getMonth() === 1 && Date.now().getYear === 2019 ? 3000 : 0,
    FREESHIPPING: (_, shipping) => {
      return shipping;
    }
  };

module.exports = util;