const sentiment = require('sentiment')

module.exports = (text) => sentiment(text).comparative;