require("./Styles/searchBar.css");

const SearchBar = (searchImg) => {
  const container = document.createElement("section");
  container.id = "search-section";
  // container.class = "flex-col";
  const searchDiv = document.createElement("div");
  searchDiv.classList.add(".search-bar", "flex-col");
  searchDiv.innerHTML = `
  <div class="search-header flex-row"> 
    <form  class="flex-row">
      <input type="text" class="searchTerm" placeholder="Search by city name" required minlength="4" name="city">
      <button type="submit" class="searchButton">
        <img src="${searchImg}" alt="search-icon">
      </button>
    </form>

    <label class="switch">
      <input type="checkbox" id="togBtn">
      <div class="slider round"></div>
    </label>
  </div>

  <div class="result-dropdown flex-col hide"></div>
  <div class="error-message hide"></div>`;
  container.appendChild(searchDiv);
  return container;
};

export default SearchBar;
