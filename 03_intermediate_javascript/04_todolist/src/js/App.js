import Header from "./components/Header";
import Favicon from "./components/Favicon";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import Database from "./components/Database";
import TaskDisplay from "./components/TaskDisplay";
import { ProjectForm, getProjectLink } from "./components/LeftNav";

import "../styles/index.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
// import "@fortawesome/fontawesome-free/js/brands";

const App = () => {
  const loadHomePage = () => {
    initializeDatabase();

    document.head.appendChild(
      Favicon(require("../images/checklist_favicon.png"))
    );
    document.body.appendChild(Header());
    document.body.appendChild(MainSection(Database.getAllProjects()));
    document.body.appendChild(Footer());
    // showTasks("all");
  };

  loadHomePage();

  // initialize variable
  const menuLinks = document.querySelectorAll('a[class^="link"]');
  // const projectForm = document.querySelector(".form-project");
  const addProjectIcon = document.querySelector(".add-project");
  const projectMenuNav = document.querySelector(".nav-project-menu");

  // when user select any div in navigation bar
  menuLinks.forEach((link) => link.addEventListener("click", showTaskListener));
  //when user click add projects button
  addProjectIcon.onclick = (e) => {
    e.preventDefault();
    // console.log(e);
    // projectForm.classList.toggle("hide");
    projectMenuNav.appendChild(ProjectForm());
  };

  //when user click cancel
  document.querySelector("#cancel-btn").onclick = (e) => {
    e.preventDefault();
    console.log(e.target);
    // projectForm.classList.toggle("hide");
  };
  //when user hit submit button in project form
  // projectForm.onsubmit = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.parentNode);
  //   const input = document.querySelector("input[name='project']");
  //   const newProjectName = input.value;
  //   if (newProjectName.length === 0) return;

  //   console.log("submitting form with project name ", newProjectName);

  //   // add to database
  //   Database.addProject(newProjectName);
  //   Database.printAllProjects();
  //   // //show to console
  //   projectForm.classList.toggle("hide");
  //   e.target.parentNode.innerHTML += getProjectLink(newProjectName);
  //   // hide project form
  //   projectForm.reset();
  //   // location.reload();
  //   return false;
  // };
};

const initializeDatabase = () => {
  // console.log("is database empty? ", Database.isDatabaseEmpty());
  Database.clearDatabase();
  if (Database.isDatabaseEmpty()) Database.addDummyData();
  // Database.printAllProjects();
};

const showTaskListener = (e) => {
  e.preventDefault();
  const selectedLink = document.querySelector(".selected");
  selectedLink.classList.remove("selected");
  e.target.classList.add("selected");
  //to do SHOW TASKS
  console.log("click link ", e.target.dataset.title);
  showTasks(e.target.dataset.title);
};

const showProjects = () => {
  Database.printAllProjects();
  if (Database.getAllProjects().length === 0) return;

  const projectMenuSection = document.querySelector(".nav-project-menu");

  const projectMenuTitles = projectMenuSection.querySelectorAll("a");
  projectMenuTitles.forEach((title) => title.remove());

  projectMenuSection.innerHTML += getProjectTitleLinks(
    Database.getAllProjects()
  );
};

const showTasks = (title) => {
  const tasks = Database.getAllTasks();
  let taskDiv;
  switch (title.toLowerCase()) {
    case "all":
      taskDiv = TaskDisplay(title, tasks, true);
      break;

    default:
      console.log("fdf");
  }

  // const main = document.querySelector("main");
  // if (document.querySelector("task-container") !== null)
  //   main.removeChild(document.querySelector("task-container"));

  // main.appendChild(taskDiv);
};

export default App;
