var http = require('http');
var moment = require('moment');

function serverCallback(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello " + process.argv[2] + ". It is " + moment().format('LLLL') + " now");
}

http.createServer(serverCallback).listen(8080);
