var mongoose = require('mongoose');
var db = require("../config/connection");

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: 
  {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  link: 
  {
    type: String,
    required: true,
    unique: true
  },

var News = mongoose.model("News", NewsSchema);

module.exports = News;