import { v4 as uuidv4 } from "uuid";
const moment = require("moment");

const Task = (projectName, description, priority, dueDate) => {
  const id = uuidv4();
  let status = false; // false is not done; true is done
  description = description.toLowerCase();
  projectName = projectName.toLowerCase();

  return {
    id,
    projectName,
    description,
    priority,
    dueDate,
    status,
  };
};

export default Task;
