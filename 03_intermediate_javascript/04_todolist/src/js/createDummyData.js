// import TaskList from "./components/TaskList";
// import TaskListCategory from "./components/TaskListCategory";
import Task from "./components/Task";
import Database from "./components/Database";

export const createDummyData = () => {
  const task1 = Task(
    "reminder",
    "go to sleep at 10",
    "high",
    "2023-04-13",
    "important"
  );
  const task2 = Task("reminder2", "go to sleep at 9", "low", "2023-12-10");
  const task3 = Task("reminder", "go to sleep at 8", "high", "2022-02-09");
  const task4 = Task("reminder2", "go to sleep at 12", "high", "2023-10-08");
  const task5 = Task("reminder", "go to sleep at 0", "medium", "2023-08-11");
  const task6 = Task("reminder", "go to sleep at 1", "medium", "2023-04-20");

  // let tasks = TaskList([task1, task2, task3, task4, task5, task6]);
  // // console.log(tasks.getTasks());
  // localStorage.setItem("tasks", JSON.stringify(tasks.getTasks()));
  // const projects = TaskListCategory.getTaskMapByProjectName(tasks.getTasks());
  // console.log(projects);
  // Database.setTasks(tasks);
  Database().addTasks([task1, task2, task3, task4, task5, task6]);
};
