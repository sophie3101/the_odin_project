import "./styles/menu.css";
const menu = [
  {
    type: "hot",
    name: "cappucino",
    price_med: 3.5,
    price_large: 4.5,
  },
  {
    type: "hot",
    name: "espresso",
    price_med: 3.5,
    price_large: 5,
  },
  {
    type: "hot",
    name: "americano",
    price_med: 3.5,
    price_large: 4.5,
  },
  {
    type: "hot",
    name: "latte",
    price_med: 3.8,
    price_large: 4.5,
  },
  {
    type: "hot",
    name: "mocaccino",
    price_med: 3.5,
    price_large: 4.75,
  },
  {
    type: "hot",
    name: "frappe",
    price_med: 4.2,
    price_large: 5,
  },
  {
    type: "cold",
    name: "caremel",
    price_med: 3,
    price_large: 4.5,
  },
  {
    type: "cold",
    name: "mocha",
    price_med: 3,
    price_large: 4.5,
  },
  {
    type: "cold",
    name: "cortado",
    price_med: 3,
    price_large: 4.5,
  },
  {
    type: "cold",
    name: "latte",
    price_med: 3,
    price_large: 4.5,
  },
  {
    type: "add-on",
    name: "milk",
    price: 2,
  },
  {
    type: "add-on",
    name: "coconut milk",
    price: 2,
  },
  {
    type: "add-on",
    name: "cocoa powder",
    price: 2,
  },
  {
    type: "add-on",
    name: "almond milk",
    price: 2,
  },
  {
    type: "add-on",
    name: "syrup",
    price: 3,
  },
  {
    type: "add-on",
    name: "vanilla",
    price: 1,
  },
];

const addToMenu = (menuItems, type, menuDiv) => {
  menuItems.forEach((item) => {
    if (item.type !== type) return;
    if (item.type !== "add-on")
      menuDiv.innerHTML += `
    <div>
      <p class='item'>${item.name} </p> 
      <p class="price-span"><span class="price-med">${item.price_med} </span> <span class="price-med" >${item.price_large} </span></p>
    </div>`;
    else
      menuDiv.innerHTML += `
    <div>
      <p class='item'>${item.name}</p>
      <p class="price-span"> <span class="price-large">${item.price} </span> </p>
    </div>`;
  });
};

export const addMenuSection = () => {
  const menuSection = document.createElement("section");
  menuSection.classList.add("menu");
  menuSection.innerHTML = `<h1>Menu</h1>`;

  const menuContainer = document.createElement("div");
  menuContainer.className = "menu-container";
  menuSection.appendChild(menuContainer);

  const menuHeader = document.createElement("div");
  menuHeader.className = "menu-header";
  menuHeader.innerHTML = `<div>
  <h1>HOT</h1>
</div>
<div>
  <h1>COLD</h1>
</div>
<div>
  <h1>ADD ONS</h1>
</div>`;
  menuContainer.appendChild(menuHeader);

  let hotMenu = document.createElement("div");
  hotMenu.className = "hot-menu";
  // hotMenu.innerHTML = `<div><p></p> <p class="price-span" ><span class="price-type"> MD </span> <span class="price-type"> LG </span></p></div>`;
  hotMenu.innerHTML = `<div><p></p> <p class="price-span" ><span class="price-type"> MD </span> <span class="price-type"> LG </span></p></div>`;
  addToMenu(menu, "hot", hotMenu);

  let coldMenu = document.createElement("div");
  coldMenu.className = "cold-menu";
  coldMenu.innerHTML = `<div><p></p> <p class="price-span" ><span class="price-type"> MD </span> <span class="price-type"> LG </span></p></div>`;
  addToMenu(menu, "cold", coldMenu);

  let addOnMenu = document.createElement("div");
  addOnMenu.className = "add-on-menu";
  addToMenu(menu, "add-on", addOnMenu);

  menuContainer.appendChild(hotMenu);
  menuContainer.appendChild(coldMenu);
  menuContainer.appendChild(addOnMenu);
  let main = document.querySelector("main");
  main.innerHTML = "";
  main.appendChild(menuSection);
};
