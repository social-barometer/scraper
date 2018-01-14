const Twitter = require('twitter')
const creds = require('../secrets/secrets.json').twitter

/**
 * Searches Twitter for tweets
 * 
 * search('someAccessToken', 'someAccessTokenSecret', {
 *   q: 'Uncle Dolan',
 *   count: 50
 * })
 * 
 * Search params found here:
 * https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html
 *
 * @param {String} accessToken – Twitter user access token
 * @param {String} accessTokenSecret  Twitter user access token secret
 * @param {Object} params – Search parameters 
 * @returns {Promise.<Array>} – List of tweets
 */
const search = (accessToken, accessTokenSecret, params) => {
  const client = new Twitter({
    consumer_key: creds.consumerKey,
    consumer_secret: creds.consumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  })

  return client.get('search/tweets', params)
    .then((tweets) => {
      console.log(tweets)
      return tweets
      // Save to DB
    })
    .catch((err) => {
      console.log(err)
    })
}

// search(creds.accessToken, creds.accessTokenSecret, {
//   q: 'Nickelback',
//   count: 2
// })

/**
 * Gets tweets by their ID
 *
 * @param {String} id – The ID of a tweet
 * @returns {Promise.<Object>} – The tweet itself 
 */
const get = (accessToken, accessTokenSecret, id) => {
  const client = new Twitter({
    consumer_key: creds.consumerKey,
    consumer_secret: creds.consumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  })

  client.get('statuses/show/', {id: id})
    .then((tweets) => {
      console.log(tweets)
    })
    .catch((err) => {
      console.log(err)
    })

}

// get(creds.accessToken, creds.accessTokenSecret, '223115412')

module.exports.search = search
module.exports.get = get