const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true, // Ensure that a user is associated with each note
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
