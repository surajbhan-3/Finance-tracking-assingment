const axios = require('axios');

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/' + fromCurrency);
    const rate = response.data.rates[toCurrency];
    return amount * rate;
  } catch (error) {
    throw new Error('Currency conversion failed');
  }
};

module.exports = { convertCurrency };
