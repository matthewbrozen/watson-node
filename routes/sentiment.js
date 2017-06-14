var express = require('express');
var router = express.Router();

var sentimentsController = require('../controllers/sentiments');

router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/', sentimentsController.callWatson);

module.exports = router;
