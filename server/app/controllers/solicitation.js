const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Solicitation } = require("../../../models");
// const checkAuth = require("../../middleware/check-auth");

// router.use(checkAuth);

router.get("/", async (req, res, _next) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.SECRET);
  const center = payload.CenterId;
  if (center == "102") {
    const solicitations = await Solicitation.findAll();
    return res.status(200).json({
      solicitations: solicitations,
    });
  }
  const solicitations = await Solicitation.findAll({
    where: {
      CenterId: center,
    },
  });
  res.status(200).json({
    solicitations: solicitations,
  });
});

module.exports = router;
