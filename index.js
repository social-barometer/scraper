const { loadDB } = require('./src/firebase')
const getTwitterAnalysis = require('./src/jobs/getTwitterAnalysis')

const sleep = (seconds) => new Promise(resolve => {
  setTimeout(() => resolve(), seconds * 1000)
})

const scrape =  async (dashboardsObj, db) => {
    // Loop over them and find scrape tweets

    const dashObjToArr = (dashboards) => {
        return Object.keys(dashboards).map(d => {
            const dash = dashboards[d]
            dash['id'] = d
            return dash
        })
    }
    const isScrapeTime = (dashboard) => {
        const lastScrape = dashboard.lastScrape
        return !lastScrape || Date.now() - lastScrape > 3.6e6
    }
    const dashboards = dashObjToArr(dashboardsObj)
    const scrapables = dashboards.filter(isScrapeTime)

    console.log(`Scraping ${scrapables.length} dashboards`)

    return Promise.all(scrapables.map(async d => {
        try {
            // Scrape if no scrapes done yet or last scrape was a hour ago.
            const analysis = await getTwitterAnalysis({
                accessToken: d.twitter.token,
                accessTokenSecret: d.twitter.secret,
                query: d.keywords,
                since: d.lastScrape,
            })
            // Push the new tweets to db
            const now = Date.now()

            db.ref('/twitterAnalysis').push({
                ...analysis,
                dashboard: d.id,
                time: now
            })

            // Mark the latest scrape time to dashboard
            db.ref('dashboards/' + d.id).update({
                lastScrape: now
            })
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
    console.log('Fetching dashboards')
    const snap = await db.ref('dashboards/').once('value')
    const dashboards = snap.val()

    if (dashboards) {
      console.log(`Found ${Object.keys(dashboards).length} dashboards`)
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
