// const scheduler = require('./src/scheduler')

// scheduler.run()
//   .catch(err => {
//     console.error(err)
//     process.exit(-1)
//   })

const qs = require('querystring')
const Koa = require('Koa')

const app = new Koa()

const secrets = require('./secrets/secrets.json')

const searchTweets = require('./src/jobs/searchTweets')
const accessToken = secrets.twitter.accessToken
const accessTokenSecret = secrets.twitter.accessTokenSecret

app.use(async ctx => {
  const {
    user,
    keywords,
    since
  } = qs.parse(ctx.request.querystring)
  try {
    const tweets = await searchTweets({
      accessToken,
      accessTokenSecret,
      creator_id: user,
      query: keywords,
      since
    })
    ctx.body = JSON.stringify(tweets, null, 2)
  } catch(e) {
    console.log(e)
  }
  
})

console.log('Listening to 3001')
app.listen(3001)