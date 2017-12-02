const sentiment = require('sentiment')

/**
 * Returns sentiment score of given text.
 *
 * @param {String} text - English please
 * @returns {Number} – The score
 */
module.exports = (text) => sentiment(text).comparative;