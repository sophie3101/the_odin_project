import LeftNav from "./LeftNav";
// import TaskDisplay from "./TaskDisplay";
const MainSection = (projects) => {
  const main = document.createElement("main");
  main.classList.add("flex-row");
  main.appendChild(LeftNav(projects));
  // main.appendChild(TaskDisplay());
  return main;
};

export default MainSection;
