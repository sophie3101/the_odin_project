import UI from "./UI";
// import Database from "./components/Database";
const Handlers = () => {
  const ui = UI();

  const renderListeners = () => {
    document.onclick = (e) => {
      e.preventDefault();
      // console.log("click", e.target);
      // // when user select any div in navigation bar
      if (
        e.target.matches(".link-project") ||
        e.target.matches(".link-default-menu")
      ) {
        if (e.target.tagName.toLowerCase() !== "a") return;

        //to do SHOW TASKS
        console.log("showing tasks in ", e.target.dataset.title);
        ui.showTasks(e.target.dataset.title);
      }

      // user open project add form
      else if (e.target.matches(".add-project")) ui.showProjectForm();
      //when user click cancel on project form
      else if (e.target.matches("#cancel-project-btn")) ui.removeProjectForm();
      //user add project
      else if (e.target.matches("#add-project-btn")) {
        const input = document.querySelector("input[name='project']");
        const newProjectName = input.value;
        if (newProjectName.length === 0) return;
        console.log("submitting form with project name ", newProjectName);
        ui.updateProjectMenu(newProjectName, "add");
      }

      // when user click add project button
      else if (e.target.matches(".delete-project")) {
        console.log("deleting pro");
        ui.updateProjectMenu(e.target.dataset.project, "remove");
      }

      // when user add task
      else if (e.target.matches(".add-task-form-popup")) {
        ui.showTaskForm("showAddTaskForm");
      }

      //user edit task
      else if (e.target.matches(".task-info-popup")) {
        ui.showTaskForm("showEditTaskForm", e.target.parentNode.parentNode);
      }
      //user click cancel on task form
      else if (e.target.matches("#cancel-task-btn")) {
        ui.removeTaskForm();
      }
      //user add new task
      else if (e.target.matches("#add-task-btn")) {
        const description = document.getElementById(
          "task-description-input"
        ).value;
        if (description.length === 0) return;
        const dueDate = document.getElementById("task-date").value;
        const priority = document.querySelector(".priority-dropdown").value;
        const projectName = document.querySelector(".project-dropdown").value;
        console.log(
          "user input in adding new task",
          description,
          dueDate,
          priority,
          projectName
        );
        ui.updateTaskSection(
          "addTask",
          "placeholder for null TaskDIv",
          description,
          dueDate,
          priority,
          projectName
        );
      }
      //user edit task
      else if (e.target.matches("#edit-task-btn")) {
        const description = document.getElementById(
          "task-description-input"
        ).value;
        if (description.length === 0) return;
        const dueDate = document.getElementById("task-date").value;
        const priority = document.querySelector(".priority-dropdown").value;
        const projectName = document.querySelector(".project-dropdown").value;
        console.log(
          "user input in edit task ",
          description,
          dueDate,
          priority,
          projectName
        );

        ui.updateTaskSection(
          "editTask",
          e.target.parentNode.parentNode.parentNode.previousSibling, //because the edit task form is added after the task div,
          description,
          dueDate,
          priority,
          projectName
        );
      }
      //user delete task
      else if (e.target.matches("#del-task-btn")) {
        ui.updateTaskSection(
          "deleteTask",
          e.target.parentNode.parentNode.parentNode.previousSibling
        );
      }
      //user check task to indicate task is finished
      else if (e.target.matches(".task-check")) {
        // prevent task div disappear when user click in completed tab
        if (Array.from(e.target.parentNode.classList).includes("marked-task"))
          return;

        // fade the task
        ui.markTask(e.target);
      }
    };
  };

  return {
    renderListeners,
  };
};

export default Handlers;
