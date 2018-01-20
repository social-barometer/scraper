const graph = require('fbgraph')
const EventSearch = require('facebook-events-by-location-core')
const es = new EventSearch()


/**
 * Promise version of call graph.get()
 *
 * @param {String} accessToken - Facebook access token for auth
 * @param {String} query - Query for the get
 * @returns {Promise.<Array|Error>} – List of found items 
 */
const facebookGet = (accessToken, query) => {
  return new Promise((resolve, reject) => {

    if (!accessToken || !query) {
      reject(new TypeError('Invalid arguments.'))
    }

    graph.setAccessToken(accessToken)
    graph.get(query, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

/**
 * Returns a list of events from facebook.
 *
 * @param {String} accessToken - Facebook access token for auth
 * @param {String} query - Query word for the search
 * @returns {Promise.<Array|Error>} – List of events 
 */
const searchEvents = (accessToken, query) => {
  return new Promise((resolve, reject) => {

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
 * Gets the posts of the feed of a page, an event, .etc with given ID
 *
 * @param {String} accessToken – Facebook acces token for auth
 * @param {String} ID – ID of a facebook page or event
 * @returns {Promise.<Array|Error>} – List of posts
 */
const getFeed = async (accessToken, ID) => {
  const paginate = async (query, posts) => {
    try {
      const resp = await facebookGet(accessToken, query)
      if (resp.paging && resp.paging.next) {
        return await paginate(resp.paging.next, [...posts, ...resp.data])
      } else {
        return [...posts, ...resp.data]
      }
    } catch(err) {
      throw new Error(err)
    }
  }
  return await paginate(`${ID}/feed`, [])
  // TODO: Add backwards crawling
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
 * @param {Number} [radius] – Search radius in meter
 * @returns {Promise.<Array|Error>}
 */
const getEventsByGeolocation = (accessToken, geolocation, radius = 1000) => {
  
  const {lat, lng} = geolocation
  return es.search({
    lat: lat,
    lng: lng,
    distance: radius,
    accessToken: accessToken,
  })
}

module.exports.searchEvents = searchEvents
module.exports.getFeed = getFeed
module.exports.getEventsByGeolocation = getEventsByGeolocation