const SearchBar = (searchImg) => {
  const container = document.createElement("section");
  container.id = "search-section";
  const searchDiv = document.createElement("div");
  searchDiv.classList.add(".search-bar", "flex-row");
  searchDiv.innerHTML = `
  <input type="text" class="searchTerm" placeholder="Search by city name or state">
  <button type="submit" class="searchButton">
    <img src="${searchImg}" alt="search-icon">
  </button>`;
  container.appendChild(searchDiv);
  return container;
};

export default SearchBar;
