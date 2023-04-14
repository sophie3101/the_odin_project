export const addLeftNav = () => {
  const nav = document.createElement("nav");
  const defaultMenuSection = createDefaultMenuSection();
  const projectMenuSection = createProjectMenuSection();
  nav.appendChild(defaultMenuSection);
  nav.appendChild(projectMenuSection);

  document.body.appendChild(nav);
};

const createDefaultMenuSection = () => {
  const defaultMenuSection = document.createElement("section");
  defaultMenuSection.className = "nav-default-menu";
  defaultMenuSection.innerHTML = `
    <a href="" class="link-menu" data-menu-name="all">All</a>
    <a href="" class="link-menu" data-menu-name="today">Today</a>
    <a href="" class="link-menu" data-menu-name="scheduled">Upcoming</a>
    <a href="" class="link-menu" data-menu-name="flagged">Flagged</a>
    <a href="" class="link-menu" data-menu-name="completed">Completed</a>
  `;

  return defaultMenuSection;
};

const createProjectMenuSection = () => {
  // create an empty projects section
  const projectMenuSection = document.createElement("section");
  projectMenuSection.className = "nav-project-menu";

  return projectMenuSection;
};
