import "./styles/index.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid"; // https://fontawesome.com/icons?d=gallery&s=solid&m=free
import "@fortawesome/fontawesome-free/js/regular"; // https://fontawesome.com/icons?d=gallery&s=regular&m=free
import "@fortawesome/fontawesome-free/js/brands"; // https://fontawesome.com/icons?d=gallery&s=brands&m=free

import { addFavicon, addFooter } from "./js/miscellaneous";
import { addHeader } from "./js/header";
import { addMain } from "./js/mainSection";
import { addLeftNav } from "./js/navBar";
import DOM from "./js/DOM";

const loadPage = () => {
  addFavicon(require("./images/checklist_favicon.png"));
  addHeader();
  addLeftNav();
  addMain();
  addFooter();
  DOM();
};

loadPage();
