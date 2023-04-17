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
  titleDiv.innerHTML += `<a class="add-task-form-popup ${hideAddIcon}"><i class="fa-solid fa-plus fa-lg"></i></a>`;

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
  if (task.status) taskDiv.classList.add("marked-task");
  taskDiv.id = task.id;
  // taskDiv.setAttribute("data-priority", task.priority);<div class="task-check" ><i class="fa-regular fa-circle fa-sm ${task.priority}-priority"></i></i></div>
  taskDiv.innerHTML = `
  <a class="task-check ${task.priority}-priority" ></a>
  <div class="task-detail flex-col">
    <p >${task.description} </p>
    <div class="flex-row">
      <p class="project-name">${task.projectName} &nbsp</p>
      <p class="due-date ${task.dateCategory}"> ${task.dueDate}</p>
    </div>
  </div>
  `;
  if (!task.status) {
    // don't show edit form for complete task
    taskDiv.innerHTML += `<div><a class="task-info-popup"> <i class="fa-solid fa-ellipsis fa-xs"></i><a></div>`;
  }

  return taskDiv;
};

export const TaskForm = (projectTitles, task) => {
  const div = document.createElement("div");
  div.classList.add("task-form-container", "flex-row-center");
  if (task !== undefined) div.setAttribute("data-form", "edit");

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
  const addBtnName = task === undefined ? "Add" : "Edit";
  const addId = task === undefined ? "add-task-btn" : "edit-task-btn";
  //  <input type="date" name="" id="task-date" value="${dueDateValue}"/>
  form.innerHTML = `
<div>
  <input type="text" name="" id="task-description-input" placeholder="${taskDesPlaceHolder}" value="${taskValue}" required/>
  <input type="text" id="task-date" placeholder="Schedule" onfocus="(this.type='date')" value="${dueDateValue}">
</div>
<div >
  
  <select name="" class="priority-dropdown"  required>
    ${priorityOptionHTML}
  </select>
   
  <label for="project">Projects: </label>
  <select name="" class="project-dropdown" required>
  ${projectOptionHtml}
  </select>
  <button class="add-btn" id="${addId}" type="submit">${addBtnName}</button>
  <button class="del-btn ${delBtnClass}" id="del-task-btn" type="button">Delete</button>
  <button class="cancel-btn" id="cancel-task-btn" type="button">Cancel</button>
  
</div>`;
  div.appendChild(form);
  return div;
};

export default TasksDisplay;
