const { Op } = require("sequelize");
const { Solicitation, Response, User } = require("../../../models");
const checkAuth = require("../../middleware/check-auth");
const Helper = require("../helper");

const router = require("express").Router();

router.use(checkAuth);
const block102 = (req, res, next) => {
  const payload = Helper.getPayload(req);
  const CenterId = payload.CenterId;
  if (CenterId != 102) {
    next();
  } else {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

router.get("/", async (_req, res, _next) => {
  const responses = await Response.findAll({
    include: [Solicitation, User],
  });
  res.status(200).json({
    ok: true,
    responses: responses,
  });
});

router.get("/:id/:response", block102, async (req, res, _next) => {
  const payload = Helper.getPayload(req);
  const userId = payload.id;
  const { CenterId } = payload;
  const { id, response } = req.params;
  let updates;
  switch (response) {
    case "ntp":
      updates = {
        confirmed: false,
        status: "finished",
      };
      break;
    case "confirmado":
      updates = {
        confirmed: true,
        status: "processing",
      };
      break;
  }
  const solicitation = await Solicitation.update(
    {
      status: updates.status,
    },
    {
      where: {
        [Op.and]: [{ id: id }, { CenterId: CenterId }],
      },
    }
  );
  if (solicitation) {
    await Response.create({
      SolicitationId: id,
      UserId: userId,
      confirmed: updates.confirmed,
    });
    res.status(201).json({
      ok: true,
      message: "Solicitation updated",
    });
  } else {
    res.status(401).json({
      ok: false,
      message: "Not authorized",
    });
  }
});

module.exports = router;
