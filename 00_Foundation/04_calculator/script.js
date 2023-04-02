
const theme_slider = document.getElementById("theme-slider");
const body = document.querySelector('body');
const header = document.querySelector(".header");
const display = document.querySelector('.display');
const all_input = document.querySelector("#display-all");
const current_input = document.querySelector('#display-cur-input');
const calculator = document.querySelector('.calculator');
const num_buttons = document.querySelectorAll('.calc-num');
const operation_buttons = document.querySelectorAll(".calc-op");
const num_and_op_btns = document.querySelectorAll("button.calc-op, button.calc-num");
const float_button = document.querySelector(".float");
const del_button = document.querySelector('.calc-del');
const reset_button = document.querySelector('.calc-reset');
const redo_buttons = document.querySelectorAll(".calc-del,.calc-reset");
const equal_button = document.querySelector('.calc-trigger');

let user_input = {
  all_input:"",
  cur_num: "",
  nums: [],
  operation_choice: ""
}

const color_obj = {
  "1": {
    "main_bg": "hsl(222, 26%, 31%)",
    "toggle_bg": "hsl(223, 31%, 20%)",
    "screen_bg": "hsl(224, 36%, 15%)",
    "key_reset_bg": "hsl(225, 21%, 49%)",
    "key_reset_shadow": "hsl(224, 28%, 35%)",
    "key_equal_bg": "hsl(6, 63%, 50%)",
    "key_equal_shadow": "hsl(6, 70%, 34%)",
    "key_num_bg": "hsl(30, 25%, 89%)",
    "key_num_shadow": "hsl(28, 16%, 65%)",
    "text_key": "hsl(221, 14%, 31%)",
    "text_other": "hsl(0, 0%, 100%)",
  },
  "2":{
    "main_bg": "hsl(0, 0%, 90%)",
    "toggle_bg": "hsl(0, 5%, 81%)",
    "screen_bg": "hsl(0, 0%, 93%)",
    "key_reset_bg": "hsl(185, 42%, 37%)",
    "key_reset_shadow": "hsl(185, 58%, 25%)",
    "key_equal_bg": " hsl(25, 98%, 40%)",
    "key_equal_shadow": "hsl(25, 99%, 27%)",
    "key_num_bg": "hsl(45, 7%, 89%)",
    "key_num_shadow": "hsl(35, 11%, 61%)",
    "text_key": "hsl(60, 10%, 19%)",
    "text_other": "#52525b",
  },
  "3":{
    "main_bg": "hsl(268, 75%, 9%)",
    "toggle_bg": "hsl(268, 71%, 12%)",
    "screen_bg": "hsl(224, 36%, 15%)",
    "key_reset_bg": "hsl(281, 89%, 26%)",
    "key_reset_shadow": "hsl(285, 91%, 52%)",
    "key_equal_bg": "hsl(176, 100%, 44%)",
    "key_equal_shadow": "hsl(177, 92%, 70%)",
    "key_num_bg": "hsl(268, 47%, 21%)",
    "key_num_shadow": "hsl(290, 70%, 36%)",
    "text_key": "hsl(52, 100%, 62%)",
    "text_other": "hsl(0, 0%, 100%)",
  }
}

// calculator function
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a, b) => a/b;

const operation_map = new Map();
operation_map.set("+", add);
operation_map.set("-", subtract);
operation_map.set("/", divide);
operation_map.set("x", multiply);

// FUNCTION
const changeTheme = event => {
  const theme_num = event.target.value;
  loadColor(theme_num);
}

const isInt = num => num % 1 == 0;

const end_is_op = input => "+-/x".indexOf(input.charAt(input.length-1)) !== -1 ;

const loadColor = theme_num => {
  body.style.cssText = `background-color:${color_obj[theme_num].main_bg}; color:${color_obj[theme_num].text_other}`;
  header.style.backgroundColor = color_obj[theme_num].main_bg;

  theme_slider.style.backgroundColor = color_obj[theme_num].toggle_bg;
  calculator.style.backgroundColor = color_obj[theme_num].toggle_bg;

  display.style.backgroundColor = color_obj[theme_num].screen_bg;

  // color for calculator button
  num_and_op_btns.forEach(button=> button.style.cssText = `background-color:${color_obj[theme_num].key_num_bg};color:${color_obj[theme_num].text_key}; box-shadow:0 5px ${color_obj[theme_num].key_num_shadow}`);

  redo_buttons.forEach(button=> button.style.cssText = `background-color:${color_obj[theme_num].key_reset_bg};box-shadow:0 5px ${color_obj[theme_num].key_reset_shadow}`);
  equal_button.style.cssText = `background-color:${color_obj[theme_num].key_equal_bg};box-shadow:0 5px ${color_obj[theme_num].key_equal_shadow}`;
}

const operator = (a, b, op_choice, user_input_obj) => {
  const fn = operation_map.get(op_choice);
  let res = fn(Number(a),Number(b));
  user_input_obj.nums.splice(0,2);
  // if number is float, round to 2 decimals
  if (!isInt(res)) res = res.toFixed(2);
  user_input_obj.cur_num = res.toString();

  return user_input_obj;
}

const calculatorListener = (e)=> {
  const class_name = e.target.classList[0]; // or you can use data-type
  const value = e.target.textContent;

  switch(class_name){
    case 'calc-num': 
      if(value === ".") float_button.classList.add('disabled');
      // if all input end in operation ( e.g 11+), then cur_num is re-initialized to empty string, or else continue to add to cur_num
      if( end_is_op(user_input.all_input) ){
        user_input.cur_num = "";
      }
      user_input.all_input += value;
      user_input.cur_num += value;
      break;

    case 'calc-op': // save the current number into nums array. when nums array has 2 numbers, start to do operation, then save the result as first number in the array
      float_button.classList.remove("disabled");
      if( end_is_op(user_input.all_input))return; // if all_input is e.g 2+2+, user can not add another operator
      
      user_input.nums.push(user_input.cur_num);
      if( user_input.nums.length === 2){
        user_input = operator(user_input.nums[0], user_input.nums[1], user_input.operation_choice, user_input);
        user_input.nums.push(user_input.cur_num);
        user_input.all_input = `${user_input.cur_num}`;
      }  
      user_input.all_input += value;
      user_input.operation_choice = value;
      break;

    case 'calc-reset':
      user_input = {
        all_input:"",
        cur_num: "",
        nums: [],
        operations:[]
      }
      float_button.classList.remove("disabled");
      break;

    case 'calc-trigger':// if all_input is 2+2+, then first re-initialize the current number;
    //if all_input is 2+2+2, add current number to num array first and do operation
      if (end_is_op(user_input.all_input)) user_input.cur_num = "";  

      else if(user_input.cur_num.length !== 0){
        user_input.nums.push(user_input.cur_num);    
      }

      if (user_input.nums.length ==2 ){
        user_input = operator(user_input.nums[0], user_input.nums[1], user_input.operation_choice, user_input);
        user_input.operation_choice = "";
        user_input.all_input = user_input.cur_num;
      }else{
        return;
      }   

      break;

    case 'calc-del': // if all_input end in operation, delete operation
      if (user_input.all_input.length === 0)return;
      if (end_is_op(user_input.all_input)) user_input.operation_choice = "";
        // update with operation before or else empty
      else{
        if(user_input.cur_num.length !== 0){
          user_input.cur_num = user_input.cur_num.slice(0,-1);
        }       
      }
      user_input.nums.splice(0,1);
      user_input.all_input = user_input.all_input.substring(0, user_input.all_input.length -1);
      
    default:
      console.log('out');
  }

  all_input.innerHTML = user_input.all_input;
  current_input.innerHTML =  user_input.cur_num;
}

// EVENT TRIGGER
theme_slider.addEventListener('change', changeTheme);

calculator.addEventListener('click', calculatorListener);
calculator.addEventListener('keydown', calculatorListener);

window.onload = () => {
  loadColor(theme_slider.value);
}

