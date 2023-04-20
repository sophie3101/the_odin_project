require("./Styles/searchBar.css");
const SearchBar = (searchImg) => {
  const container = document.createElement("section");
  container.id = "search-section";
  const searchDiv = document.createElement("div");
  searchDiv.classList.add(".search-bar", "flex-col");
  searchDiv.innerHTML = `
  <form  class="flex-row">
    <input type="text" class="searchTerm" placeholder="Search by city name or state" required minlength="4" name="city">
    <button type="submit" class="searchButton">
      <img src="${searchImg}" alt="search-icon">
    </button>
  </form>
  <div class="error-message hide"></div>`;
  container.appendChild(searchDiv);
  return container;
};

export default SearchBar;
