import { v4 as uuidv4 } from "uuid";
const Project = (projectName) => {
  const id = uuidv4();
  projectName = projectName.toLowerCase();
  return {
    id,
    projectName,
  };
};
export default Project;
