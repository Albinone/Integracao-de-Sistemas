let getCurrentDate = () => new Date().toLocaleString();

let formatCurrency = (amount, currency  = 'USD') => {

    return new Intl.NumberFormat('en-US', {
         style: 'currency',
          currency: currency

        }).format(amount);
}

// Forma 1

/*exports.getCurrentDate = getCurrentDate
exports = formatCurrency = formatCurrency*/

// Forma 2

module.exports = {getCurrentDate, formatCurrency};