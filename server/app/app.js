const express = require("express");
const app = express();
const authController = require("./controllers/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authController);

module.exports = app;
