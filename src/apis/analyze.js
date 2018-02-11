const user = require('../../secrets/secrets.json').IBM.NLUUsername
const pswd = require('../../secrets/secrets.json').IBM.NLUPassword
const NLUV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

const nlu = new NLUV1({
  'username': user,
  'password': pswd,
  'version_date': '2017-02-27'
})

const params = {
  features: {
    sentiment: {},
    emotion: {}
  }
}

/**
 * @typedef {Object} analysis
 * @property {Number} sentiment – Sentiment score ranging from -1 to 1
 * @property {Object} emotion – Emotion scores from 0 to 1
 * @property {Number} emotion.sadness
 * @property {Number} emotion.joy
 * @property {Number} emotion.fear
 * @property {Number} emotion.disgust
 * @property {Number} emotion.anger
 * 
 */

/**
 * Analyzes given text for sentiment and emotion.
 *
 * @param {String} text – Text to be analyzed
 * @returns {Object.<analysis>} – JSONifiable analysis object
 */
module.exports = (text) =>
  new Promise((resolve, reject) => {
    nlu.analyze(Object.assign(params, {text: text}), (err, res) => {
      err
        ? reject(err)
        : resolve(res)
    })
  })
  .then(res => {
    return {
      sentiment: res.sentiment.document.score,
      emotion: res.emotion.document.emotion
    }
  })
