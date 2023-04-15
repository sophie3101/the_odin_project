import Database from "./components/Database";
import { getProjectTitleLinks } from "./components/LeftNav";
import TaskDisplay from "./components/TaskDisplay";
import { createDummyData } from "./createDummyData";

const DOM = () => {
  console.log("calling DOme");
  // console.log("is database empty? ", Database.isDatabaseEmpty());
  Database.clearDatabase();
  if (Database.isDatabaseEmpty()) createDummyData();
  // Database.printAllTasks();
  // Database.printAllProjects();
  //  FUNCTIONS
  const showProjects = () => {
    if (Database.getAllProjects().length === 0) return;

    const projectMenuSection = document.querySelector(".nav-project-menu");

    const projectMenuTitles = projectMenuSection.querySelectorAll("a");
    projectMenuTitles.forEach((title) => title.remove());

    projectMenuSection.innerHTML += getProjectTitleLinks(
      Database.getAllProjects()
    );

    // Database.printAllProjects();
  };

  const showTasks = (title = "All") => {
    const tasks = Database.getAllTasks();
    let taskDiv;
    switch (title.toLowerCase()) {
      case "all":
        taskDiv = TaskDisplay(title, tasks, true);
        break;

      default:
        console.log("fdf");
    }

    const main = document.querySelector("main");
    if (document.querySelector("task-container") !== null)
      main.removeChild(document.querySelector("task-container"));

    main.appendChild(taskDiv);
  };

  // CALL FUNCTIONS
  showProjects();
  showTasks("all");
  // when user select any div in navigation bar
  const links = document.querySelectorAll("a");
  links.forEach(
    (link) =>
      (link.onclick = (e) => {
        e.preventDefault();
        const selectedLink = document.querySelector(".selected");
        selectedLink.classList.remove("selected");
        e.target.classList.add("selected");
        //to do SHOW TASKS
        console.log("click link ", e.target.dataset.title);
        showTasks(e.target.dataset.title);
      })
  );

  // when user check task is finished
  const taskCheckBox = document.querySelectorAll(".task-status");
  taskCheckBox.forEach(
    (checkbox) =>
      (checkbox.onclick = (e) => {
        e.preventDefault();
        e.target.classList.toggle("fa-circle-check");
      })
  );

  //when user click add projects
  const projectForm = document.querySelector(".form-project");
  console.log(projectForm);
  const addProjectIcon = document.querySelector(".add-project");
  addProjectIcon.onclick = (e) => {
    e.preventDefault();
    // console.log(e);
    projectForm.classList.toggle("hide");
  };

  document.querySelector("#cancel-btn").onclick = (e) => {
    e.preventDefault();
    projectForm.classList.toggle("hide");
  };

  projectForm.onsubmit = (e) => {
    console.log("submitting form");
    e.preventDefault();
    const input = document.querySelector("input[name='project']");
    const newProjectName = input.value;
    if (newProjectName.length === 0) return;
    // add to database
    Database.addProject(newProjectName);
    // Database.printAllProjects();
    //show to console
    showProjects();
    projectForm.reset();
    projectForm.classList.toggle("hide");
  };
  //when user click add task
  const addTaskIcon = document.querySelector(".add-task");
  addTaskIcon.onclick = (e) => {
    e.preventDefault();
    console.log("add task ", e);
  };
};

export default DOM;
