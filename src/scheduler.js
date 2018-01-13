const Agenda = require('agenda')
const { MongoClient } = require('mongodb')
const CONFIG = require('../config.json').agenda
const facebook = require('./facebook')

async function run() {
  const conn = await MongoClient.connect(CONFIG.url)
  const db = conn.db('agenda')
  
  const agenda = new Agenda().mongo(db, CONFIG.collection)

  agenda.define('facebook events', async (job) => {
    console.log('fetching facebook events')
    const { token, keyword } = job.attrs.data
    try {
      const events = await facebook.searchEvents(token, keyword)
      console.log(events)
    } catch(err) {
      console.error(err)
    }
  })

  await new Promise(resolve => agenda.once('ready', resolve))

  agenda.start()
  console.log('READY')
}

run().catch(err => {
  console.error(err)
  process.exit(-1)
})