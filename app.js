require('./api/data/db.js')
var path = require('path');
var express = require('express');
var routes = require('./api/routes');
var app = express();
var bodyParser = require('body-parser');

app.set('port',8000);


app.use(function(req,res,next){
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname,'public')));

app.use('/node_modules',express.static(__dirname+'/node_modules'));

app.use(bodyParser.urlencoded({extend: false}));

app.use('/api',routes);


var server =app.listen(app.get('port'),function(){
  var port = server.address().port;
    console.log("Listening on port "+port);
});
