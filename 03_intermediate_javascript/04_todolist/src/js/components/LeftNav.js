export let iconMap = {
  all: "fa-house-user",
  today: "fa-calendar-check",
  upcoming: "fa-calendar-days",
  important: "fa-star",
  completed: "fa-check-double",
};

const randomIcons = [
  "fa-bomb",
  "fa-gift",
  "fa-earth-americas",
  "fa-palette",
  "fa-tree",
  "fa-anchor",
  "fa-pencil",
  "fa-rocket",
  "fa-paperclip",
  "fa-hand",
];

const LeftNav = (projects) => {
  const nav = document.createElement("nav");
  nav.classList.add("flex-col");
  const defaultMenuSection = DefaultMenuSection();
  const projectMenuSection = DefaultProjectMenuSection(projects);

  nav.appendChild(defaultMenuSection);
  nav.appendChild(projectMenuSection);

  return nav;
};

const DefaultMenuSection = () => {
  const defaultMenuSection = document.createElement("section");
  defaultMenuSection.classList.add("nav-default-menu", "flex-col");

  defaultMenuSection.innerHTML = `
    <a href="" class="link-default-menu selected" data-title="all"><i class="fa-solid ${iconMap["all"]} fa-lg"></i><span> All</span></a>
    <a href="" class="link-default-menu" data-title="today"><i class="fa-regular ${iconMap["today"]} fa-lg"></i><span> Today</span></a>
    <a href="" class="link-default-menu" data-title="upcoming"><i class="fa-solid ${iconMap["upcoming"]} fa-lg"></i><span> Upcoming</span></a>
    <a href="" class="link-default-menu" data-title="important"><i class="fa-regular ${iconMap["important"]} fa-lg"></i><span> Important</span></a>
    <a href="" class="link-default-menu" data-title="completed"><i class="fa-solid ${iconMap["completed"]} fa-lg"></i><span> Completed</span></a>
  `;

  return defaultMenuSection;
};

const DefaultProjectMenuSection = (projects) => {
  const projectMenuSection = document.createElement("section");
  projectMenuSection.classList.add("nav-project-menu", "flex-col");
  projectMenuSection.innerHTML = `<div class="flex-row project-header">
      <p>Projects <p>
      <a class="add-project icon-container" ><i class="fa-solid fa-plus fa-lg"></i> </a>
    </div>`;

  projects.forEach((project) => {
    projectMenuSection.appendChild(ProjectLink(project.projectName));
  });

  return projectMenuSection;
};

export const ProjectLink = (projectName) => {
  const icon = randomIcons[Math.floor(Math.random() * randomIcons.length)];
  //update iconMap
  iconMap[projectName] = icon;

  const link = document.createElement("a");
  link.classList.add("link-project", "flex-row");
  link.setAttribute("data-title", projectName);
  link.innerHTML = ` <div><i class="fa-solid ${icon} fa-lg"></i>
  <span>${projectName}</span> </div>
  <div class="delete-project" data-project=${projectName}><i class="fa-solid fa-xmark"></i> </div>`;
  return link;
};

export const ProjectForm = () => {
  const form = document.createElement("form");
  // form.method = "post";
  // form.action = "/";
  form.classList.add("form-project", "flex-col");
  form.innerHTML = ` 
  <input type="text" name="project" id="" placeholder="Project Name" >
  <div class="flex-row button">
    <button class="add-btn" id="add-project-btn" type="submit" >Add</button>
    <button class="cancel-btn" id="cancel-project-btn" type="button">Cancel</button>
  </div>`;

  return form;
};

export default LeftNav;
