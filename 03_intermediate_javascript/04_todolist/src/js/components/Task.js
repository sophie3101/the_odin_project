import { v4 as uuidv4 } from "uuid";
const moment = require("moment");

const Task = (projectName, description, priority, dueDate) => {
  const id = uuidv4();
  let status = true; // false is not done; true is done
  const setDueDateCategory = (date) => {
    const dueDate = moment(date, "YYYY-MM-DD");
    if (dueDate.isSame(moment(), "day")) return "today";
    else if (dueDate.isAfter(moment(), "day")) return "upcoming";
    return "overdue";
  };

  const toggleStatus = () => (status = status ? false : true);
  const dateCategory = setDueDateCategory(dueDate);
  return {
    id,
    projectName,
    description,
    priority,
    dueDate,
    dateCategory,
    status,
  };
};

export default Task;
