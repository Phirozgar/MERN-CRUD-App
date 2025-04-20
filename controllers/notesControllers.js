const Note = require("../models/note");

const fetchAllNotes = async (req, res) => {
  //Get all notes
  try {
    //Get all notes from database
    const allNotes = await Note.find({ user: req.user._id }); // Find all notes for the authenticated user

    //Respond with all notes
    res.json({ notes: allNotes });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.sendStatus(400).json({ error: "Internal server error" }); // Send a 500 response if an error occurs
  }
};

const fetchOneNote = async (req, res) => {
  //Gehjt one particular note
  try {
    // Get id off of the url
    const noteId = req.params.id;

    //find the note using that id
    const note = await Note.findOne({ id: noteId, user: req.user._id }); // Find the note for the authenticated user

    //respond with a note
    res.json({ note });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.sendStatus(400).json({ error: "Internal server error" }); // Send a 500 response if an error occurs
  }
};

const createNote = async (req, res) => {
  //Create a new note
  try {
    //Get the sent in data off request body
    const { title, body } = req.body;

    //Create a new note with that data
    const note = await Note.create({
      title,
      body,
      user: req.user._id, // Associate the note with the authenticated user
    });

    //Respond with new note
    res.json({ note });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.sendStatus(400).json({ error: "Internal server error" }); // Send a 500 response if an error occurs
  }
};

const updateNote = async (req, res) => {
  //Update a note
  try {
    //Get id off of url
    const noteId = req.params.id;

    //Get updated data off of request body
    const { title, body } = req.body;

    //Find and update record
    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: req.user._id },
      {
        // Find the note for the authenticated user
        title,
        body,
      }
    );

    //find the updated record
    const updated = await Note.findById(noteId);

    //Respond with updated record
    res.json({ note });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.sendStatus(400).json({ error: "Internal server error" }); // Send a 500 response if an error occurs
  }
};

const deleteNote = async (req, res) => {
  //Delete a note
  try {
    //Get id off of url
    const noteId = req.params.id;

    //Delete record
    const note = await Note.deleteOne({ id: noteId, user: req.user._id });

    //Respond with deleted record
    res.json({ note: note, success: "Record successfully deleted" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.sendStatus(400).json({ error: "Internal server error" }); // Send a 500 response if an error occurs
  }
};

module.exports = {
  fetchAllNotes,
  fetchOneNote,
  createNote,
  updateNote,
  deleteNote,
};
