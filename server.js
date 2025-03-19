//LOAD ENV VARIABLES   
/*
these config details are only for locally run files, not if you are deploying this somewhere
because the deployment agency will have their own config details
so we only keep it when we are running this locally
so better to keep it in an if statement
*/
if(process.env.NODE_ENV != 'production') { // can have values development/testing/staging/production
    require('dotenv').config();
}

// Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");
const Note = require("./models/note");

// Create an Express app
const app = express();

//configure express app to accept json data
app.use(express.json());

//connect to database
connectToDb();

//Routing
app.get("/", (req, res) => {
    res.json({World : "Hello, Do you want to see all notes? Go to /notes"});
});

app.get('/notes', async (req, res) => { //Get all notes
    //Get all notes from database
    const allNotes = await Note.find();

    //Respond with all notes
    res.json({notes: allNotes});
});

app.get('/notes/:id', async (req, res) => {
    // Get id off of the url
    const noteId = req.params.id;

    //find the note using that id
    const note = await Note.findById(noteId);

    //respond with a note
    res.json({note: note});
});

app.post('/notes', async (req, res) => { //Create a new note
    //Get the sent in data off request body
    const title = req.body.title;
    const body = req.body.body;

    //Create a new note with that data
    const note = await Note.create({
        title: title, 
        body: body
    });

    //Respond with new note
    res.json({note: note});
});

//Start the server
app.listen(process.env.PORT);