const { loadDB } = require('./src/firebase')
const getTwitterAnalysis = require('./src/jobs/getTwitterAnalysis')

const sleep = (seconds) => new Promise(resolve => {
  setTimeout(() => resolve(), seconds * 1000)
})

const scrape =  async (dashboards, db) => {
  // Loop over them and find scrape tweets
  return Promise.all(Object.keys(dashboards).map(async d => {
    const values = dashboards[d]
    try {
    // if (Date.now() - values.lastScrape > 1) {
      const analysis = await getTwitterAnalysis({
        accessToken: values.twitter.token,
        accessTokenSecret: values.twitter.secret,
        query: values.keywords,
        since: values.lastScrape,
      })
      // Push the new tweets to db
      const now = Date.now()

      db.ref('/twitterAnalysis').push({
        ...analysis,
        dashboard: d,
        time: now
      })

      // Mark the latest scrape time to dashboard
      db.ref('dashboards/' + d).update({
        lastScrape: now
      })
    // }
    } catch(e) {
      console.log(e)
    }
    return
  }))
}

const run = async () => {
  const db = await loadDB()

  while(true) {
    // Find all dashboards
    console.log('Starting jobs')
    const snap = await db.ref('dashboards/').once('value')
    const dashboards = snap.val()

    if (dashboards) {
      console.log(`Scraping ${Object.keys(dashboards).length} dashboards`)
      await scrape(dashboards, db)
    } else {
      console.log('No dashboards to scrape')
    }
    console.log('Job done. Going to sleep...')
    await sleep(5)
  }
}

run().catch(error => {
  console.error(error)
  process.exit(-1)
})