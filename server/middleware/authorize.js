const jwt = require('jsonwebtoken')
const config = process.env;

const authorizeUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.currUser = decoded;
        
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
    return next();
};

const authorizeRetailer = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.currRetailer = decoded;
        
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
    return next();
};

module.exports ={ authorizeUser,authorizeRetailer};