const moment = require("moment");

const TaskListCategory = (() => {
  const getTaskMapByProjectName = (taskList) => {
    const projects = taskList.reduce((group, task) => {
      const { projectName } = task;
      group[projectName] = group[projectName] ?? [];
      group[projectName].push(task);
      return group;
    }, {});

    return projects;
  };

  const getTaskMapByDate = (taskList) => {
    const projects = taskList.reduce((group, task) => {
      const dueDate = moment(task.dueDate, "YYYY-MM-DD");
      if (dueDate.isSame(moment(), "day")) {
        task.dateCategory = "today";
      } else if (dueDate.isAfter(moment(), "day")) {
        task.dateCategory = "scheduled";
      } else {
        task.dateCategory = "past";
      }
      const { dateCategory } = task;
      group[dateCategory] = group[dateCategory] ?? [];
      group[dateCategory].push(task);

      return group;
    }, {});

    return projects;
  };

  const getTaskMapByPriority = (taskList) => {
    const projects = taskList.reduce((group, task) => {
      const { priority } = task;
      group[priority] = group[priority] ?? [];
      group[priority].push(task);

      return group;
    }, {});
    // console.log("project", projects);
    return projects;
  };

  return {
    getTaskMapByDate,
    getTaskMapByProjectName,
    getTaskMapByPriority,
  };
})();

export default TaskListCategory;
