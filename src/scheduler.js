const Agenda = require('agenda')
const { MongoClient } = require('mongodb')
const CONFIG = require('../config.json').agenda
const searchFBEvents = require('../jobs/searchFBEvents')

async function run() {
  const conn = await MongoClient.connect(CONFIG.url)
  const db = conn.db('agenda')
  
  const agenda = new Agenda().mongo(db, CONFIG.collection)

  // Define jobs
  agenda.define('facebook events', searchFBEvents)



  // Start agenda
  await new Promise(resolve => agenda.once('ready', resolve))
  agenda.start()
  console.log('READY')
}

// run().catch(err => {
//   console.error(err)
//   process.exit(-1)
// })

module.exports.run = run