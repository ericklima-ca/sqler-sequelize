const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    if (!payload.CenterId == 102) {
      throw new Error("not authorized");
    }
    next();
  } catch (_) {
    res.status(401).json({
      error: "not authorized",
    });
  }
};
