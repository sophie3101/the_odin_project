import Header from "./components/Header";
import Favicon from "./components/Favicon";
import Footer from "./components/Footer";
import MainSection, { TaskForm } from "./components/MainSection";
import Database from "./components/Database";
import TaskDisplay from "./components/TaskSection";
import { ProjectForm, ProjectLink } from "./components/LeftNav";

import "../styles/index.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
// import "@fortawesome/fontawesome-free/js/brands";

const App = () => {
  const renderHomePage = () => {
    initializeDatabase();
    Database.printAllTasks();
    document.head.appendChild(
      Favicon(require("../images/checklist_favicon.png"))
    );
    document.body.appendChild(Header());
    document.body.appendChild(
      MainSection(Database.getAllProjects(), Database.getAllTasks())
    );
    document.body.appendChild(Footer());
  };

  const renderListeners = () => {
    // initialize variable
    const menuLinks = document.querySelectorAll('a[class^="link"]');
    const addProjectIcon = document.querySelector(".add-project");
    const projectMenuNav = document.querySelector(".nav-project-menu");
    const deleteProjectBtns = document.querySelectorAll(".delete-project");
    const addTaskBtn = document.querySelector(".add-task");
    const taskListSection = document.querySelector(".task-list");

    // when user select any div in navigation bar
    menuLinks.forEach(
      (link) =>
        (link.onclick = (e) => {
          e.preventDefault();
          if (e.target.tagName.toLowerCase() !== "a") return;
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
      console.log("click add project");
      // projectForm.classList.toggle("hide");
      const projectForm = ProjectForm();
      projectMenuNav.insertAdjacentElement("beforeend", projectForm);

      //when user click cancel
      document.getElementById("cancel-project-btn").onclick = (e) => {
        e.preventDefault();
        projectForm.remove();
      };

      // when user submit adding project
      projectForm.onsubmit = (e) => {
        e.preventDefault();
        const input = document.querySelector("input[name='project']");
        const newProjectName = input.value;
        if (newProjectName.length === 0) return;

        console.log("submitting form with project name ", newProjectName);

        // add to database
        const hasNewProject = Database.addProject(newProjectName);
        Database.printAllProjects();
        //show to console

        if (hasNewProject)
          projectMenuNav.appendChild(ProjectLink(newProjectName));

        projectForm.remove();
        renderListeners();
      };
    };

    //when user hit delete project
    deleteProjectBtns.forEach(
      (btn) =>
        (btn.onclick = (e) => {
          console.log(e);
          e.preventDefault();
          Database.deleteProject(e.target.dataset.project);
          e.target.parentNode.remove();

          document.querySelector("main").remove();
          document.body.appendChild(
            MainSection(Database.getAllProjects(), Database.getAllTasks())
          );
          renderListeners();
        })
    );

    // when user add task
    addTaskBtn.onclick = (e) => {
      e.preventDefault();
      console.log("adding task");
      const taskForm = TaskForm(Database.getAllProjects());
      taskListSection.insertAdjacentElement("afterbegin", taskForm);

      document.getElementById("cancel-task-btn").onclick = (e) => {
        console.log("click cancle adding task ", e.target);
        taskForm.remove();
      };

      document.getElementById("add-task-btn").onclick = (e) => {
        console.log("submitting new tasks");
        const taskDescription = document.getElementById(
          "task-description-input"
        ).value;
        const date = document.getElementById("task-date").value;
        const priority = document.querySelector(".priority-dropdown").value;
        const projectName = document.querySelector(".project-dropdown").value;
        console.log(taskDescription, date, priority, projectName);

        taskForm.remove();
        renderListeners();
      };
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

  if (title === "all") taskSection = TaskDisplay(title, tasks);
  else if (title === "today" || title == "upcoming") {
    taskSection = TaskDisplay(
      title,
      Database.getTasksByDateCategory(title),
      false
    );
  } else if (title == "important") {
    taskSection = TaskDisplay(title, Database.getImportantTasks(), false);
  } else if (title === "completed") {
    taskSection = TaskDisplay(title, Database.getCompletedTasks(), false);
  } else {
    taskSection = TaskDisplay(
      title,
      Database.getTasksByProjectName(title),
      true
    );
  }

  if (taskSection !== undefined) {
    const main = document.querySelector("main");
    if (document.querySelector(".task-container") !== null)
      main.removeChild(document.querySelector(".task-container"));

    main.appendChild(taskSection);
  }
};

export default App;
