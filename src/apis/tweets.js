const Twitter = require('twitter')
const creds = require('../../secrets/secrets.json').twitter

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
 * @param {String|Number} [since] – Unix timestamp, get tweets posted after this
 * @returns {Promise.<Array>} – List of tweets
 */
const search = async (accessToken, accessTokenSecret, params, since) => {
  const client = new Twitter({
    consumer_key: creds.consumerKey,
    consumer_secret: creds.consumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  })

  const resp = await client.get('search/tweets', params)
  
  const tweets = since
    ? resp.statuses.filter(t => new Date(t.created_at) >= since)
    : resp.statuses

  return tweets.map(t => ({
    "post_id": t.id_str,
    "content": t.text,
    "source": "twitter",
    "created_at": new Date(t.created_at).getTime(),
  }))
}

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

  return client.get('statuses/show/', {id: id})
}

module.exports.search = search
module.exports.get = get