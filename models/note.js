// Set mongoose as dependency
var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

// Create new Schema object using Schema constructor
var NoteSchema = new Schema({
  title: String,
  body: String
});

// Creates new Mongoose model from new Schema construction
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
