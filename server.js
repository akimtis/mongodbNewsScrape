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
// app.use('/', routes);

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




// Listen on port 3000
var port = process.env.PORT || 3060;


app.listen(port, function()
{
  console.log('Running on port: ' + port);
});
