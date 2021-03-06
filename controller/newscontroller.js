 // require cheerio 
var cheerio = require('cheerio');
var request = require('request');
var News = require('../models/News');

// // Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// // Retrieve data from the db
// app.get("/all", function(req, res) {
//   // Find all results from the scrapedData collection in the db
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as a json
//     else {
//       res.json(found);
//     }
//   });
// });

// Scrape data from one site and place it into the mongodb db
 function newsScraper (callback) {
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
        var hbs= db.scrapedData.save({
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

    callback();
  });

  // This will send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
};

exports.newsScraper = newsScraper ;



  



 
