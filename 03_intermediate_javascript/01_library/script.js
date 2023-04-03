// selector
const container = document.querySelector(".container");
const add_book_div = document.querySelector(".add");
const show_book_form_btn = document.getElementById("show-book-form-btn");
const book_form_section = document.getElementById("add-book-form");
const add_book_btn = document.getElementById("add-book-btn");

let has_book_form = false;

let library = [
  new Book("no author", "Once upon a time", "12-01-2001", "23", "not read"),
];

// function
function Book(author, title, publication_date, page_no, read_status) {
  this.author = author;
  this.title = title;
  this.publication_date = publication_date;
  this.page_no = page_no;
  this.read_status = read_status;
  this._id = 1;
  this.set_id = function (id) {
    this._id = id;
  };
}

const get_random_color = () =>
  ["#fdba74", "#bbf7d0", "#ddd6fe", "#fecdd3", "#93c5fd", "#fca5a5"][
    Math.floor(Math.random() * 6)
  ];

const toggle_add_book_form = (display_form) => {
  display_form
    ? book_form_section.classList.remove("hidden")
    : book_form_section.classList.add("hidden");
};

const display_book = (book) => {
  const card_div = document.createElement("div");
  card_div.classList.add("book");
  card_div.classList.add("card");

  const html_content = `
  <div class="card-content" data-id=${book._id}>
    <div class="card-del">
      <button onClick="delete_book(${book._id})" id="del-btn">X</button>
    </div>
    <div class="title"><span>${book.title}</span></div>
    <div class="author">
      <span>By: </span><span class="book-label">${book.author}</span>
    </div>
    <div class="date">
      <span>Published:</span><span class="book-label">${book.publication_date}</span>
    </div>
    <div class="page-no">
      <span>Number of pages: </span><span class="book-label">${book.page_no}</span>
    </div>
  </div>

  <div class="read-status">
    <label for="toggle">${book.read_status}</label>
    <input type="checkbox" name="toggle" id="toggle" />
  </div>`;
  card_div.style.backgroundColor = get_random_color();

  card_div.innerHTML = html_content;
  container.insertBefore(card_div, add_book_div);
};

const display_books = (books) => {
  const all_books_div = document.querySelectorAll(".book");
  all_books_div.forEach((div) => div.remove());
  books.forEach((book) => display_book(book));
};

const add_book_to_library = (book) => {
  library.push(book);
  display_book(book);
};

const form = document.querySelector("form");
form.onsubmit = (event) => {
  event.preventDefault();

  const title = document.getElementById("book-title");
  const author = document.getElementById("book-author");
  const publication_date = document.getElementById("book-published-date");
  const pages_no = document.getElementById("book-pages-no");
  const read_status = document.getElementById("book-read-status");

  const book = new Book(
    author.value,
    title.value,
    publication_date.value,
    pages_no.value,
    read_status.value
  );
  book.set_id(library.length + 1);
  add_book_to_library(book);
  form.reset();
};

show_book_form_btn.onclick = (e) => {
  e.stopPropagation();
  has_book_form = !has_book_form;
  toggle_add_book_form(has_book_form);
};

document.onclick = (e) => {
  if (has_book_form) {
    if (e.target === book_form_section) {
      // the book form cover whe whole page, and the form is placed in middle
      has_book_form = !has_book_form;
    }
  }
  toggle_add_book_form(has_book_form);
};

// user delete book
const delete_book = (book_id) => {
  let del = confirm("Are you sure you want to delete this record?");
  if (del) {
    library = library.filter((book) => book._id !== book_id);
    display_books(library);
  }
};

window.onload = () => {
  display_books(library);
  toggle_add_book_form(has_book_form);
};
