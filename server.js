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
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const notesControllers = require('./controllers/notesControllers');



// Create an Express app
const app = express();

//configure express app to accept json data
app.use(express.json());
app.use(cors());

//connect to database
connectToDb();

//Routing
app.get('/notes', notesControllers.fetchAllNotes);

app.get('/notes/:id', notesControllers.fetchOneNote);

app.post('/notes', notesControllers.createNote);

app.put("/notes/:id", notesControllers.updateNote); 

app.delete("/notes/:id", notesControllers.deleteNote);

//Start the server
app.listen(process.env.PORT);