const TaskList = () => {
  // tasks is a list containing Task object. Hence if each item in the list is not Task object, need to convert
  let tasks = [];
  const addTasks = (taskList) => (tasks = taskList);

  const deleteTask = (taskID) => {
    tasks = tasks.filter((task) => task.id !== taskID);
  };

  const addTask = (task) => {
    tasks.push(task);
  };

  const modifyTask = (updatedTask) => {
    tasks = tasks.forEach((task) => {
      if (task.id === updatedTask.id) task = updatedTask;
    });
  };

  const getTasks = () => tasks;

  return {
    getTasks,
    addTask,
    deleteTask,
    modifyTask,
    addTasks,
  };
};

export default TaskList;
