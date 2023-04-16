import LeftNav from "./LeftNav";
import TaskSection from "./TaskSection";
const MainSection = (projects, tasks) => {
  const main = document.createElement("main");

  main.classList.add("flex-row");
  main.appendChild(LeftNav(projects));
  main.appendChild(TaskSection("all", tasks));

  return main;
};

export const TaskForm = (projects) => {
  const div = document.createElement("div");
  div.classList.add("task-form-container", "flex-row-center");

  const form = document.createElement("form");
  form.classList.add("task-form", "flex-col");
  // form.method = "post";
  // form.action = "";

  let projectOptionHtml = "";
  projects.forEach(({ projectName }) => {
    projectOptionHtml += ` <option class="high-priority" value="${projectName}">${projectName}</option>`;
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

export default MainSection;
