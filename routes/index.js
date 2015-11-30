var express = require('express');
var router = express.Router();
var yelp = require('../model/yelp.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* Get yelp search result data and send it to frontend*/
router.get('/yelpsearch',function(req,res){
  var zipCode = req.query.zipcode,
      searchFor = req.query.search;
  function yelpAjax(zipCode, searchFor){
    var Oauth_parameter = {

    }
  }
});
module.exports = router;
