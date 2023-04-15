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
    <a href="" class="link-default-menu selected" data-title="all"><i class="fa-solid fa-house-user fa-lg"></i><span> All</span></a>
    <a href="" class="link-default-menu" data-title="today"><i class="fa-regular fa-calendar-check fa-lg"></i><span> Today</span></a>
    <a href="" class="link-default-menu" data-title="upcoming"><i class="fa-solid fa-calendar-days fa-lg"></i><span> Upcoming</span></a>
    <a href="" class="link-default-menu" data-title="flagged"><i class="fa-regular fa-star"></i><span> Flagged</span></a>
    <a href="" class="link-default-menu" data-title="completed"><i class="fa-solid fa-check-double fa-lg"></i><span> Completed</span></a>
  `;

  return defaultMenuSection;
};

const DefaultProjectMenuSection = (projects) => {
  // create an empty projects section
  const projectMenuSection = document.createElement("section");
  projectMenuSection.classList.add("nav-project-menu", "flex-col");
  //project Header <a href="" class="add-project" ><i class="fa-solid fa-plus fa-lg"></i> </a>
  projectMenuSection.innerHTML = `<div class="flex-row project-header">
    <p>Projects <p>
   
    <div class="add-project icon-container" ><i class="fa-solid fa-plus fa-lg"></i> </div>
    </div>`;

  const projectForm = ProjectForm();
  projectMenuSection.appendChild(projectForm);

  projects.forEach((project) => {
    projectMenuSection.innerHTML += getProjectLink(project.projectName);
  });

  return projectMenuSection;
};

export const getProjectLink = (projectName) => {
  return `<a href="" class="link-project flex-row" data-title="${projectName.toLowerCase()}"><p>${projectName}</p> <div><i class="fa-solid fa-xmark"></i> </div></a>`;
};

export const ProjectForm = () => {
  const form = document.createElement("form");
  form.method = "post";
  // form.action = "/";
  form.classList.add("form-project", "flex-col", "hide");
  form.innerHTML = ` 
  <input type="text" name="project" id="" placeholder="Project Name" >
  <div class="flex-row button">
    <button id="add-btn">Add</button>
    <button id="cancel-btn" type="button">Cancel</button>
  </div>`;

  return form;
};

export default LeftNav;
