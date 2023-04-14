const Database = () => {
  const getAllTasks = () => JSON.parse(localStorage.getItem("tasks"));

  const getAllProjects = () => JSON.parse(localStorage.getItem("projects"));

  const isDatabaseEmpty = () => localStorage.getItem("tasks") === null;

  const clearDatabase = () => localStorage.clear();

  const printAllTasks = () => console.log(getAllTasks());

  const setProjects = (projects) =>
    localStorage.setItem("projects", JSON.stringify(projects));

  const setTasks = (tasks) =>
    localStorage.setItem("tasks", JSON.stringify(tasks));

  const addTasks = (tasks) => {
    let currentTasks = getAllTasks() ?? [];
    let currentProjects = getAllProjects() ?? [];
    tasks.forEach((task) => {
      if (currentProjects.indexOf(task.projectName) === -1) {
        currentProjects.push(task.projectName);
      }
      currentTasks.push(task);
    });

    setProjects(currentProjects);
    setTasks(currentTasks);
  };

  const addTask = (task) => {
    let currentTasks = getAllTasks() ?? [];
    let currentProjects = getAllProjects() ?? [];
    if (currentProjects.indexOf(task.projectName) === -1) {
      currentProjects.push(task.projectName);
    }
    currentTasks.push(task);
    setProjects(currentProjects);
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
    addTask,
    addTasks,
  };
};

export default Database;
