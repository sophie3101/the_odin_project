import { iconMap } from "./LeftNav";
const TasksDisplay = (title, tasks, canAdd = true) => {
  const taskSection = document.createElement("section");
  taskSection.classList.add("task-container", "flex-col");

  const taskHeader = TaskHeader(title);
  taskSection.appendChild(taskHeader);

  const titleDiv = TaskTitle(canAdd, tasks.length);
  taskSection.appendChild(titleDiv);

  const taskList = TaskListDiv(tasks);
  taskSection.appendChild(taskList);

  return taskSection;
};

const TaskHeader = (title) => {
  const header = document.createElement("div");
  header.classList.add("task-header");
  if (
    ["all", "today", "upcoming", "important", "completed"].includes(
      title.toLowerCase()
    )
  ) {
    header.classList.add(title);
  } else header.classList.add("project");
  header.innerHTML = `<p>
    <i class="fa-solid ${iconMap[title]}" fa-lg></i>
    <span>${title.toUpperCase()}</span>
  </p>`;

  return header;
};

const TaskTitle = (canAdd, taskNum) => {
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("task-title", "flex-row");
  titleDiv.innerHTML = ` <p>Tasks <span class="task-num">(${taskNum})</span></p>`;
  const hideAddIcon = canAdd ? "" : "hide";
  titleDiv.innerHTML += `<a class="add-task ${hideAddIcon}"><i class="fa-solid fa-plus fa-lg"></i></a>`;

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

export const TaskDiv = (task) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-card", "flex-row");
  taskDiv.id = task.id;
  // taskDiv.setAttribute("data-priority", task.priority);
  taskDiv.innerHTML = `
  <div class="task-status icon-container" ><i class="fa-regular fa-circle fa-sm ${task.priority}-priority"></i></i></div>
  <div class="task-detail flex-col">
    <p>${task.description} </p>
    <div class="flex-row">
      <p class="project-name">${task.projectName} &nbsp</p>
      <p class="due-date ${task.dateCategory}"> ${task.dueDate}</p>
    </div>
  </div>
  <div><a class="task-info"> <i class="fa-solid fa-ellipsis fa-xs"></i><a></div>`;
  return taskDiv;
};

export const TaskForm_ = (projectTitles) => {
  const div = document.createElement("div");
  div.classList.add("task-form-container", "flex-row-center");

  const form = document.createElement("form");
  form.classList.add("task-form", "flex-col");

  let projectOptionHtml = "";
  projectTitles.forEach((projectTitle) => {
    projectOptionHtml += ` <option class="high-priority" value="${projectTitle}">${projectTitle}</option>`;
  });
  form.innerHTML = `
<div>
  <input type="text" name="" id="task-description-input" placeholder="description" required/>
  <input type="date" name="" id="task-date" />
</div>
<div >
  
  <select name="" class="priority-dropdown"  required>
    <option value="">Select Priority</option>
    <option class="high-priority" value="high">High</option>
    <option class="medium-priority" value="medium">Medium</option>
    <option class="low-priority" value="low">Low</option>
  </select>
   
  <label for="project">Projects: </label>
  <select name="" class="project-dropdown" required>
  ${projectOptionHtml}
  </select>
  <button class="add-btn" id="add-task-btn" type="submit">Add</button>
  <button class="cancel-btn" id="cancel-task-btn" type="button">Cancel</button>
</div>`;
  div.appendChild(form);
  return div;
};

export const TaskForm = (projectTitles, task) => {
  const div = document.createElement("div");
  div.classList.add("task-form-container", "flex-row-center");

  const form = document.createElement("form");
  form.classList.add("task-form", "flex-col");

  const taskDesPlaceHolder =
    task !== undefined ? task.description : "description";
  const taskValue = task !== undefined ? task.description : "";

  const dueDateValue = task !== undefined ? task.dueDate : "";
  let projectOptionHtml = "";
  projectTitles.forEach((projectTitle) => {
    const seleteType =
      task !== undefined && task.projectName === projectTitle ? "selected" : "";
    projectOptionHtml += ` <option class="high-priority" value="${projectTitle}" ${seleteType}>${projectTitle}</option>`;
  });

  let priorityOptionHTML = "";
  ["high", "medium", "low"].forEach((priorityType) => {
    const selectType =
      task !== undefined && task.priority == priorityType ? "selected" : "";
    priorityOptionHTML += `<option class="${priorityType}-priority" value="${priorityType}" ${selectType}>${priorityType.toLocaleUpperCase()}</option>`;
  });

  const delBtnClass = task === undefined ? "hide" : "";
  form.innerHTML = `
<div>
  <input type="text" name="" id="task-description-input" placeholder="${taskDesPlaceHolder}" value="${taskValue}" required/>
  <input type="date" name="" id="task-date" value="${dueDateValue}"/>
</div>
<div >
  
  <select name="" class="priority-dropdown"  required>
    <option value="">Select Priority</option>
    ${priorityOptionHTML}
  </select>
   
  <label for="project">Projects: </label>
  <select name="" class="project-dropdown" required>
  ${projectOptionHtml}
  </select>
  <button class="add-btn" id="add-task-btn" type="submit">Add</button>
  <button class="del-btn ${delBtnClass}" id="del-task-btn" type="button">Delete</button>
  <button class="cancel-btn" id="cancel-task-btn" type="button">Cancel</button>
  
</div>`;
  div.appendChild(form);
  return div;
};

export default TasksDisplay;
