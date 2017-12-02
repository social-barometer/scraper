const jayson = require('jayson')
const getSentiment = require('./src/getSentiment')
const facebook = require('./src/facebook')

const server = jayson.server({
  getSentiment: (args, cb) => {
    cb(null, getSentiment(args[0]))
  },
  searchEvents: async (args, cb) => {
    try {
      const events = await facebook.searchEvents(args[0])
      cb(null, events)
    } catch(err) {
      throw err
    }
  },
})

server.http().listen(3131)
