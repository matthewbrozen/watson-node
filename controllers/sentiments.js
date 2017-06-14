//Watson Discovery Service Integration
var watson = require('watson-developer-cloud');
var auth = require('./auth.js'); // you'll have to edit this file to include your credentials
require('dotenv').config()
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

//Watson Discovery Service instansiation
var discovery = new DiscoveryV1({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  version_date:'2016-12-01'
});

//sentiment model
var Sentiment = require('../models/sentiment');

//express
var express = require('express');
var app = express();


//post function
function callWatson(req, res, next){

discovery.query({
      environment_id: process.env.ENVIRONMENT_ID,
      collection_id: process.env.COLLECTION_ID,
          count: req.body.count,
          company: req.body.company
    }, function (err, response) {
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
            var sentiment = new Sentiment();
            sentiment.company = req.body.company;
            sentiment.count = req.body.count;
            sentiment.score = score;
            sentiment.save(function(err, sentiment) {
              if (err) throw err;
              res.json({newSentiment: sentiment});
            });
     }
   }
 )
}

module.exports = {
  callWatson: callWatson
}






function getSecret() {
    var secret = '';

    db.transaction(
        function (transaction) {
            transaction.executeSql(
                'SELECT * FROM table LIMIT 1;',
                null,
                function(transaction, result) {
                    var row = result.rows.item(0);
                    secret = row.secret;
                }, errorHandler
            );
        }
    )

  return secret;
}
