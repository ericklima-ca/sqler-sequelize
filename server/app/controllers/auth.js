const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User, Token } = require("../../../models");
const checkToken = require("../../middleware/check-token");

const secret = process.env.SECRET;

router.use((req, res, next) => {
  if (req.url === "/logout") {
    return next();
  }
  if (req.headers.authorization) {
    res.redirect("/api/solicitations");
    return;
  }
  next();
});

router.post("/login", async (req, res, _next) => {
  try {
    const { id, password } = req.body;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(500).json({
        message: "User not found",
      });
    }
    if (!user.active) {
      return res.status(500).json({
        message: "E-mail not confirmed. Please check out your e-mail",
      });
    }
    if (!user.checkPassword(password)) {
      return res.status(500).json({
        message: "Password incorrect",
      });
    }
    const token = jwt.sign({ ...user }, secret, {
      expiresIn: "24h",
    });
    res.status(200).json({
      token: token,
      user: { ...user },
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
});

router.post("/signup", async (req, res, _next) => {
  try {
    const { id, name, lastName, CenterId, password, email } = req.body;
    const user = await User.create({
      id: id,
      name: name,
      email: email,
      CenterId: CenterId,
      lastName: lastName,
      password: password,
    });
    if (user) {
      const token = await Token.create({
        UserId: id,
      });
      token.sendMailToken(req);
      res.status(200).json({
        user: { ...user },
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "unknown error",
    });
  }
});

router.get("/verify/:id/:token", checkToken, async (req, res, _next) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    user.activeUser();
    res.status(200).json({
      message: "E-mail confirmed",
    });
  } catch (e) {
    res.status(500).json({
      message: "error" + e,
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
