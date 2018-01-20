const test = require('blue-tape')
const facebook = require('../src/apis/facebook')
const authToken = require('../secrets/secrets.json').facebook.accessToken


// Tests for facebook.searchEvents
test('facebook.searchEvents returns an array.', async (t) => {
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

// Tests for facebook.getFeed
test(
  'facebook.getFeed should return an array.',
  async (t) => {
   const resp = await facebook.getFeed(authToken, '1458780194187500')
   t.true(Array.isArray(resp))
  }
)

test(
  'facebook.getFeed should fail if no arguments passed.',
  (t) => {
    t.shouldFail(facebook.getFeed())
    t.end()
  }
)

// Tests for facebook.getEventsByGeolocation
const location = {lat: 65.02761149999999, lng: 25.4667702}
test(
  'facebook.getEventsByGeolocation should fail if no arguments passed.',
  (t) => {
    t.shouldFail(facebook.getEventsByGeolocation())
    t.end()
  }
)

test(
  'facebook.getEventsByGeolocation should return an array.',
  async (t) => {
    const resp = await facebook.getEventsByGeolocation(authToken, location)
    t.true(Array.isArray(resp))
  }
)