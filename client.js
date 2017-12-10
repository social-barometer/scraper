const jayson = require('jayson')
const token = require('./secrets/secrets.json').FBAccessToken

const client = jayson.client.http({
  port: 3131
})

client.request('getSentiment', ['Everything is so fun and lovely!'], (err, res) => {
  console.log("sentiment:", res.result)
})

client.request('searchEvents', [token, 'oulu'], (err, res) => {
  console.log("events:", res.result)
})