const jayson = require('jayson')
const getSentiment = require('./getSentiment')
const facebook = require('./facebook')


module.exports = jayson.server({
  getSentiment: (args, cb) => {
    cb(null, getSentiment(args[0]))
  },
  searchEvents: async (args, cb) => {
    try {
      const events = await facebook.searchEvents(args[0])
      cb(null, events)
    } catch(err) {
      cb(err)
    }
  },
})