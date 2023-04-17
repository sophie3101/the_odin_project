import Header from "./components/Header";
import Favicon from "./components/Favicon";
import Footer from "./components/Footer";
import Database from "./components/Database";
import TasksDisplay, { TaskDiv, TaskForm } from "./components/TaskSection";
import LeftNav, { ProjectForm, ProjectLink } from "./components/LeftNav";

import "../styles/index.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";

const UI = () => {
  const projectMenuNav = document.querySelector(".nav-project-menu");
  const loadHomePage = () => {
    Database.initializeDatabase();
    document.head.appendChild(
      Favicon(require("../images/checklist_favicon.png"))
    );
    document.body.appendChild(Header(Database.getUserName()));
    // MAIN
    const main = document.createElement("main");
    main.classList.add("flex-row");
    document.body.appendChild(main);
    //LEFT NAVIGATION
    main.appendChild(LeftNav(Database.getAllProjects()));

    // TASK SECTION
    main.appendChild(
      TasksDisplay(
        document.querySelector("a.selected").dataset.title,
        Database.getAllTasks()
      )
    );

    document.body.appendChild(Footer());
  };

  const showTasks = (title) => {
    // add selected class to div that is clicked and remove div with assign class=selected
    const selectedLink = document.querySelector(".selected");
    if (selectedLink !== null) selectedLink.classList.remove("selected");

    document
      .querySelector([`[data-title="${title}"]`])
      .classList.add("selected");

    let taskSection;

    if (title === "all")
      taskSection = TasksDisplay(title, Database.getCurrentTasks());
    else if (title === "today" || title == "upcoming") {
      taskSection = TasksDisplay(
        title,
        Database.getTasksByDateCategory(title),
        false
      );
    } else if (title == "important") {
      taskSection = TasksDisplay(title, Database.getImportantTasks(), false);
    } else if (title === "completed") {
      taskSection = TasksDisplay(title, Database.getCompletedTasks(), false);
    } else {
      taskSection = TasksDisplay(
        title,
        Database.getTasksByProjectName(title),
        true
      );
    }

    if (taskSection !== undefined) {
      document.querySelector(".task-container").replaceWith(taskSection);
      // const main = document.querySelector("main");
      // if (document.querySelector(".task-container") !== null)
      //   main.removeChild(document.querySelector(".task-container"));

      // main.appendChild(taskSection);
    }
  };

  const showProjectForm = () => {
    // prevent multiple form shows more than once
    if (document.querySelector(".form-project") !== null) return;

    const projectForm = ProjectForm();
    projectMenuNav.insertAdjacentElement("beforeend", projectForm);
  };

  const removeProjectForm = () => {
    document.querySelector(".form-project").remove();
  };

  const updateProjectMenu = (projectName, action) => {
    // udpate project menu after adding project or delete project
    if (action === "add") {
      // add to database
      const hasNewProject = Database.addProject(projectName);
      Database.printAllProjects();
      //console
      if (hasNewProject) projectMenuNav.appendChild(ProjectLink(projectName));
      document.querySelector(".form-project").remove();
    } else {
      // delete project div
      Database.deleteProject(projectName);
      // find div with project name
      const projectDiv = document.querySelector(
        `[data-title="${projectName}"]`
      );
      projectDiv.remove();
      //go back to default selected link
      showTasks("all");
    }
  };

  const showTaskForm = (action, taskDiv) => {
    if (document.querySelector(".task-form-container") !== null) return;

    // get projects for Projects Nav
    const projectTitles = Array.from(
      document.querySelectorAll(".nav-project-menu > a")
    ).map((link) => link.dataset.title);

    if (action === "showAddTaskForm") {
      const taskForm = TaskForm(projectTitles);
      document
        .querySelector(".task-list")
        .insertAdjacentElement("afterbegin", taskForm);
    }
    // if user edit task
    else {
      console.log(taskDiv);
      const taskID = taskDiv.id;
      const selectedTask = Database.getTask(taskID);
      const taskForm = TaskForm(projectTitles, selectedTask);

      taskDiv.classList.toggle("hide");
      taskDiv.insertAdjacentElement("afterend", taskForm);
    }
  };

  const removeTaskForm = () => {
    const formDiv = document.querySelector(".task-form-container");
    formDiv.remove();
    if (formDiv.dataset.form === "edit") {
      // if the task form is for editting task, remove .hide class for the div containing task
      document.querySelector(".hide").classList.remove("hide");
    }
  };

  const updateTaskSection = (
    action,
    taskDiv,
    description,
    dueDate,
    priority,
    projectName
  ) => {
    if (action === "addTask") {
      const newTask = Database.addTask(
        projectName,
        description,
        priority,
        dueDate
      );
      Database.printAllTasks();
      const newTaskDiv = TaskDiv(newTask);
      document.querySelector(".task-list").appendChild(newTaskDiv);
    }
    //if user edit task
    else if (action === "editTask") {
      const taskID = taskDiv.id;
      Database.modifyTask(projectName, description, priority, dueDate, taskID);
      const edittedTaskDiv = TaskDiv({
        id: taskID,
        projectName,
        description,
        priority,
        dueDate,
      });
      taskDiv.replaceWith(edittedTaskDiv);
    }
    //user delete task
    else {
      Database.deleteTask(taskDiv.id);
      taskDiv.remove();
      console.log(document.querySelector(".selected").dataset.title);
    }
    //remove task form
    document.querySelector(".task-form-container").remove();
    if (action === "deleteTask") {
      //update title
      showTasks(document.querySelector(".selected").dataset.title);
    }
  };

  const markTask = (checkElement) => {
    // fill the circle with color
    checkElement.classList.add("circle-checked");

    // fade the task letter
    const taskDiv = checkElement.parentNode;
    taskDiv.classList.add("selected-task");
    //update status from False to True
    Database.completeTask(taskDiv.id);
    window.setTimeout(() => {
      taskDiv.style.display = "none";
    }, 1000);
  };

  return {
    loadHomePage,
    showTasks,
    showProjectForm,
    removeProjectForm,
    updateProjectMenu,
    showTaskForm,
    removeTaskForm,
    updateTaskSection,
    markTask,
  };
};

export default UI;
