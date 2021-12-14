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
    res.status(301).json({
      message: "Not authorized",
    });
  }
});

router.put("/:id/:response", async (req, res, _next) => {
  const { UserId } = Helper.getPayload(req);
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
    UserId: UserId,
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
  res.status(200).json({
    message: "Solicitation updated",
  });
});

module.exports = router;
