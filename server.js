// Dependencies
var express = require("express");
var logger = require("morgan");
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
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make static folder public
app.use(express.static("public"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Route for scraping articles
app.get("/scrape", function(req, res) {
  axios
    .get("https://old.reddit.com/r/Showerthoughts/")
    .then(function(response) {
      var $ = cheerio.load(response.data);
      $(".title").each(function(i, element) {
        var result = {};
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });

      res.send("Scrape Complete!");
    });
});

// Route for grabbing specific articles by id
app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route for saving/updating an article's note
app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Initialization of server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
