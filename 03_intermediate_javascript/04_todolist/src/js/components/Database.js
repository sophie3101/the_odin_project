import Project from "./Project";
import Task from "./Task";
const moment = require("moment");

const Database = (() => {
  const setDueDateCategory = (date) => {
    const dueDate = moment(date, "YYYY-MM-DD");
    if (dueDate.isSame(moment(), "day")) return "today";
    else if (dueDate.isAfter(moment(), "day")) return "upcoming";

    return "overdue";
  };

  const initializeDatabase = () => {
    console.log("is database empty? ", isDatabaseEmpty());
    clearDatabase();
    if (isDatabaseEmpty()) addDummyData();

    let currentTasks = getAllTasks();
    // add dueDateCategory to each task
    // currentTasks.forEach((task) => setDateCategory(task));
    currentTasks.forEach(
      (task) =>
        (task = Object.assign(task, {
          dateCategory: setDueDateCategory(task.dueDate),
        }))
    );

    setTasks(currentTasks);
    printAllTasks();
    printAllProjects();
  };

  // const setDateCategory = (task) => {
  //   return Object.assign(task, {
  //     dateCategory: setDueDateCategory(task.dueDate),
  //   });
  // };

  const addDummyData = () => {
    const today = moment().format("YYYY-MM-DD");
    addTask(
      "reminder",
      "go to sleep at 10",
      "high",
      moment().add(-1, "days").format("YYYY-MM-DD")
    );
    addTask(
      "reminder",
      "wake up at 1",
      "medium",
      moment().add(10, "days").format("YYYY-MM-DD")
    );
    addTask(
      "reminder",
      "do homework",
      "high",
      moment().add(-11, "days").format("YYYY-MM-DD")
    );
    addTask(
      "reminder2",
      "go to sleep at 9",
      "low",
      moment().add(20, "days").format("YYYY-MM-DD")
    );
    addTask(
      "reminder",
      "complete a task",
      "high",
      moment().add(-100, "days").format("YYYY-MM-DD")
    );
    addTask(
      "reminder",
      "go to sleep at 0",
      "medium",
      moment().add(100, "days").format("YYYY-MM-DD")
    );
    addTask(
      "reminder2",
      "go to sleep at 1",
      "medium",
      moment().add(10, "days").format("YYYY-MM-DD")
    );
    addTask("reminder", "set up reminder", "low", today);
  };

  const getAllTasks = () => JSON.parse(localStorage.getItem("tasks")) ?? [];

  const getAllProjects = () =>
    JSON.parse(localStorage.getItem("projects")) ?? [];

  const isDatabaseEmpty = () => getAllTasks().length === 0;

  const clearDatabase = () => localStorage.clear();

  const printAllTasks = () => console.log("current tasks ", getAllTasks());

  const printAllProjects = () =>
    console.log("current projects: ", getAllProjects());

  const setProjects = (projects) =>
    localStorage.setItem("projects", JSON.stringify(projects));

  const setTasks = (tasks) =>
    localStorage.setItem("tasks", JSON.stringify(tasks));

  const getTask = (taskID) => {
    return getAllTasks().find((task) => task.id === taskID);
  };

  const deleteTask = (taskID) => {
    setTasks(getAllTasks().filter((task) => task.id !== taskID));
  };

  const deleteProject = (projectName) => {
    let currentProjects = getAllProjects();
    currentProjects = currentProjects.filter(
      (project) => project.projectName !== projectName
    );

    let currentTasks = getAllTasks() ?? [];
    currentTasks = currentTasks.filter(
      (task) => task.projectName !== projectName
    );

    setTasks(currentTasks);
    setProjects(currentProjects);
    printAllProjects();
    printAllTasks();
  };

  const addProject = (projectName) => {
    let currentProjects = [];
    let hasNewProject = false;

    if (getAllProjects() === null) {
      currentProjects.push(Project(projectName));
      hasNewProject = true;
      setProjects(currentProjects);
    } else {
      currentProjects = getAllProjects();
      if (
        currentProjects.filter((project) => project.projectName === projectName)
          .length === 0
      ) {
        currentProjects.push(Project(projectName));
        hasNewProject = true;
        setProjects(currentProjects);
      }
    }

    return hasNewProject;
  };

  const addTask = (projectName, description, priority, dueDate) => {
    addProject(projectName);
    let currentTasks = getAllTasks() ?? [];
    let newTask = Task(projectName, description, priority, dueDate);
    newTask = Object.assign(newTask, {
      dateCategory: setDueDateCategory(newTask.dueDate),
    });
    currentTasks.push(newTask);
    setTasks(currentTasks);

    return newTask;
  };

  const modifyTask = (projectName, description, priority, dueDate, taskID) => {
    let currentTasks = getAllTasks();
    const dateCategory = setDueDateCategory(dueDate);
    currentTasks = currentTasks.map((task) =>
      task.id === taskID
        ? { ...task, projectName, description, priority, dueDate, dateCategory }
        : task
    );

    setTasks(currentTasks);
  };
  const getTasksByDateCategory = (dateCategory) => {
    return getAllTasks().filter((task) => task.dateCategory === dateCategory);
  };

  const getImportantTasks = () =>
    getAllTasks().filter((task) => task.priority === "high");

  const getCompletedTasks = () => getAllTasks().filter((task) => task.status);

  const getTasksByProjectName = (targetProjectName) => {
    return getAllTasks().filter(
      (task) => task.projectName === targetProjectName
    );
  };

  return {
    initializeDatabase,
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
    getTasksByProjectName,
    deleteProject,
    getTask,
    deleteTask,
    modifyTask,
  };
})();

export default Database;
