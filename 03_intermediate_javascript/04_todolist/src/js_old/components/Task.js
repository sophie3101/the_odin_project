import { v4 as uuidv4 } from "uuid";
const Task = (projectName, description, priority, dueDate) => {
  const id = uuidv4();

  const getId = () => id;

  return {
    id,
    projectName,
    description,
    priority,
    dueDate,
  };
};

export default Task;
