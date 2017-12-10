const child_process = require('child_process')
const jobs = []
const workers = [...Array(4)].map(x => child_process.fork('./src/job.js'))

