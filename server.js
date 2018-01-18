// Express
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
var app = express();

const html = __dirname + '/dist';
const port = 4200;

app
  .use(compression())
  .use(bodyParser.json())
  .use(express.static(html))
  .listen(port, function () {
    console.log('Port: ' + port);
    console.log('Html: ' + html);
  });