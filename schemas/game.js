var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required."],
    minlength: [2, "Name minimum length is 2 characters."],
    maxlength: [32, "Name maximum length is 32 characters."]
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [4, "Password minimum length is 4 characters."],
  },
  board: [
    {
      username: {
        type: String,
        required: [true, "Username is required."],
        minlength: [2, "Username minimum length is 2 characters."],
        maxlength: [32, "Username maximum length is 32 characters."]
      },
      score: {
        type: Number,
        required: [true, "Score is required."]
      }
    }
  ]
});

module.exports = mongoose.model('Game', gameSchema);
