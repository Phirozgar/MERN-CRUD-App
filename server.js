//TO START --> npm run dev

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
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const notesControllers = require('./controllers/notesControllers');
const usersController = require('./controllers/usersController');
const requireAuth = require('./middleware/requireAuth');

// Create an Express app
const app = express();

//configure express app to accept json data
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies
app.use(
    cors({
        origin: true, // Allow requests from this origin
        credentials: true, // Allow cookies to be sent with requests
    })
);

//connect to database
connectToDb();
 
//Routing
app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);
app.get('/check-auth', requireAuth, usersController.checkAuth); // Protected route
app.get('/notes', requireAuth, notesControllers.fetchAllNotes);
app.get('/notes/:id', requireAuth, notesControllers.fetchOneNote);
app.post('/notes', requireAuth, notesControllers.createNote);
app.put("/notes/:id", requireAuth, notesControllers.updateNote); 
app.delete("/notes/:id", requireAuth, notesControllers.deleteNote);

//Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });