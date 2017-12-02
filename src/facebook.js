const graph = require('fbgraph')
const token = require('../secrets/secrets.json').FBAccessToken
const headers = {
  "Auhtorization": `Bearer ${token}`,
}

graph.setAccessToken(token)

/**
 * Returns a list of events from facebook.
 *
 * @param {String} eventName - Event name or location
 * @returns {Promise.<JSON|Error>} – JSON list of events 
 */
module.exports.searchEvents = (eventName) => new Promise((resolve, reject) => {
  graph.search({
    q: eventName,
    type: 'event'
  }, (err, res) => {
    err ? reject(err) : resolve(res.data) 
  })
})