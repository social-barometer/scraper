const graph = require('fbgraph')

/**
 * Returns a list of events from facebook.
 *
 * @param {String} accessToken - Facebook access token for auth
 * @param {String} eventName - Event name or location
 * @returns {Promise.<JSON|Error>} – JSON list of events 
 */

const searchEvents = (accessToken, eventName) => {
  console.log("facebook called")
  return new Promise((resolve, reject) => {
      const headers = {
        "Auhtorization": `Bearer ${accessToken}`,
      }

      if (!accessToken || !eventName) {
        reject(new TypeError('Invalid arguments.'))
      }

      graph.setAccessToken(accessToken)
      graph.search({
        q: eventName,
        type: 'event'
      }, (err, res) => {
        err ? reject(err) : resolve(res.data) 
      })
    })
}

module.exports.searchEvents = searchEvents