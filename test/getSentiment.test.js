const test = require('tape')
const getSentiment = require('../src/getSentiment')

test('Should return a number when passed a string.', (t) => {
  t.equal(typeof getSentiment("Return text for me please."), 'number')
  t.end()
})

