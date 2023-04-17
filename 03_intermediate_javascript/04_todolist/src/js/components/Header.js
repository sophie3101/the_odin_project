const Header = (username) => {
  const header = document.createElement("header");
  header.innerHTML = `
  <div > 
    <i class="fa-regular fa-note-sticky fa-lg"></i>  
     <span> &nbsp ToDo List of</span> 
     <span contenteditable="true" id="username">
        ${username}
    </span>
  </div>`;

  return header;
};

export default Header;
