// require mongoose
var mongoose = require('mongoose');


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


mongoose.connect ('mongodb://heroku_gx8pm9r4:v16iraihumi52hssmd0ngglv3c@ds155150.mlab.com:55150/heroku_gx8pm9r4');


var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) 
{
  console.log("Mongoose Error: ", error);
});

//Mongoose connedtion to db
db.once("open", function() 
{
  console.log("Mongoose connection successful!");
});

// export the database
module.exports = db;
