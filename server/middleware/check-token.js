const { Token } = require("../../models");

module.exports = async (req, res, next) => {
  const { id, token } = req.params;
  const tokenBase = await Token.findOne({
    where: {
      UserId: id,
    },
  });
  if (tokenBase.expired()) {
    const token = await Token.create({
      UserId: id,
    });
    token.sendMailToken(req);
    return res.status(200).json({
      message:
        "Token expired! Please verify a new token in your e-mail for confirmation",
    });
  }
  if (!tokenBase || !tokenBase.checkUser(token)) {
    return res.status(500).json({
      error: "error",
    });
  }
  next();
};
