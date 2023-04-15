import Project from "./Project";
import Task from "./Task";

const Database = (() => {
  let currentProjects = [];
  let currentTasks = [];
  const getAllTasks = () => JSON.parse(localStorage.getItem("tasks"));

  const getAllProjects = () => JSON.parse(localStorage.getItem("projects"));

  const isDatabaseEmpty = () => localStorage.getItem("tasks") === null;

  const clearDatabase = () => localStorage.clear();

  const printAllTasks = () => console.log(getAllTasks());

  const printAllProjects = () => console.log(getAllProjects());

  const setProjects = (projects) =>
    localStorage.setItem("projects", JSON.stringify(projects));

  const setTasks = (tasks) =>
    localStorage.setItem("tasks", JSON.stringify(tasks));

  const addProject = (projectName) => {
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
    currentTasks.push(Task(projectName, description, priority, dueDate));
    setTasks(currentTasks);
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
  };
})();

export default Database;
