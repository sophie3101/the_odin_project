import { addFavicon, addFooter, updateHead } from "./miscellaneous";

import { createHeader, addLogo } from "./navBar";
import { addHomeSection } from "./home";
import { createContactPage } from "./contact";
import "./styles/index.css";

const icons = {
  favicon: require("./images/coffee-beans.png"),
  logo: require("./images/coffee-beans-logo.png"),
};

const createMain = () => {
  document.body.appendChild(document.createElement("main"));
};

updateHead();
addFavicon(icons.favicon);
createHeader();
addLogo(icons.logo);

createMain();
// home link
// addHomeSection();
//contact

createContactPage();
addFooter();
