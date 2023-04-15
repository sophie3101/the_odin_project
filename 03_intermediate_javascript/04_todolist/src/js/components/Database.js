import Project from "./Project";
import Task from "./Task";
const moment = require("moment");

const Database = (() => {
  const getAllTasks = () => JSON.parse(localStorage.getItem("tasks"));

  const getAllProjects = () => JSON.parse(localStorage.getItem("projects"));

  // const getTasksByCategories = () => {
  //   const tasks = getAllTasks();
  //   TaskListCategory(tasks);
  // };

  const isDatabaseEmpty = () => localStorage.getItem("tasks") === null;

  const clearDatabase = () => localStorage.clear();

  const printAllTasks = () => console.log(getAllTasks());

  const printAllProjects = () =>
    console.log("current projects: ", getAllProjects());

  const setProjects = (projects) =>
    localStorage.setItem("projects", JSON.stringify(projects));

  const setTasks = (tasks) =>
    localStorage.setItem("tasks", JSON.stringify(tasks));

  const addProject = (projectName) => {
    let currentProjects = getAllProjects() ?? [];
    const oldProjectNum = currentProjects.length;

    if (
      currentProjects.filter((project) => project.projectName == projectName)
        .length === 0
    ) {
      currentProjects.push(Project(projectName));
    }

    if (oldProjectNum < currentProjects.length) setProjects(currentProjects);
  };

  const addTask = (projectName, description, priority, dueDate) => {
    addProject(projectName);
    let currentTasks = getAllTasks() ?? [];
    currentTasks.push(Task(projectName, description, priority, dueDate));
    setTasks(currentTasks);
  };

  const addDummyData = () => {
    console.log("adding dummy data");
    addTask("reminder", "go to sleep at 10", "high", "2023-04-15");
    addTask("reminder", "wake up at 1", "medium", "2023-05-21");
    addTask("reminder", "do homework", "high", "2023-05-21");
    addTask("reminder2", "go to sleep at 9", "low", "2023-12-10");
    addTask("reminder", "complete a task", "high", "2022-02-09");
    addTask("reminder", "go to sleep at 0", "medium", "2023-08-11");
    addTask("reminder", "go to sleep at 1", "medium", "2023-04-20");
    addTask(
      "reminder",
      "set up reminder",
      "low",
      moment().format("YYYY-MM-DD")
    );
  };

  const getTasksByDateCategory = (dateCategory) =>
    getAllTasks().filter((task) => task.dateCategory === dateCategory);

  const getImportantTasks = () =>
    getAllTasks().filter((task) => task.priority === "high");

  const getCompletedTasks = () => getAllTasks().filter((task) => task.status);
  const getTodayTasks = () => {
    const tasks = getAllTasks();
    return tasks.filter((task) => {
      const dueDate = moment(task.dueDate, "YYYY-MM-DD");
      return dueDate.isSame(moment(), "day");
    });
  };

  const getUpcomingTasks = () => {
    const tasks = getAllTasks();

    return tasks.filter((task) => {
      const dueDate = moment(task.dueDate, "YYYY-MM-DD");
      return dueDate.isAfter(moment(), "day");
    });
  };

  return {
    isDatabaseEmpty,
    clearDatabase,
    getAllTasks,
    getAllProjects,
    setTasks,
    setProjects,
    printAllTasks,
    printAllProjects,
    addTask,
    addProject,
    addDummyData,
    getTasksByDateCategory,
    getImportantTasks,
    getCompletedTasks,
  };
})();

export default Database;
