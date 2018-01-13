const jayson = require('jayson')
const getSentiment = require('./getSentiment')
const facebook = require('./facebook')
const Agenda = require('agenda')
const { MongoClient } = require('mongodb')
const CONFIG = require('../config.json')


async function startServer() {
  const conn = await MongoClient.connect(CONFIG.agenda.url)
  const agendaDB = conn.db('agenda')
  const agenda = new Agenda().mongo(agendaDB, CONFIG.agenda.collection)

  return jayson.server({
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
    scrapeFacebook: async (args, cb) => {
      try {
        agenda.every(CONFIG.agenda.freq, 'facebook events', {
          token: args[0],
          keyword: args[1],
        })
        console.log("done trying")
      } catch(err) {
        cb(err)
      }
    }
  })
}

module.exports = new Promise((resolve, reject) => {
  startServer()
    .then(resolve)
    .catch(reject)
})