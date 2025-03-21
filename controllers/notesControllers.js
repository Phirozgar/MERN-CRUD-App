const Note = require("../models/note");

const fetchAllNotes = async (req, res) => { //Get all notes
    //Get all notes from database
    const allNotes = await Note.find();

    //Respond with all notes
    res.json({notes: allNotes});
}

const fetchOneNote = async (req, res) => { //Get one particular note
    // Get id off of the url
    const noteId = req.params.id;

    //find the note using that id
    const note = await Note.findById(noteId);

    //respond with a note
    res.json({ note });
}

const createNote = async (req, res) => { //Create a new note
    //Get the sent in data off request body
    const { title , body } = req.body;

    //Create a new note with that data
    const note = await Note.create({
        title, 
        body
    });

    //Respond with new note
    res.json({ note });
}

const updateNote = async (req, res) => { //Update a note
    //Get id off of url
    const noteId = req.params.id;

    //Get updated data off of request body
    const { title , body } = req.body;

    //Find and update record
    const note = await Note.findByIdAndUpdate(noteId, {
        title , body
    });

    //find the updated record
    const updated = await Note.findById(noteId);

    //Respond with updated record
    res.json({ note });
}

const deleteNote = async (req, res) => { //Delete a note
    //Get id off of url
    const noteId = req.params.id;

    //Delete record
    const note = await Note.findByIdAndDelete(noteId);

    //Respond with deleted record
    res.json({note: note, success: "Record successfully deleted"});
}

module.exports = {
    fetchAllNotes,
    fetchOneNote,
    createNote,
    updateNote,
    deleteNote,
}