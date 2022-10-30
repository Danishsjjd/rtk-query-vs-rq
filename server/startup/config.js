const path = require("path");
const Joi = require("joi");
require("express-async-errors");

if (process.env.NODE_ENV != "production")
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = function () {
  Joi.objectId = () =>
    Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .messages({ "any.only": "{#label} has invalid id" });
};
