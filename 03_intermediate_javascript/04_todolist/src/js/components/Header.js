const Header = (username = "Sophie") => {
  const header = document.createElement("header");
  header.innerHTML = `
  <div> 
  <i class="fa-regular fa-note-sticky fa-lg"></i>  
     <span > ToDo List of ${username} </span>
  </div>`;

  return header;
};

export default Header;
