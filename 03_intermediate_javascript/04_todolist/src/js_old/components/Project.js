import { v4 as uuidv4 } from "uuid";
const Project = (projectName) => {
  const id = uuidv4();
  return {
    id,
    projectName,
  };
};
export default Project;
