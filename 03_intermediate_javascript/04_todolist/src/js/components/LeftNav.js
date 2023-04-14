const LeftNav = () => {
  const nav = document.createElement("nav");
  nav.classList.add("flex-col");
  const defaultMenuSection = createDefaultMenuSection();
  const projectMenuSection = createDefaultProjectMenuSection();
  nav.appendChild(defaultMenuSection);

  // const projectTitle = document.createElement("p");
  // projectTitle.innerText = "Projects";
  // nav.appendChild(projectTitle);

  nav.appendChild(projectMenuSection);

  return nav;
};

const createDefaultMenuSection = () => {
  const defaultMenuSection = document.createElement("section");
  defaultMenuSection.classList.add("nav-default-menu", "flex-col");
  // defaultMenuSection.appendChild(
  //   Link(["link-default-menu", "selected"], "data-title", "all", "All")
  // );

  defaultMenuSection.innerHTML = `
    <a href="" class="link-default-menu selected" data-title="all">All</a>
    <a href="" class="link-default-menu" data-title="today">Today</a>
    <a href="" class="link-default-menu" data-title="scheduled">Upcoming</a>
    <a href="" class="link-default-menu" data-title="flagged">Flagged</a>
    <a href="" class="link-default-menu" data-title="completed">Completed</a>
  `;

  return defaultMenuSection;
};

const createDefaultProjectMenuSection = () => {
  // create an empty projects section
  const projectMenuSection = document.createElement("section");
  projectMenuSection.classList.add("nav-project-menu", "flex-col");
  projectMenuSection.innerHTML = `<div class="flex-row project-header">
    <p>Projects <p>
    <div class="add-project icon-container" ><i class="fa-solid fa-plus fa-lg"></i> </div>
    </div>`;
  // const projectDiv = document.createElement("div");
  // projectDiv.classList.add("flex-col");
  // projectMenuSection.appendChild(projectDiv);

  const projectForm = ProjectForm();
  projectMenuSection.appendChild(projectForm);
  return projectMenuSection;
};

export const getProjectTitleLinks = (projects) => {
  let projectMenuHtml = "";
  projects.forEach(({ projectName }) => {
    projectMenuHtml += `<a href="" class="link-project" data-title="${projectName.toLowerCase()}">${projectName}</a>`;
  });

  return projectMenuHtml;
};

const ProjectForm = () => {
  const form = document.createElement("form");
  form.classList.add("form-project", "flex-col", "hide");
  form.innerHTML = ` 
  <input type="text" name="project" id="" placeholder="Project Name" required>
  <div class="flex-row button">
    <button id="add-btn">Add</button>
    <button id="cancel-btn" type="submit">Cancel</button>
  </div>`;

  return form;
};
const Link = (classList, dataset, datasetName, name) => {
  const link = document.createElement("a");
  link.setAttribute("href", "#");
  classList.forEach((c) => link.classList.add(c));
  link.setAttribute(dataset, datasetName);
  link.innerHTML = name;
  console.log(link.innerHTML, link);
  return link;
};

export default LeftNav;
