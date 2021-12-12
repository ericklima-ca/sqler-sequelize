const { User, Token } = require("../../../models");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../../../mailer/senderApi");
const secret = "secret";

router.post("/login", async (req, res, _next) => {
  console.log(req.body);
  const { id, password } = req.body;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    return res.status(500).json({
      error: "error",
    });
  }
  if (!user.checkPassword(password)) {
    return res.status(500).json({
      error: "error",
    });
  }
  const token = jwt.sign({ ...user }, secret);
  res.status(200).json({
    token: token,
    user: { ...user },
  });
});

router.post("/signup", async (req, res, _next) => {
  const { id, name, lastName, CenterId, password, email } = req.body;
  await User.sync({ force: true });
  const user = await User.create({
    id: id,
    name: name,
    email: email,
    CenterId: CenterId,
    lastName: lastName,
    password: password,
  });
  await user.save();
  if (user) {
    const token = await Token.create({
      UserId: id,
    });
    await token.save();
    await sendMail(token, req);
    res.status(200).json({
      user: { ...user },
    });
  }
});

router.get("/verify/:id/:token", async (req, res, _next) => {
  const { id, token } = req.params;
  const tokenBase = await Token.findOne({
    where: {
      UserId: id,
    },
  });
  if (!tokenBase || !tokenBase.userConfirmed(token)) {
    res.status(500).json({
      error: "error",
    });
  }
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  user.activeUser();
  res.status(200).json({
    message: "E-mail confirmed",
  });
});

module.exports = router;
