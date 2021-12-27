const jwt = require("jsonwebtoken");
//require("dotenv").config();

class Helper {
  static getPayload(req) {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    console.log(payload);
    return payload;
  }
}

module.exports = Helper;
