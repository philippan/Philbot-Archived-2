var http = require('http');
var moment = require('moment');

function serverCallback(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var begin_time = moment("10:00", "HH:mm");
  var end_time = moment("12:00", "HH:mm");

  var message = "Hello " + process.argv[2] + "!\n";
  message += "Welcome to our page.\n";
  message += "Now, it is " + moment().format('HH:mm:ss') + ".\n";
  message += "Our business hours is from " + begin_time.format("HH:mm") + " to " + end_time.format("HH:mm") + ".\n";

  var before_diff = begin_time.diff(moment(), 'minutes');
  var after_diff = moment().diff(end_time, 'minutes');
  if (before_diff > 0) {
    message += "Please come back in " + before_diff + " minutes.\n";
  }
  if (after_diff > 0) {
    message += "Please come back tomorrow\n";
  }

  res.end(message);
}

http.createServer(serverCallback).listen(8080);
