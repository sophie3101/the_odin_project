const Header = (username = "Sophie") => {
  const header = document.createElement("header");
  header.innerHTML = `
  <div> 
     <i class="fa-solid fa-check"></i>  
     <span > ToDo List of ${username} </span>
  </div>`;

  return header;
};

export default Header;
