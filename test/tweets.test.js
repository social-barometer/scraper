const test = require('blue-tape')
const tweets = require('../src/apis/tweets')
const testParams = {
  q: 'Uncle Dolan',
  count: 5,
}


test('tweets.search should fail if no arguments passed.', (t) => {
  t.shouldFail(tweets.search())
  t.end()
})

test('tweets.search should fail if no accesToken passed', (t) => {
  t.shouldFail(tweets.search(undefined, 'testing', testParams))
  t.end()
})

test('tweets.search should fail if no accesTokenSecret passed', (t) => {
  t.shouldFail(tweets.search('testing', undefined, testParams))
  t.end()
})