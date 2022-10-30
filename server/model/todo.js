const mongoose = require("mongoose");
const Joi = require("joi");

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
      minLength: 5,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", todoSchema);

const msg = "please explain your todo";

const vCreateTodo = (obj) => {
  const schema = Joi.object({
    todo: Joi.string().min(5).required().messages({
      "string.min": msg,
      "string.empty": msg,
      "any.required": "Please enter your todo",
    }),
  });
  return schema.validate(obj, { errors: { wrap: { label: false } } });
};

const vDeleteTodo = (obj) => {
  const schema = Joi.object({
    _id: Joi.objectId().required(),
  });
  return schema.validate(obj, { errors: { wrap: { label: false } } });
};
const vUpdateTodo = (obj) => {
  const schema = Joi.object({
    todo: Joi.string().min(5).messages({
      "string.required": "nice",
      "string.empty": "here we are empty",
      "string.base": "must be string",
      "string.min": "please explain your todo",
    }),
    _id: Joi.objectId().required(),
    completed: Joi.boolean().messages({
      "boolean.base": "must be boolean",
    }),
  });
  return schema.validate(obj, { errors: { wrap: { label: false } } });
};

module.exports = {
  Todo,
  vCreateTodo,
  vDeleteTodo,
  vUpdateTodo,
};
