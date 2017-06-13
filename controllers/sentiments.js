var Sentiment = require('../models/sentiment');

//create a idea
function create(req, res, next) {
  var sentiment = new Sentiment();
      sentiment.name = req.body.name;
      sentiment.score = req.body.score;
  sentiment.save(function(err, sentiment) {
    if (err) throw err;
    res.json({newSentiment: sentiment});
  });
}

module.exports = {
  create: create
}
