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

//storing function call in express local module named call
discovery.query({
    environment_id: process.env.ENVIRONMENT_ID,
    collection_id: process.env.COLLECTION_ID,
        count: 7,
        company: "microsoft"
  }, function(err, response) {
        if (err) {
          console.error(err);
        } else {
          var a = 0;
          var b = 0;
          for(i=0; i < response.results.length; i++){
            if (typeof response.results[i].docSentiment != 'undefined'){
              // console.log(response.results[5]);
              var a = (a + parseFloat(response.results[i].docSentiment.score));
              b++;
          }

          }

          var sentiment = a / b;
          //storing result in express local module named sentiment
          // app.locals.sentiment = sentiment;

          console.log(sentiment);
   }}
 );
