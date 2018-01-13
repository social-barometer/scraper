const user = require('../secrets/secrets.json').IBM.NLUUsername
const pswd = require('../secrets/secrets.json').IBM.NLUPassword
const NLUV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

const nlu = new NLUV1({
  'username': user,
  'password': pswd,
  'version_date': '2017-02-27'
})

const params = {
  features: {
    entities: {
      emotion: true,
      sentiment: true,
      limit: 2
    },
    keywords: {
      emotion: true,
      sentiment: true,
      limit: 2
    }
  }
}

module.exports = (text) => new Promise((resolve, reject) => {
  nlu.analyze(Object.assign(params, {text: text}), (err, res) => {
    if (err) reject(err)
    else
      resolve(JSON.stringify(res, null, 2))
  })
})