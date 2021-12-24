const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User, Token } = require("../../../models");
const checkToken = require("../../middleware/check-token");

const secret = process.env.SECRET_JWT;

router.post("/login", async (req, res, _next) => {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user.active) {
      return res.status(401).json({
        ok: false,
        message: "E-mail not confirmed. Please check out your e-mail",
      });
    }
    const check = await user.checkPassword(password);
    if (check) {
      const token = jwt.sign(await { ...user.dataValues }, secret, {
        expiresIn: "8h",
      });
      return res.status(200).json({
        ok: true,
        token: token,
        user: { CenterId: user.CenterId, id: user.id },
      });
    }
    return res.status(400).json({
      ok: false,
      message: "Enroll or password incorrect",
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: "Enroll or password incorrect",
    });
  }
});

router.post("/signup", async (req, res, _next) => {
  try {
    const { id, name, CenterId, password, email } = req.body;
    const user = await User.create({
      id: id,
      name: name,
      email: email,
      CenterId: CenterId,
      password: password,
    });
    if (user) {
      const token = await Token.create({
        UserId: id,
      });
      token.sendMailToken(req);
      res.status(200).json({
        ok: true,
        message:
          "If everything went correctly, check your email and click on the confirmation link.",
      });
    }
  } catch (e) {
    res.status(400).json({
      ok: false,
      message: "Bad request. Try again.",
    });
  }
});

router.get("/verify/:id/:token", checkToken, async (req, res, _next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    user.activeUser();
    res
      .status(202)
      .send("<p>Email confirmado! Feche a aba de entre novamente!</p>");
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: "Error: " + e,
    });
  }
});

// TODO: implement recovery password
/*
router.post("/recovery", async (req, res, _next) => {
  res.status(200).json({
    message:
      "If the email is valid, a recovery confirmation email has been sent to your email.\
      Please check it.",
  });
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    const token = await Token.create({
      UserId: user.id,
    });

    token.sendMailToken(req);
  }
});

router.get("/recovery/:id/:token", checkToken, async (req, res, next) => {
  const { id, token } = req.params;
  res.status(200).json({
    id: id,
    token: token,
  });
});

router.post("/recovery/:id/:token", async (req, res, next) => {});
*/
module.exports = router;
