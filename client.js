const jayson = require('jayson')

const client = jayson.client.http({
  port: 3131
})

client.request('getSentiment', ['Everything is so fun and lovely!'], (err, res) => {
  console.log("sentiment:", res.result)
})

client.request('searchEvents', ['oulu'], (err, res) => {
  console.log("events:", res.result)
})