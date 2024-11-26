const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please enter the text"],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  data: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
});

module.exports = mongoose.model("Idea", IdeaSchema);
