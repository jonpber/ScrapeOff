// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var CommentSchema = new Schema({
  // title is a required string
  comment: {
    type: String,
    required: true,
  }
});

// Create the Article model with the ArticleSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the model
module.exports = Comment;
