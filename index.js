
var watson = require('watson-developer-cloud');
var auth = require('./auth.js'); // you'll have to edit this file to include your credentials
require('dotenv').config()
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');


var discovery = new DiscoveryV1({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  version_date:'2016-12-01'
});

discovery.query({
    environment_id: process.env.ENVIRONMENT_ID,
    collection_id: process.env.COLLECTION_ID,
        count: 5,
        company: "microsoft"
  }, function(err, response) {
        if (err) {
          console.error(err);
        } else {
          var a = 0;
          for(i=0; i < response.results.length; i++){
            var current = response.results[i].docSentiment;
            if(typeof current !='undefined'){
            var a = response.results[i].docSentiment.score;
          }
          }

          console.log(a);

        }
   });
