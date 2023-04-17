import Header from "./components/Header";
import Favicon from "./components/Favicon";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import Database from "./components/Database";
import TasksDisplay, { TaskDiv, TaskForm } from "./components/TaskSection";
import { ProjectForm, ProjectLink } from "./components/LeftNav";

import "../styles/index.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";

const App = () => {
  const renderHomePage = () => {
    Database.initializeDatabase();
    document.head.appendChild(
      Favicon(require("../images/checklist_favicon.png"))
    );
    document.body.appendChild(Header(Database.getUserName()));
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
    const taskInfos = document.querySelectorAll(".task-info-popup"); //the three dots;
    const circles = document.querySelectorAll(".task-check");
    const projectTitles = Array.from(
      document.querySelectorAll(".nav-project-menu > a")
    ).map((link) => link.dataset.title);

    //when user update name
    document.getElementById("username").onkeyup = (e) => {
      e.preventDefault();
      Database.setUserName(e.target.innerHTML);
    };
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
          // console.log("showing tasks in ", e.target.dataset.title);
          showTasks(e.target.dataset.title);
          renderListeners();
        })
    );

    //when user click add projects button
    addProjectIcon.onclick = (e) => {
      e.preventDefault();
      console.log("click add project");
      if (document.querySelector(".form-project") !== null) return;
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
      if (document.querySelector(".task-form-container") !== null) return;
      // get projects for Projects Nav

      const taskForm = TaskForm(projectTitles);
      taskListSection.insertAdjacentElement("afterbegin", taskForm);
      handleTaskEvents(taskForm, true);
      // renderListeners();
    };

    // when user want to view task in details or delete
    taskInfos.forEach(
      (task) =>
        (task.onclick = (e) => {
          e.preventDefault();
          if (document.querySelector(".task-form-container") !== null) return;
          const taskDiv = e.target.parentNode.parentNode;
          console.log(e.target.parentNode.parentNode);
          const taskID = taskDiv.id;
          const selectedTask = Database.getTask(taskID);
          const taskForm = TaskForm(projectTitles, selectedTask);

          taskDiv.classList.toggle("hide");
          taskDiv.insertAdjacentElement("afterend", taskForm);
          handleTaskEvents(taskForm, false, taskDiv);
          renderListeners();
        })
    );

    // when user click circle to indicate task is done
    circles.forEach(
      (circle) =>
        (circle.onclick = (e) => {
          console.log("clicking check task ", e);
          const taskDiv = e.target.parentNode;
          e.target.classList.add("circle-checked");
          taskDiv.classList.add("selected-task");
          // console.log(taskDiv);
          Database.completeTask(taskDiv.id);
          window.setTimeout(() => {
            taskDiv.style.display = "none";
          }, 1000);
        })
    );
  };

  const handleTaskEvents = (taskForm, addTask = true, taskDiv) => {
    //when user cancel
    document.getElementById("cancel-task-btn").onclick = (e) => {
      taskForm.remove();
      if (taskDiv !== undefined) taskDiv.classList.toggle("hide");
    };
    // when user submit new task or edit task
    document.getElementById("add-task-btn").onclick = (e) => {
      console.log("submitting new tasks");
      const description = document.getElementById(
        "task-description-input"
      ).value;
      const dueDate = document.getElementById("task-date").value;
      const priority = document.querySelector(".priority-dropdown").value;
      const projectName = document.querySelector(".project-dropdown").value;
      console.log("user input ", description, dueDate, priority, projectName);

      if (addTask) {
        // if user add task
        const newTask = Database.addTask(
          projectName,
          description,
          priority,
          dueDate
        );
        Database.printAllTasks();
        const newTaskDiv = TaskDiv(newTask);
        document.querySelector(".task-list").appendChild(newTaskDiv);
      } else {
        //if user edit task
        const taskID = taskDiv.id;
        Database.modifyTask(
          projectName,
          description,
          priority,
          dueDate,
          taskID
        );
        const edittedTaskDiv = TaskDiv({
          id: taskID,
          projectName,
          description,
          priority,
          dueDate,
        });
        taskDiv.replaceWith(edittedTaskDiv);
      }

      //remove TASK FORM
      console.log("remove taskForm");
      taskForm.remove();
    };

    // when user click delete button
    if (!addTask) {
      document.getElementById("del-task-btn").onclick = (e) => {
        console.log("click delete ", e.target);
        taskForm.remove();
        Database.deleteTask(taskDiv.id);
        taskDiv.remove();
      };
    }

    renderListeners();
  };

  return {
    renderHomePage,
    renderListeners,
  };
};

const showTasks = (title) => {
  let taskSection;

  if (title === "all")
    taskSection = TasksDisplay(title, Database.getAllTasks());
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
    const main = document.querySelector("main");
    if (document.querySelector(".task-container") !== null)
      main.removeChild(document.querySelector(".task-container"));

    main.appendChild(taskSection);
  }
};

export default App;
