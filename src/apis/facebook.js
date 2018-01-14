const graph = require('fbgraph')

/**
 * Returns a list of events from facebook.
 *
 * @param {String} accessToken - Facebook access token for auth
 * @param {String} query - Query word for the search
 * @returns {Promise.<Array|Error>} – List of events 
 */
const searchEvents = (accessToken, query) => {
  return new Promise((resolve, reject) => {
      const headers = {
        "Auhtorization": `Bearer ${accessToken}`,
      }

      if (!accessToken || !query) {
        reject(new TypeError('Invalid arguments.'))
      }

      graph.setAccessToken(accessToken)
      graph.search({
        q: query,
        type: 'event'
      }, (err, res) => {
        err ? reject(err) : resolve(res.data) 
      })
    })
}


/**
 * Gets the comments a page, event, .etc with give ID
 *
 * @param {String} accessToken – Facebook acces token for auth
 * @param {String} ID – ID of a facebook page or event
 * @returns {Promise.<Array|Error>} – List of comments
 */
const getComments = (accessToken, ID) => {
  return new Promise((resolve, reject) => {

    const headers = {
      "Auhtorization": `Bearer ${accessToken}`,
    }

    if (!accessToken || !ID) {
      reject(new TypeError('Invalid arguments.'))
    }

    graph.setAccessToken(accessToken)
    graph.get(`${ID}/comments`, (err, res) => {
      err ? reject(err) : resolve(res)
      // TODO: crawl through pagination and return an array
    })
  })
}

/**
 * @typedef {Object} geolocation
 * @property {Number} lat – Latitude
 * @property {Number} lng – Longitude
 */

/**
 * Searches Facebook for events by given geolocation
 *
 * @param {String} accessToken – Facebook acces token for auth
 * @param {Object.<geolocation>} geolocation – Location for the search
 * @returns {Promise.<Array|Error>}
 */
const getEventsByGeolocation = (accessToken, geolocation) => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Auhtorization": `Bearer ${accessToken}`,
    }

    if (!accessToken || !ID) {
      reject(new TypeError('Invalid arguments.'))
    }
  })
}


module.exports.searchEvents = searchEvents
module.exports.getComments = getComments