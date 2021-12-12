const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (e) {
    res.redirect(301, "/api/auth/login");
  }
};
