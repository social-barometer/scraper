const Client = require('mariasql')

const conn = new Client({
  host: '18.195.83.94',
  user: 'sbapiuser',
  db: 'sbapi',
  password: 'skree123Kwark!',
  port: 3306,
})

conn.query('SHOW DATABASES', null, { metadata: true }, (err, rows) => {
  if (err) throw err;
  console.dir(rows)
})

conn.end()