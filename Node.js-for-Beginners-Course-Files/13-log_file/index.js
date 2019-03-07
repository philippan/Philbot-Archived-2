var http = require('http');
var request = require('request');
var fs = require('fs');
var csv = require('csv');
var url = require('url');
var create_html = require('./create_html.js');
var update_log = require('./update_log.js');

var json_request_body = undefined;
var csv_request_body = undefined;
var html_content = undefined;

setInterval(function () {
  request('https://www.bnefoodtrucks.com.au/api/1/trucks',
  function(err, request_res, body) {
    json_request_body = body;
  });
}, 2000);

setInterval(function() {
  request('https://www.data.brisbane.qld.gov.au/data/dataset/1e11bcdd-fab1-4ec5-b671-396fd1e6dd70/resource/3c972b8e-9340-4b6d-8c7b-2ed988aa3343/download/Brisbane-public-art-collection-Jul-2016-Rev-1.2.csv',
  function (err, request_res, body) {
    csv.parse(body, function(err, data) {
      csv_request_body = data;
    });
  });
}, 2000);

http.createServer(function(req, res) {
  if (html_content && json_request_body && csv_request_body) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var request_url = url.parse(req.url);
    switch(request_url.path) {
          case "/json":
            update_log.updateLogFile("Accessed JSON data");
            res.end(create_html.createHtmlStringFromJSON(html_content, JSON.parse(json_request_body)));
            break;
          case "/csv":
            update_log.updateLogFile("Accessed CSV data");
            res.end(create_html.createHtmlStringFromCsv(html_content, csv_request_body));
            break;
    }
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Nothing retrieved yet");
  }
}).listen(8080);

fs.readFile('./index.html', function(err, html) {
  if (err) {
    throw err;
  }
  html_content = html;
});
