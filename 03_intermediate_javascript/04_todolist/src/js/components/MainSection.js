import LeftNav from "./LeftNav";
// import TaskDisplay from "./TaskDisplay";
const mainSection = () => {
  const main = document.createElement("main");
  main.classList.add("flex-row");
  main.appendChild(LeftNav());
  // main.appendChild(TaskDisplay());
  return main;
};

export default mainSection;
