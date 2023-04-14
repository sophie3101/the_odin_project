import "./styles/index.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid"; // https://fontawesome.com/icons?d=gallery&s=solid&m=free
import "@fortawesome/fontawesome-free/js/regular"; // https://fontawesome.com/icons?d=gallery&s=regular&m=free
import "@fortawesome/fontawesome-free/js/brands"; // https://fontawesome.com/icons?d=gallery&s=brands&m=free

import Header from "./js/components/Header";
import Footer from "./js/components/Footer";
import MainSection from "./js/components/MainSection";
import Favicon from "./js/components/Favicon";
import DOM from "./js/DOM";

const loadPage = () => {
  // console.log("load");
  document.head.appendChild(Favicon(require("./images/checklist_favicon.png")));
  document.body.appendChild(Header());
  document.body.appendChild(MainSection());
  document.body.appendChild(Footer());

  DOM();
};

loadPage();
