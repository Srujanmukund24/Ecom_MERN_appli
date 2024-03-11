const jwt = require("jsonwebtoken");
const config = process.env;

const authorizeUser = async (req, res, next) => {
//   console.log(req.headers);
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(403).send("A token is required for authentication");
  }

  // Split the authorization header by 'Bearer ' and get the second element
  const token = authorizationHeader.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.currUser = decoded;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

const authorizeRetailer = async (req, res, next) => {
    // console.log(req.headers)
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(403).send("A token is required for authentication");
    }
  
    // Split the authorization header by 'Bearer ' and get the second element
    const token = authorizationHeader.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.currRetailer = decoded;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = { authorizeUser, authorizeRetailer };
