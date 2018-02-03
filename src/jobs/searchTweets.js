 const tweets = require('../apis/tweets')
 const analyze = require('../apis/analyze')

/**
 * Parameters for scraping
 *
 * @typedef {Object} scraperParams
 * @property {String} accessToken – Twitter user access token
 * @property {String} accessTokenSecret – Twitter user access token secret
 * @property {Number} creator_id – ID of the event creator
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
  creator_id,
  query,
  since,
 }) => {
    const posts = await tweets.search(
     accessToken,
     accessTokenSecret,
     { q: query }
    )
    
    const analyzed = posts.map(async p => {
      let analysis
      try {
        analysis = await analyze(p.content)
      } catch(err) {
        console.log(err)
        analysis = {
          sentiment: null,
          emotion: {
            anger: null,
            joy: null,
            sadness: null,
            fear: null,
            disgust: null,
          }
        }
      }
      return Object.assign(p, analysis)
    })
    return Promise.all(analyzed)
    // TODO: Save to db
 } 