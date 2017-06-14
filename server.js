//General App Set Up
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//database set up
var mongoose = require('mongoose');

//Watson Discovery Service Integration
var watson = require('watson-developer-cloud');
var auth = require('./auth.js'); // you'll have to edit this file to include your credentials
require('dotenv').config()
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

//view routing
var routes = require('./routes/index');
var sentiments = require('./routes/sentiment');

//express declaration
var app = express();

//database connection deployed and local
var db = process.env.MONGODB_URI || 'mongodb://localhost:27017/watsonapi'
mongoose.connect(db)
mongoose.Promise = global.Promise



//Watson Discovery Service instansiation
var discovery = new DiscoveryV1({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  version_date:'2016-12-01'
});


var count = 7;
app.locals.count = count;
//storing function call in express local module named call
discovery.query({
    environment_id: process.env.ENVIRONMENT_ID,
    collection_id: process.env.COLLECTION_ID,
        count: count,
        company: "microsoft",
  }, function(err, response) {
        if (err) {
          console.error(err);
        } else {
          var a = 0;
          var b = 0;
          for(i=0; i < response.results.length; i++){
            if (typeof response.results[i].docSentiment != 'undefined'){
              var a = (a + parseFloat(response.results[i].docSentiment.score));
              b++;
          }

          }

          var score = a / b;

          app.locals.score = score;

          app.locals.count = count;


   }
 }
 );


//allow cors declared below
app.use(allowCors);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/sentiments', sentiments);

//cors header function
function allowCors(req, res, next) {
  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Handle "preflight" requests.
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
