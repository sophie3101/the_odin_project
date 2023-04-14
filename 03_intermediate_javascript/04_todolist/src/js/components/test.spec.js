const Task = require("./task");
// import Task from "./task";
const TaskList = require("./taskList");

describe("test Task", () => {
  test("initialize task", () => {
    newTask = Task("test project", "go hiking");
    console.log(newTask);
  });
});
