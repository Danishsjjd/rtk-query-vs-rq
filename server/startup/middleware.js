const express = require("express");
const cors = require("cors");

const error = require("../middleware/error");
const todoRouter = require("../router/todo");

module.exports = function (app) {
  app.use(
    cors({
      origin: [process.env.CLIENT_URL, process.env.CLIENT_URL + "/"],
      methods: "GET,POST,PUT,PATCH,DELETE",
      credentials: true,
    })
  );

  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));

  app.use("/api/todo", todoRouter);

  app.use(error);
};
