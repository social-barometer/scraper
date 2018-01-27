const test = require('blue-tape')
const traffic = require('../src/apis/traffic')

const hammersmithOdeon = {lat: 51.4908, lng: 0.2245}
const bigBen = {lat: 51.5007, lng: 0.1246}
let roads

test('setup', async (t) => {
  roads = await traffic.getRoads()
})

test('traffic.getClosestRoad should fail if no arguments passed', (t) => {
  t.shouldFail(traffic.getClosestRoad())
  t.end()
})

test('traffic.getClosestRoad should return road object', async (t) => {
  const expected = [
    '$type',
    'id',
    'displayName',
    'statusSeverity',
    'statusSeverityDescription',
    'bounds',
    'envelope',
    'url',
    'distance',
  ]
  const resp = await traffic.getClosestRoad(hammersmithOdeon, roads)
  const actual = Object.keys(resp)
  t.deepEqual(actual, expected)
})

test('traffic.getClosestRoad should return road with displayName A316 with hammersmithOdeon given.',
  async (t) => {
    const expected = 'A316'
    const resp = await traffic.getClosestRoad(hammersmithOdeon, roads)
    const actual = resp.displayName

    t.equals(actual, expected)
  }
)

test('traffic.getClosestRoad should return road with displayName A316 with hammersmithOdeon given.',
  async (t) => {
    const expected = 'A316'
    const resp = await traffic.getClosestRoad(hammersmithOdeon, roads)
    const actual = resp.displayName

    t.equals(actual, expected)
  }
)

test('traffic.getClosestRoad should return road with displayName A3 with hammersmithOdeon given.',
  async (t) => {
    const expected = 'A3'
    const resp = await traffic.getClosestRoad(bigBen, roads)
    const actual = resp.displayName

    t.equals(actual, expected)
  }
)

