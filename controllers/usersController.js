const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function signup(req, res) {
    try {
        //Get the email and password from the request body
        const {email, password} = req.body;

        //Hash password
        const hashedPassword = bcrypt.hashSync(password, 8);

        //Check if the user already exists
        const userExists = await User.find({email});
        if(userExists.length > 0) {
            return res.status(400).send("User already exists");
        }
        
        //Check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).send("Invalid email format");
        }

        //create a user with that data
        await User.create({
            email,
            password: hashedPassword
        });

        //respond
        res.sendStatus(200);
    } catch (error) {
        console.error("ERROR DURING SIGNUP\n\n", error);
        res.status(500).send("Internal server error");
    }
}

async function login(req, res) {
    try {
        //Get the email and password from the request body
        const {email, password} = req.body;

        //Check if the user exists
        const user = await User.findOne({email}).select("+password"); // Include password in the query result
        if(!user){
            return res.sendStatus(401).send("email not registered! Sign up first");
        }

        //Check if password matches found user's password hash
        const passwordMatch = bcrypt.compareSync(password , user.password);
        if(!passwordMatch){
            return res.sendStatus(401).send("Wrong Password! Unauthorized access.");
        }

        //create a jwt token
        const exp = Date.now() + 1000 *60 *60 *24 *30;
        const token = jwt.sign({sub: user._id, exp}, process.env.SECRET);

        //store the token in the cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp), // Set the cookie expiration date
            httpOnly: true, // Prevents JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "lax", 
        });
        //sent the token in the response
        res.sendStatus(200)
    } catch (error) {
        console.error("ERROR DURING LOGIN\n\n", error);
        res.status(500).send("Internal server error");
    }
}

function logout(req, res) {
    try {
        res.cookie("Authorization", "", { expires: new Date() });
        res.sendStatus(200);
    } catch (error) {
        console.error("ERROR DURING LOGOUT\n\n", error);
        res.status(500).send("Internal server error");
    }
}

function checkAuth(req, res) {
    try {
        res.sendStatus(200);
    } catch (error) {
        console.error("ERROR DURING LOGIN\n\n", error);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth
};