const tweets = require('../apis/tweets')
const analyze = require('../apis/analyze')

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
    const results = await tweets.search(
        accessToken,
        accessTokenSecret,
        { q: query, count: 100 }
    )
    const posts = results.map(t => t.content)
    const analyzed = await analyze(posts)
    const emotion = analyzed
     .reduce((acc, cur) => {
       Object.keys(cur).forEach(k => {
         acc[k] = acc[k] ? acc[k] + cur[k] : cur[k]
       })
       return acc
     }, {})
    return { emotion }
}
