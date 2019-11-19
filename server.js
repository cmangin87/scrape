// Dependencies
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");

// Scraping
var axios = require("axios");
var cheerio = require("cheerio");

// Requirement of all models
var db = require("./models");

// Define PORT to listen for where to properly route
var PORT = process.env.PORT || 3000;

// Initialization
var app = express();

// Morgan is used to log requests
app.use(morgan("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make static folder public
app.use(express.static("public"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
