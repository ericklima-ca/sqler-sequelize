const express = require("express");
const app = express();
const authController = require("./controllers/auth");
const solicitationController = require("./controllers/solicitation");
const responseController = require("./controllers/response");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authController);
app.use("/api/solicitations", solicitationController);
app.use("/api/responses", responseController);
module.exports = app;
