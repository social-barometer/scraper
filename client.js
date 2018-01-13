const jayson = require('jayson')
const FBtoken = require('./secrets/secrets.json').facebook.accessToken

const client = jayson.client.http({
  port: 3131
})

// client.request('searchEvents', [FBtoken, 'oulu'], (err, res) => {
//   console.log("events:", res.result)
// })

client.request('scrapeFacebook', [FBtoken, 'oulu'], (err, res) => {
  console.log("client request done")
})