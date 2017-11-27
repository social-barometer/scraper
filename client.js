const jayson = require('jayson')

const client = jayson.client.http({
  port: 3131
})

client.request('add', [1, 1], (err, res) => {
  if (err) throw err
  console.log(res.result)
})

client.request('multiply', [3, 5], (err, res) => {
  if (err) throw err
  console.log(res.result)
})
