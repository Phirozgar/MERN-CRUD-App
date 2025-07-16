const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function signup(req, res) {
    try {
        let {email, password} = req.body;
        console.log('SIGNUP REQUEST:', { email, password });
        email = email.toLowerCase();
        const hashedPassword = bcrypt.hashSync(password, 8);

        const userExists = await User.find({email});
        console.log('USER EXISTS:', userExists);
        if(userExists.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        await User.create({
            email,
            password: hashedPassword
        });
        console.log('USER CREATED:', email);
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("ERROR DURING SIGNUP\n\n", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function login(req, res) {
    try {
        let {email, password} = req.body;
        console.log('LOGIN REQUEST:', { email, password });
        email = email.toLowerCase();
        const user = await User.findOne({email}).select("+password");
        console.log('USER FOUND:', user);
        if(!user){
            return res.status(401).json({ error: "Email not registered! Sign up first" });
        }
        const passwordMatch = bcrypt.compareSync(password , user.password);
        console.log('PASSWORD MATCH:', passwordMatch);
        if(!passwordMatch){
            return res.status(401).json({ error: "Wrong Password! Unauthorized access." });
        }
        const exp = Date.now() + 1000 *60 *60 *24 *30;
        const token = jwt.sign({sub: user._id, exp}, process.env.SECRET);
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax", 
        });
        console.log('LOGIN SUCCESSFUL:', email);
        res.status(200).json({ message: "Login successful", email: user.email });
    } catch (error) {
        console.error("ERROR DURING LOGIN\n\n", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

function logout(req, res) {
    try {
        res.cookie("Authorization", "", { expires: new Date() });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("ERROR DURING LOGOUT\n\n", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

function checkAuth(req, res) {
    try {
        // Assuming req.user is set by authentication middleware
        const user = req.user;
        res.status(200).json({ message: "User is authenticated", email: user ? user.email : null });
    } catch (error) {
        console.error("ERROR DURING AUTH CHECK\n\n", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth
};