var express = require('express');
var path = require('path');


var app = express();

app.use("/", express.static(path.join(__dirname, 'public')));
app.use("/views", express.static(path.join(__dirname, 'views')));
app.use("/node_modules", express.static(path.join(__dirname, 'node_modules')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));


/* GET home page. */
/* istanbul ignore  next */
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

var port = process.env.PORT || 5052;

app.listen(port);
console.log("Server running on port: " + port);

module.exports = app;
