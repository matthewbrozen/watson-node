var mongoose = require('mongoose');

var sentimentSchema = mongoose.Schema({
    company: String,
    count: Number,
    score: Array,
    response: String
});

var Sentiment = mongoose.model("Sentiment", sentimentSchema);
module.exports = Sentiment;
