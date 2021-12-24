const router = require("express").Router();
require("dotenv").config();

const Helper = require("../helper");
const SolicitationMailer = require("../../../services/mailer/solicitation-mail");

const { Solicitation, Product, User, Center } = require("../../../models");
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
        include: [Product, User, Center],
      });
      break;
    default:
      solicitations = await Solicitation.findAll({
        where: {
          [Op.and]: [{ CenterId: center }, { status: "pending" }],
        },
        order: [["createdAt", "DESC"]],
        include: [Product, User],
      });
  }
  res.status(200).json({
    ok: true,
    solicitations: solicitations,
  });
});

router.get("/new/:product", checkPermission, async (req, res, _next) => {
  const product = await Product.findOne({
    where: {
      id: parseInt(req.params.product),
    },
  });
  if (!product) {
    return res.status(404).json({
      ok: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    ok: true,
    message: { product: product },
  });
});

router.post("/new", checkPermission, async (req, res, _next) => {
  const { id } = Helper.getPayload(req);
  const { ProductId, amount, CenterId, order } = req.body;
  const solicitation = await Solicitation.create({
    ProductId: ProductId,
    amount: amount,
    CenterId: CenterId,
    UserId: id,
    order: order,
  });
  if (!solicitation) {
    return res.status(400).json({
      ok: false,
      message: "Solicitation not created",
    });
  }

  res.status(201).json({
    ok: true,
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
  res.status(202).json({
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
  res.status(201).json({
    message: "Solicitation updated",
  });
});

module.exports = router;
