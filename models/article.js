// Set mongoose as dependency
var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

// Create new Schema object using Schema constructor
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Creates new Mongoose model from new Schema construction
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
