const url = 'https://twitter-emotion.herokuapp.com/emotion-analysis'
const request = require('request-promise-native')

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
 * @param {Array.<String>} texts – Array of texts to be analyzed
 * @returns {Array.<analysis>} – JSONifiable analysis object
 */

module.exports = (texts) => {
    return request.post(url, {
        json: true,
        body: {
            tweets: texts
        }
    })
}
// module.exports = (text) =>
//   new Promise((resolve, reject) => {
//     nlu.analyze(Object.assign(params, {text: text}), (err, res) => {
//       err
//         ? reject(err)
//         : resolve(res)
//     })
//   })
//   .then(res => {
//     return {
//       sentiment: res.sentiment.document.score,
//       emotion: res.emotion.document.emotion
//     }
//   })
