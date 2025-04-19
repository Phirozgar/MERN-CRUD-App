const jwt = require("jsonwebtoken");
const User = require("../models/user");

function requireAuth(req, res, next) {
    try {
        //Read token off cookies
        const token = req.cookies.Authorization;

        // Check if the token exists
        if (!token) {
            return res.status(401).send("Unauthorized access. No token provided.");
        }

        //Decode the token
        const decoded = jwt.verify(token, process.env.SECRET);
        
        // Check expiration
        if (Date.now() > decoded.exp) return res.sendStatus(401);

        //Find user using decoded sub
        const user = User.findById(decoded.sub).select("+password"); // Include password in the query result
        if (!user) {
            return res.status(401).send("Unauthorized access. User not found.");
        }
        
        // Attach the user object to the request for further use in route handlers
        req.user = user;
        
        //continue on
        console.log("in middleware");
        next(); 
    } catch(err) {
        console.error(err);
        return res.status(401).send("Unauthorized access. Invalid token.");
    }
}

module.exports =  requireAuth;