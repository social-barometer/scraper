const rp = require('request-promise-native')
const geolib = require('geolib')
const tflURL = 'https://api.tfl.gov.uk/'

/**
 * Gets all roads from managed by London TfL
 *
 * @returns {Promise.<Array>} – List of roads
 */
const getRoads = async () => {
  const resp = await rp(`${tflURL}/Road`)
  return JSON.parse(resp)
}

/**
 * Finds the nearest TfL managed road to given coordinates.
 *
 * @param {Object.<geolocation>} coors – Coordinates to find the closest road with.
 * @param {Array.<Object>} [roads] – List of roads from which to search.
 * @returns {Promise.<Object>}
 */
const getClosestRoad = async (coors, roads) => {

  if (!coors) {
    throw new Error('Invalid arguments!')
  }

  try {
    roads = roads || await getRoads()
    return roads
      .map(r => {
        r.distance = getClosestDistance(
          JSON.parse(r.bounds),
          coors
        )
        return r
      })
      .reduce((closest, cur) => {
        return cur.distance < closest.distance
          ? cur
          : closest
      })
      
  } catch (err) {
    throw err
  }
}

const getClosestDistance = (bounds, coors) => {

  const latlng = {
    latitude: coors.lat,
    longitude: coors.lng, 
  } 

  return bounds
    .map(b => ({ latitude: Math.abs(b[1]), longitude: Math.abs(b[0]) }))
    .map(b => geolib.getDistance(b, latlng))
    .reduce((acc, cur) => Math.min(acc, cur))
}

module.exports.getRoads = getRoads
module.exports.getClosestRoad = getClosestRoad