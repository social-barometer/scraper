const graph = require('fbgraph')

/**
 * Returns a list of events from facebook.
 *
 * @param {String} accessToken - Facebook access token for auth
 * @param {String} query - Query word for the search
 * @returns {Promise.<JSON|Error>} – JSON list of events 
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


const getComments = (accessToken, eventID) => {
  return new Promise((resolve, reject) => {

    const headers = {
      "Auhtorization": `Bearer ${accessToken}`,
    }

    if (!accessToken || !eventID) {
      reject(new TypeError('Invalid arguments.'))
    }

    graph.setAccessToken(accessToken)
    graph.get(`${eventID}/comments`, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

module.exports.searchEvents = searchEvents
module.exports.getComments = getComments