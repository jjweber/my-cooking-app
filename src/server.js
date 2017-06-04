var express = require('express');
var app = express();

var port = 3000;

app.get('/', function(req, res) {
  res.json({healthy: true})
});

app.listen(port, function() {
  console.log('Our Server is Running on Port', port);
});
