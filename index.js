const scheduler = require('./src/scheduler')

scheduler.run()
  .catch(err => {
    console.error(err)
    process.exit(-1)
  })