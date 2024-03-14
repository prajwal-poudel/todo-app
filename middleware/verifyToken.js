const jwt = require("jsonwebtoken");
const models = require("../models");

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.userData = decodedToken;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Invalid or expired token provided!",
      error: e,
    });
  }
}


function IsAuthorized(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    console.log(token);
    if (decodedToken) {
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Invalid or expired token provided!",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
}

module.exports = {
  verifyToken: verifyToken,
  IsAuthorized: IsAuthorized,
};
