const tweets = require('../apis/tweets')
const analyze = require('../apis/analyze')

const getSentimentScore = (tweets) => {
  const sentiments = tweets
    .map(p => p.sentiment)
    .filter(p => p)

  const totalSentiment = sentiments
    .reduce((acc, cur) => acc + cur, 0)

  return (totalSentiment / sentiments.length).toFixed(2)
}

/**
* Parameters for scraping
*
* @typedef {Object} scraperParams
* @property {String} accessToken – Twitter user access token
* @property {String} accessTokenSecret – Twitter user access token secret
* @property {String} query – Search query
* @property {Number} since – Unix timestamp. The starting point for search.
*/

/**
 * Search tweets with the given parameters and analyzes their sentiment.
 *
 * @param {Object.<scraperParams>}
 * @returns {Promise.<undefined>} – Posts results to a database
 */
module.exports = async ({
 accessToken,
 accessTokenSecret,
 query,
 since,
}) => {
   const posts = await tweets.search(
    accessToken,
    accessTokenSecret,
    { q: query, count: 100 }
   )

   const analyzedDirty = await Promise.all(posts
     .map(async p => {
       try {
         const analysis = await analyze(p.content)
         return Object.assign(p, analysis)
       } catch(err) {
         // Don't return unanalyzed tweets
         return new Promise(r => r(null))
       }
     }))

    const analyzed = analyzedDirty.filter(x => !!x)

    const emotion = analyzed
     .map(t => t.emotion)
     .reduce((acc, cur) => {
       Object.keys(cur).forEach(k => {
         acc[k] = acc[k] ? acc[k] + cur[k] : cur[k]
       })
       return acc
     }, {})

    const sentiment = getSentimentScore(analyzed)

    return { sentiment, emotion }
} 