const firebase = require('firebase-admin')
const { config, serviceAccountKey } = require('../secrets/secrets.json').firebase

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccountKey),
  databaseURL: config.databaseURL
})

// firebase.database().ref('events/').on('child_added', (snapshot) => {
//   console.log('Got data!')
//   console.log(snapshot)
// })

const loadDB = async () => {
  return await firebase.database()
}

module.exports.loadDB = loadDB