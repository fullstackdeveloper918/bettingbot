const R = require('ramda');

const getTextFromCheerioObject = R.path(['children', '0', 'data']);

module.exports = {
    getTextFromCheerioObject,
};