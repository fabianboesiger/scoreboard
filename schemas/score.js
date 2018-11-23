var mongoose = require('mongoose');

var scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required."],
    minlength: [2, "Username minimum length is 2 characters."],
    maxlength: [32, "Username maximum length is 32 characters."]
  },
  score: {
    type: Number,
    required [true, "Score is required."]
  }
});

module.exports = mongoose.model('Score', scoreSchema);
