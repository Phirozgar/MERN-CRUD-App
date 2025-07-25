const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password from queries by default
  },
  notes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Note" }, // Reference to Note model
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
