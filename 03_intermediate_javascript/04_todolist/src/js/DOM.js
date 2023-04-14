import Database from "./components/Database";
import { createDummyData } from "./createDummyData";

const DOM = () => {
  console.log("is database empty? ", Database().isDatabaseEmpty());
  if (Database().isDatabaseEmpty()) createDummyData();
  Database().printAllTasks();
};

export default DOM;

// let Tasks;
// // localStorage.clear();
// if (localStorage.getItem("tasks") === null) Tasks = createDummyData();
// else Tasks = TaskList(JSON.parse(localStorage.getItem("tasks")));

// // group data
// const taskList = Tasks.getTasks();
// // console.log(taskList);
// // console.log(TaskListCategory(taskList).getTaskMapByDate());
