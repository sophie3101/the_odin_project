const TaskDisplay = (title, tasks = [], canAdd = fasle) => {
  const div = document.createElement("section");
  div.classList.add("task-container", "flex-col");

  const taskHeader = TaskHeader(title);
  div.appendChild(taskHeader);

  const titleDiv = TaskTitle(canAdd, tasks.length);
  div.appendChild(titleDiv);

  const taskList = TaskListDiv(tasks);
  div.appendChild(taskList);

  console.log("TaskDisplay tasks:  ", tasks);

  return div;
};

const TaskHeader = (title) => {
  const header = document.createElement("div");
  header.classList.add("task-header");
  if (
    ["all", "today", "upcoming", "flagged", "completed"].includes(
      title.toLowerCase()
    )
  ) {
    header.classList.add(title);
  } else header.classList.add("project");
  header.innerHTML = `<p>${title.toUpperCase()}</p>`;

  return header;
};

const TaskTitle = (canAdd, taskNum) => {
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("task-title", "flex-row");
  titleDiv.innerHTML = ` <p>Tasks <span class="task-num">(${taskNum})</span></p>`;
  if (canAdd) {
    titleDiv.innerHTML += `<div class="add-task icon-container"><i class="fa-solid fa-plus fa-lg"></i></div>`;
  }

  return titleDiv;
};

const TaskListDiv = (tasks) => {
  const taskList = document.createElement("section");
  taskList.classList.add("task-list", "flex-col");
  tasks.forEach((task) => {
    const taskDiv = TaskDiv(task);
    taskList.appendChild(taskDiv);
  });
  return taskList;
};
const TaskDiv = (task) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-card", "flex-row");
  taskDiv.id = task.id;
  // taskDiv.setAttribute("data-priority", task.priority);
  taskDiv.innerHTML = `
  <div class="task-status icon-container" ><i class="fa-regular fa-circle fa-sm"></i></i></div>
  <div class="task-detail flex-col">
    <p>${task.description}</p>
    <p class="project-name">${task.projectName} </p>
    <p class="due-date hide">${task.dueDate}</p>
    
  </div>
  <div class="task-info icon-container"> <i class="fa-solid fa-ellipsis fa-xs"></i><div>`;
  return taskDiv;
};
export default TaskDisplay;
