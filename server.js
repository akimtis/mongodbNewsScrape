// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require('mongoose');
var hbs = require("express-handlebars");
var bodyParser = require ("body-parser");

// Initialize Express
var app = express();

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// set the public static directory
app.use(express.static('public'));

// Import routes
app.use('/', routes);

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

//setting up Handlebars
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs', partialsDir: [__dirname + '/views/partials']}));
app.set('view engine', 'hbs');

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as a json
    else {
      res.json(found);
    }
  });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of ycombinator
  request("http://www.npr.org/programs/morning-edition/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("rundown-segment_title").each(function(i, element) {
      // Save the text of each link enclosed in the current element
      var title = $(this).children("a").text();
      // Save the href value of each link enclosed in the current element
      var link = $(this).children("a").attr("href");

      // If this title element had both a title and a link
      if (title && link) {
        // Save the data in the scrapedData db
        db.scrapedData.save({
          title: title,
          link: link
        },
        function(error, saved) {
          // If there's an error during this query
          if (error) {
            // Log the error
            console.log(error);
          }
          // Otherwise,
          else {
            // Log the saved data
            console.log(saved);
          }
        });
      }
    });
  });

  // This will send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});


// Listen on port 3000
var port = process.env.PORT || 3060;


app.listen(port, function()
{
  console.log('Running on port: ' + port);
});