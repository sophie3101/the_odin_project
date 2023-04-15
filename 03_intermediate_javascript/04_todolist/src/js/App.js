import Header from "./components/Header";
import Favicon from "./components/Favicon";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import Database from "./components/Database";
import TaskDisplay from "./components/TaskSection";
import { ProjectForm, getProjectLink } from "./components/LeftNav";

import "../styles/index.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
// import "@fortawesome/fontawesome-free/js/brands";

const App = () => {
  const renderHomePage = () => {
    initializeDatabase();

    document.head.appendChild(
      Favicon(require("../images/checklist_favicon.png"))
    );
    document.body.appendChild(Header());
    document.body.appendChild(
      MainSection(Database.getAllProjects(), Database.getAllTasks())
    );
    document.body.appendChild(Footer());
    // showTasks("all");
  };

  const renderListeners = () => {
    // initialize variable
    const menuLinks = document.querySelectorAll('a[class^="link"]');
    const projectForm = document.querySelector(".form-project");
    const addProjectIcon = document.querySelector(".add-project");
    const projectMenuNav = document.querySelector(".nav-project-menu");
    const projectFormCancelBtn = document.getElementById("cancel-btn");
    const projectAddBtn = document.getElementById("add-btn");

    // when user select any div in navigation bar
    menuLinks.forEach(
      (link) =>
        (link.onclick = (e) => {
          e.preventDefault();
          const selectedLink = document.querySelector(".selected");
          selectedLink.classList.remove("selected");
          e.target.classList.add("selected");
          //to do SHOW TASKS
          showTasks(e.target.dataset.title);
        })
    );

    //when user click add projects button
    addProjectIcon.onclick = (e) => {
      e.preventDefault();
      projectForm.classList.toggle("hide");
    };

    //when user click cancel
    projectFormCancelBtn.onclick = (e) => {
      e.preventDefault();
      console.log(e.target);
      projectForm.classList.toggle("hide");
    };
    // when user hit submit button in project form
    projectAddBtn.onclick = (e) => {
      e.preventDefault();
      const input = document.querySelector("input[name='project']");
      const newProjectName = input.value;
      if (newProjectName.length === 0) return;

      console.log("submitting form with project name ", newProjectName);

      // add to database
      Database.addProject(newProjectName);
      Database.printAllProjects();
      // //show to console
      projectForm.classList.toggle("hide");
      projectMenuNav.innerHTML += getProjectLink(newProjectName);
      // // hide project form
      projectForm.reset();
      // // location.reload();
      // return false;
    };
  };

  renderHomePage();
  renderListeners();
};

const initializeDatabase = () => {
  // console.log("is database empty? ", Database.isDatabaseEmpty());
  Database.clearDatabase();
  if (Database.isDatabaseEmpty()) Database.addDummyData();
  // Database.printAllProjects();
  // Database.printAllTasks();
};

const showTasks = (title) => {
  const tasks = Database.getAllTasks();
  let taskSection;
  title = title.toLowerCase();
  if (title === "all") taskSection = TaskDisplay(title, tasks, true);
  else if (title === "today" || title == "upcoming") {
    taskSection = TaskDisplay(
      title,
      Database.getTasksByDateCategory(title),
      false
    );
  } else if (title == "flagged") {
    taskSection = TaskDisplay(title, Database.getImportantTasks(), false);
  } else {
    taskSection = TaskDisplay(title, Database.getCompletedTasks(), false);
  }

  if (taskSection !== undefined) {
    const main = document.querySelector("main");
    if (document.querySelector(".task-container") !== null)
      main.removeChild(document.querySelector(".task-container"));

    main.appendChild(taskSection);
  }
};

export default App;
