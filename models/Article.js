// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true,
    unique: true,
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },

  img: {
    type: String,
  },

  summary: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now
  },

  saved: {
    type: Boolean,
    default: false
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
