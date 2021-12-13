const { Solicitation, Response } = require("../../../models");
const checkAuth = require("../../middleware/check-auth");
const { Helper } = require("../helper");

const router = require("express").Router();

router.use(checkAuth);
router.use((req, res, next) => {
  const payload = Helper.getPayload(req);
  const UserId = payload.UserId;
  if (UserId != "102") {
    next();
  } else {
    res.redirect("/api/solicitations");
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
