const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_JWT);
    next();
  } catch (_) {
    res.status(301).json({
      message: "Not authorized",
    });
  }
};
