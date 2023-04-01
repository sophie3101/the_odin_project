// default values
var values = {
  grid_num: 16,
  color:  "#475569",
  grid_initial_clr: "#fafafa",
  color_choice: "solid_color"
}

// functions 
const display_range = num => {
  label_range_picker.innerText = `${num}x${num}`;
  range_picker.value = num;
}

const update_color_picker = clr => {
  color_picker.value = clr;
}

function update_small_grid_color(e){
  let color = values.color;
  if(values.color_choice !== "solid_color"){
    color = "#"+Math.floor(Math.random()*16777215).toString(16);
  }
  e.target.style.cssText = `background:${color}`;
}

const create_grid = num => {
  
  grid_div.style.cssText = `display:grid; grid-template:repeat(${num}, 1fr)/repeat(${num}, 1fr); background-color:${values.grid_initial_clr}`
}

const add_square_to_grid = num => {
  grid_div.innerHTML = "";
  console.log('grid', num)
  for (let i=0; i<num*num;i++){
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener('mouseover', update_small_grid_color)
    grid_div.appendChild(square);
  }
}

const reset = () => {
  values.grid_num = 16;
  values.color = "#475569"
  values.color_choice = "solid_color"
  create_grid(values.grid_num);
  add_square_to_grid(values.grid_num);
  display_range(values.grid_num);
  update_color_picker(values.color);
}

// declar valirable
const grid_div = document.querySelector(".grid");
const range_picker = document.getElementById('range-picker'); 
const label_range_picker = document.querySelector("label[for='range-picker']");
const color_picker = document.getElementById("color-picker");
const reset_btn = document.getElementById("reset-btn");
const erase_btn = document.getElementById("erase-btn");
const random_clr_btn = document.getElementById("random-clr-btn");
// const squares = document.querySelectorAll('.square');

//when user select random color:
random_clr_btn.addEventListener('click', (e) => {
  values.color_choice = "random";
});
// when user hits reset
reset_btn.addEventListener('click', reset );
// when user erase
erase_btn.addEventListener('click', (e) => {
  console.log(e.target)
})
// when user change color 
color_picker.addEventListener('change', event => {
  values.color = event.target.value;
  console.log(values)
})
//when user changes grid range size
range_picker.addEventListener('mousemove', (e) => {
  values.grid_num = e.target.value;
  display_range(values.grid_num);
})

range_picker.addEventListener('change', (e) => {
  values.grid_num = e.target.value;
  create_grid(values.grid_num);
  add_square_to_grid(values.grid_num);
})

window.onload = () => {
  reset();
}