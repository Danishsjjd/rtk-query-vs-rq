const router = require("express").Router();

const validate = require("../middleware/validate");
const { vCreateTodo, vDeleteTodo, vUpdateTodo } = require("../model/todo");
const {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} = require("../controller/todo");

router.get("/", getTodo);
router.post("/", validate(vCreateTodo), createTodo);
router.delete("/", validate(vDeleteTodo), deleteTodo);
router.put("/", validate(vUpdateTodo), updateTodo);

module.exports = router;
