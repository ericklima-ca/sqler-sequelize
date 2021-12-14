const router = require("express").Router();
require("dotenv").config();

const Helper = require("../helper");
const SolicitationMailer = require("../../../services/mailer/solicitation-mail");

const { Solicitation, Product } = require("../../../models");
const { Op } = require("sequelize");

const checkAuth = require("../../middleware/check-auth");
const checkPermission = require("../../middleware/check-permission");

router.use(checkAuth);

router.get("/", async (req, res, _next) => {
  const payload = Helper.getPayload(req);
  const center = payload.CenterId;
  let solicitations;

  switch (center) {
    case 102:
      solicitations = await Solicitation.findAll({
        where: {
          status: "pending",
        },
        order: [["createdAt", "DESC"]],
        include: Product,
      });
      break;
    default:
      solicitations = await Solicitation.findAll({
        where: {
          [Op.and]: [{ CenterId: center }, { status: "pending" }],
        },
        order: [["createdAt", "DESC"]],
        include: Product,
      });
  }
  res.status(200).json({
    solicitations: solicitations,
  });
});

router.post("/new", checkPermission, async (req, res, _next) => {
  const { UserId } = Helper.getPayload(req);
  const { ProductId, amount, CenterId, order } = req.body;
  await Solicitation.create({
    ProductId: ProductId,
    amount: amount,
    CenterId: CenterId,
    UserId: UserId,
    order: order,
  });

  res.status(201).json({
    message: "Solicitation created",
  });
});

router.delete("/delete/:id", checkPermission, async (req, res, _next) => {
  const { id } = req.params;
  await Solicitation.destroy({
    where: {
      id: id,
    },
  });
  res.status(201).json({
    message: "Solicitation deleted",
  });
});

router.put("/edit/:id/:action", checkPermission, async (req, res, _next) => {
  const { id, action } = req.params;
  switch (action) {
    case "edit":
      const { amount } = req.body;
      await Solicitation.update(
        {
          amount: amount,
        },
        {
          where: {
            id: id,
          },
        }
      );
      break;
    case "response":
      const { obs } = req.body;
      const solicitation = await Solicitation.update(
        { status: "finished", obs: obs },
        { where: { id: id } }
      );
      await SolicitationMailer.sendMail(solicitation);
      break;
  }
  res.status(200).json({
    message: "Solicitation updated",
  });
});

module.exports = router;
