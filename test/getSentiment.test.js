const test = require('tape')
const getSentiment = require('../src/getSentiment')

test('Should return a number when passed a string.', (t) => {
  const actual = getSentiment("Return text for me please.")
  const expected = 'number'

  t.equal(typeof actual, expected)

  t.end()
})

test('Should return -1 when passed "this sucks".', (t) => {
  const actual = getSentiment('this sucks')
  const expected = -1.5

  t.equal(actual, expected)

  t.end()
})

test('Should throw an error if non string value passed.', (t) => {
  t.throws(getSentiment)

  t.end()
})