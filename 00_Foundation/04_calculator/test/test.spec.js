const { add, divide, multiply, subtract, isInt, end_is_op } = require("./test");

describe("add", () => {
  test("add1", () => {
    expect(add(1, 2)).toEqual(3);
  });
  test("add_decimal", () => {
    expect(add(1.1, 2.1)).toEqual(3.2);
  });
  test("not number", () => {
    expect(add("1", "2")).toEqual("12");
  });
});

describe("subtract", () => {
  test("subtract1", () => {
    expect(subtract(5, 1)).toEqual(4);
    expect(subtract(1, 4)).toEqual(-3);
  });
});

describe("multiply", () => {
  test("multiplication", () => {
    expect(multiply(2, 0)).toEqual(0);
    expect(multiply(2, 2)).toEqual(4);
    expect(multiply(2, Infinity)).toEqual(Infinity);
  });
});

describe("division", () => {
  test("divide", () => {
    expect(divide(2, 2)).toEqual(1);
    expect(divide(2, 0)).toEqual(Infinity);
  });
});

describe("check if number is integer", () => {
  test("number is integer", () => {
    expect(isInt(15)).toEqual(true);
    expect(isInt(-5)).toEqual(true);
  });
  test("number is float", () => {
    expect(isInt(15.5)).toEqual(false);
    expect(isInt(-15.5)).toEqual(false);
  });
});

describe("if string end in operator", () => {
  test("string end in operator", () => {
    expect(end_is_op("16+2+")).toEqual(true);
    expect(end_is_op("16+2/")).toEqual(true);
  });
  test("string does not end in operator", () => {
    expect(end_is_op("16+2")).toEqual(false);
    expect(end_is_op("0")).toEqual(false);
  });
});
