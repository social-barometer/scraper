const Agenda = require('agenda')
const { MongoClient } = require('mongodb')
const mongoURL = 'mongodb://localhost:27017/'

// MongoClient.connect(mongoURL, function(err, conn) {
//   const db = conn.db('agenda')
//   // console.log("db:", db)
//   if (err) throw err;
//   db.createCollection("jobs", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     conn.close();
//   });
// });

async function run() {
  const conn = await MongoClient.connect(mongoURL)
  const db = conn.db('agenda')

  const agenda = new Agenda().mongo(db, 'jobs')

  agenda.define('hello', () => {
    console.log('Hello world!')
    // process.exit(0)
  })

  // Wait for agenda to connect
  await new Promise(resolve => agenda.once('ready', resolve))

  agenda.every('3 seconds', 'hello')
  agenda.start()

}

run().catch(error => {
  console.error(error)
  process.exit(-1)
})