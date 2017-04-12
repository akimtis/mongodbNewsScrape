var express = require('express');
var router = express.Router();
var News = require('../models/News');
var scraper = require('../controller/scraper');


router.get('/', function(request, response) 
{
  News.find({}, function(error, data) 
  {
    if (error) console.log("error", error);
    response.render('index', {title: "News Item", news: data});
  });
}); 

// scrape route
router.get('/scrape', function(request, response) 
{
  scraper.newsScraper(function() 
  {
    response.redirect('/');
  });
});
