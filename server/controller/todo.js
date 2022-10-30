const { Todo } = require("../model/todo");

exports.createTodo = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const { _id } = req.body;
  await Todo.findByIdAndDelete(_id);

  res.send("Deleted Successfully");
};

exports.updateTodo = async (req, res) => {
  const { completed, todo, _id } = req.body;
  const fetchTodo = await Todo.findById(_id);

  if (todo?.length > 0) fetchTodo.todo = todo;
  if (completed != undefined) fetchTodo.completed = completed;

  await fetchTodo.save();
  res.send("Updated Successfully");
};

exports.getTodo = async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
};
