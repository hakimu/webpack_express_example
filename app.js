var newrelic = require('newrelic');
var http = require('http');
var express = require('express');
var app = express();

app.get('/',function(req,res){
  res.send("Home page");
});

http.createServer(app).listen(3300,function(){
  console.log('Starting....')
});