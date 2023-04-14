export const addHeader = (username = "Sophie") => {
  const header = document.createElement("header");
  header.innerHTML = `
  <div> 
     <i class="fa-solid fa-check"></i>  
     <span > ToDo List of ${username} </span>
  </div>`;
  document.querySelector("body").appendChild(header);
};
