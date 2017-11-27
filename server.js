const jayson = require('jayson')

const server = jayson.server({
  add: function(args, cb) {
    cb(null, args[0] + args[1])
  },
  multiply: function(args, cb) {
    cb(null, args[0] * args[1])
  }
})

server.http().listen(3131)
