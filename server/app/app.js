const express = require("express");
const cors = require("cors");
const app = express();
const authController = require("./controllers/auth");
const solicitationController = require("./controllers/solicitation");
const responseController = require("./controllers/response");

const customCors = {
  origin: ["*", "http://localhost:3200"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(customCors));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authController);
app.use("/api/solicitations", solicitationController);
app.use("/api/responses", responseController);
module.exports = app;
