// const scheduler = require('./src/scheduler')

// scheduler.run()
//   .catch(err => {
//     console.error(err)
//     process.exit(-1)
//   })

const qs = require('querystring')
const Koa = require('Koa')

const app = new Koa()

const searchTweets = require('./src/jobs/searchTweets')
const accessToken = "477661135-TLDZiqyYJ7nHCDqFhGWSnHnyCFjMFCgv6Z1u7aVi"
const accessTokenSecret = "58ThMzudKBHO0xOVMtKVr8IVHIohs8oRhLtB9ty1E53UR"

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