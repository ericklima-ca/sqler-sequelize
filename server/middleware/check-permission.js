const jwt = require("jsonwebtoken");
const Helper = require("../app/helper");
//require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const payload = Helper.getPayload(req);
    if (!payload.CenterId == 102) {
      throw new Error();
    }
    next();
  } catch (_) {
    res.status(401).json({
      ok: false,
      message: "Not authorized",
    });
  }
};
