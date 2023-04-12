import { addFavicon, addFooter } from "./miscellaneous";

import { createHeader, addLogo } from "./navBar";
import { addHomeSection } from "./home";
import { addContactSection } from "./contact";
import "./styles/index.css";
import { addMenuSection } from "./menu";

const icons = {
  favicon: require("./images/coffee-beans.png"),
  logo: require("./images/coffee-beans-logo.png"),
};

const createMain = () => {
  document.body.appendChild(document.createElement("main"));
};

addFavicon(icons.favicon);
createHeader();
addLogo(icons.logo);

createMain();
addHomeSection();

let links = document.querySelectorAll(".navbar li");

document.querySelector(".navbar-logo").onclick = (e) => {
  e.preventDefault();
  addHomeSection();
};
links.forEach(
  (link) =>
    (link.onclick = (e) => {
      e.preventDefault();
      if (e.target.textContent === "Home") addHomeSection();
      else if (e.target.textContent === "Contact") addContactSection();
      else addMenuSection();
    })
);

addFooter();
