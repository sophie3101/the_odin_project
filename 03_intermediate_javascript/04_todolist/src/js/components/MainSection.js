import LeftNav from "./LeftNav";
import TaskSection from "./TaskSection";
const MainSection = (projects, tasks) => {
  const main = document.createElement("main");
  main.classList.add("flex-row");
  main.appendChild(LeftNav(projects));
  main.appendChild(TaskSection("all", tasks));

  return main;
};

export default MainSection;
