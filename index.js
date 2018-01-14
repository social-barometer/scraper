// const startServer = require('./src/server')
// const cp = require('child_process')


// // Start the scheduler as child process
// const scheduler = cp.fork('./src/scheduler.js')
// scheduler.on('message', msg => {
//   console.log(msg)
// })

// startServer.then(server => {
//   server.http().listen(3131)
//   console.log('listening on 3131')
// })

// process.on('SIGINT', () => {
//   scheduler.kill('SIGINT')
//   process.exit()
// })

const scheduler = require('./src/scheduler')

scheduler.run()
  .catch(err => {
    console.error(err)
    process.exit(-1)
  })