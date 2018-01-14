const FBToken = require('./secrets/secrets.json').facebook.accessToken
const CONFIG = require('./config.json')
const Agenda = require('agenda')
const { MongoClient } = require('mongodb')

async function start() {
  const conn = await MongoClient.connect(CONFIG.agenda.url)
  const agendaDB = conn.db('agenda')
  const agenda = new Agenda().mongo(agendaDB, CONFIG.agenda.collection)

  try {
    const job = agenda.every(CONFIG.agenda.freq, 'facebook events', {
      token: FBToken,
      keyword: 'oulu',
    })
    // console.log(job)
  } catch(err) {
    cb(err)
  }
}

start().catch(err => {
  console.log(err)
  process.exit(-1)
})