const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a,b) => a * b;

const divide = (a, b) => a/b;

const isInt = num => num % 1 == 0;

const end_is_op = input => "+-/x".indexOf(input.charAt(input.length-1)) !== -1 ;
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  isInt,
  end_is_op
}