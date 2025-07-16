const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
    try {
        //Read token off cookies
        const token = req.cookies.Authorization;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ error: "Unauthorized access. No token provided." });
        }

        //Decode the token
        const decoded = jwt.verify(token, process.env.SECRET);
        
        // Check expiration
        if (Date.now() > decoded.exp) {
            return res.status(401).json({ error: "Token has expired" });
        }

        //Find user using decoded sub
        const user = await User.findById(decoded.sub);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized access. User not found." });
        }
        
        // Attach the user object to the request for further use in route handlers
        req.user = user;
        
        //continue on
        next(); 
    } catch(err) {
        console.error("Auth Middleware Error:", err);
        return res.status(401).json({ error: "Unauthorized access. Invalid token." });
    }
}

module.exports = requireAuth;