var mongoose = require('mongoose');

var sentimentSchema = mongoose.Schema({
    name: String,
    score: Number
});

var Sentiment = mongoose.model("Sentiment", sentimentSchema);
module.exports = Sentiment;