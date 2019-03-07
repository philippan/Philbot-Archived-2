//  console.log("Hello Philip")
var http = require('http');
var moment = require('moment');

function serverCallback(req, res) {

var begin_time = moment("5:00", "HH:mm");
var end_time = moment("10:00", "HH:mm");

var message = "Hello " + process.argv[2];
message += "Welcome. \n";
message += "It's time: " + moment().format("HH:mm") + "\n";
message += "Our business hours: " + begin_time.format("HH:mm") + " to " + end_time.format("HH:mm")

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(message);
  // 200 = Default "Okay" code that will be sent back to the client

}

http.createServer(serverCallback).listen(8080);
