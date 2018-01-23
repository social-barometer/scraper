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
 * @param {Number|String} [since] – Unix timestamp, search posts posted after this time
 * @returns {Promise.<Array|Error>} – List of posts
 */
const getFeed = async (accessToken, ID, since) => {
  const makePaginator = (accessToken, direction) => async (query, posts, paginator) => {
    try {
      const resp = await facebookGet(accessToken, query)
      if (resp.paging && resp.paging[direction]) {
        return await paginator(
          resp.paging[direction],
          [...posts, ...resp.data],
          paginator
        )
      } else {
        return [...posts, ...resp.data]
      }
    } catch(err) {
      throw err
    }
  }

  try {
    const resp = await facebookGet(accessToken, `${ID}/feed`)
    
    if (resp.paging) {
      const next = resp.paging.next
      const prev = resp.paging.previous
      const nextPaginator = next && makePaginator(accessToken, 'next')
      const prevPaginator = next && makePaginator(accessToken, 'previous')
      const nexts = (next && await nextPaginator(next, [], nextPaginator)) || []
      const prevs = (prev && await prevPaginator(prev, [], prevPaginator)) || []
      const posts = [...prevs, ...resp.data, ...nexts]
      
      return since
        ? posts.filter(p => new Date(p.updated_time).getTime() >= since)
        : posts

    } else {
      return resp.data
    }
  } catch(err) {
    throw err
  }
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
const getEventsByGeolocation = async (accessToken, geolocation, radius = 1000) => {
  try {
    const {lat, lng} = geolocation
    const resp = await es.search({
      lat: lat,
      lng: lng,
      distance: radius,
      accessToken: accessToken,
    })
    return resp.events
  } catch(err) {
    throw new Error(err)
  }
}

module.exports.searchEvents = searchEvents
module.exports.getFeed = getFeed
module.exports.getEventsByGeolocation = getEventsByGeolocation