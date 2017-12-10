const sentiment = require('sentiment')

/**
 * Returns sentiment score of given text.
 *
 * @param {String} text - English please
 * @returns {Number} – The score
 */
module.exports = (text) => {
  if (typeof text !== 'string') {
    throw new TypeError('Argument must be a string.')
  }
  return sentiment(text).comparative
};