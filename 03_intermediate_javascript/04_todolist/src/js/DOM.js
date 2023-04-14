import Database from "./components/Database";
import { getProjectTitleLinks } from "./components/LeftNav";
import TaskDisplay from "./components/TaskDisplay";
import { createDummyData } from "./createDummyData";

const DOM = () => {
  // console.log("is database empty? ", Database.isDatabaseEmpty());
  Database.clearDatabase();
  if (Database.isDatabaseEmpty()) createDummyData();
  // Database.printAllTasks();
  // Database.printAllProjects();

  const showProjects = () => {
    if (Database.getAllProjects().length === 0) return;

    const projectMenuSection = document.querySelector(".nav-project-menu");
    const projectMenuTitles = projectMenuSection.querySelectorAll("a");
    projectMenuTitles.forEach((title) => title.remove());

    projectMenuSection.innerHTML += getProjectTitleLinks(
      Database.getAllProjects()
    );

    Database.printAllProjects();
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
    console.log(document.querySelector("task-container"));
    if (document.querySelector("task-container") !== null)
      main.removeChild(document.querySelector("task-container"));

    main.appendChild(taskDiv);
  };

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
        console.log(e.target.dataset.title);
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
  const addProjectIcon = document.querySelector(".add-project");
  addProjectIcon.onclick = (e) => {
    e.preventDefault();
    console.log(e);
    projectForm.classList.toggle("hide");
  };

  document.querySelector("#cancel-btn").onclick = (e) => {
    e.preventDefault();
    projectForm.classList.toggle("hide");
  };
  projectForm.onsubmit = (e) => {
    e.preventDefault();
    const input = document.querySelector("input[name='project']");
    const newProjectName = input.value;
    Database.addProject(newProjectName);
    Database.printAllProjects();
    console.log("new project name", newProjectName);
    showProjects();
    projectForm.reset();
    projectForm.classList.toggle("hide");
  };
  //when user click add task
  const addTaskIcon = document.querySelector(".add-task");
  addTaskIcon.onclick = (e) => {
    e.preventDefault();
    console.log(e);
  };
};

export default DOM;

// let Tasks;
// // localStorage.clear();
// if (localStorage.getItem("tasks") === null) Tasks = createDummyData();
// else Tasks = TaskList(JSON.parse(localStorage.getItem("tasks")));

// // group data
// const taskList = Tasks.getTasks();
// // console.log(taskList);
// // console.log(TaskListCategory(taskList).getTaskMapByDate());
