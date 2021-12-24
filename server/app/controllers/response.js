const { Solicitation, Response } = require("../../../models");
const checkAuth = require("../../middleware/check-auth");
const Helper = require("../helper");

const router = require("express").Router();

router.use(checkAuth);
router.use((req, res, next) => {
  const payload = Helper.getPayload(req);
  const CenterId = payload.CenterId;
  if (CenterId != 102) {
    next();
  } else {
    res.status(401).json({
      message: "Not authorized",
    });
  }
});

router.get("/:id/:response", async (req, res, _next) => {
  const userId = Helper.getPayload(req).id;
  const { id, response } = req.params;
  let updates;
  switch (response) {
    case "ntp":
      updates = {
        confirmed: false,
        status: "finished",
      };
      break;
    case "confirmed":
      updates = {
        confirmed: true,
        status: "processing",
      };
      break;
  }
  await Response.create({
    SolicitationId: id,
    UserId: userId,
    confirmed: updates.confirmed,
  });
  await Solicitation.update(
    {
      status: updates.status,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.status(201).json({
    message: "Solicitation updated",
  });
});

module.exports = router;
