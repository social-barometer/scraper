const test = require('blue-tape')
const facebook = require('../apis/facebook')
const authToken = require('../secrets/secrets.json').FBAccessToken

test('facebook.searchEvents returns an JSON array.', async (t) => {
  const resp = await facebook.searchEvents(authToken, 'oulu')
  t.true(Array.isArray(resp))
})

test(
  'facebook.searchEvents should fail if no arguments passed.',
  (t) => {
    t.shouldFail(facebook.searchEvents())
    t.end()
  }
)

test(
  'facebook.searchEvents should fail if invalid accessToken passed.',
  (t) => {
    t.shouldFail(facebook.searchEvents('derp', 'oulu'))
    t.end()
  }
)

test(
  'facebook.searchEvents should fail if no eventName passed.',
  (t) => {
    t.shouldFail(facebook.searchEvents('derp', ''))
    t.end()
  }
)
