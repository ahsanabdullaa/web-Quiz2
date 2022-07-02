var express = require("express");
var router = express.Router();
var { Task } = require("../../models/taskModels");

//get all tasks from database
router.get("/", async (req, res) => {
  let task = await Task.find();
  console.log(task);
  return res.send(task);
});

//get single task from database
router.get("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).send("Task with this ID not found");
    }
    return res.send(task);
  } catch (error) {
    return res.status(400).send("Invalid ID");
  }
});

//update single task from database
router.put("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).send("task with this ID not found");
    }
    task.task = req.body.task;
    task.date = req.body.date;
    task.status = req.body.status;
    await task.save();
    return res.send(task);
  } catch (error) {
    return res.status(400).send("Invalid ID");
  }
});

//update single task from database
router.delete("/:id", async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(400).send("Task with this ID not found");
    }
    return res.send(task);
  } catch (error) {
    return res.status(400).send("Invalid ID");
  }
});

//create new record in database
router.post("/", async (req, res) => {
  let task = new Task();
  task.task = req.body.task;
  task.date = req.body.date;
  task.status = req.body.status;
  await task.save();
  return res.send(task);
});

module.exports = router;
