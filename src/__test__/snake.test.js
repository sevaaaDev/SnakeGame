const Snake = require("../Game/snake.js");

it("add length", () => {
  let snake = new Snake();
  snake.addLength("right", [3, 0]);
  expect(snake.length).toBe(1);
});

it("move", () => {
  let snake = new Snake();
  snake.addLength("up", [3, 0]);
  snake.addLength("right", [2, 0]);
  snake.addLength("right", [1, 0]);
  snake.move([0, 0]);
  expect(snake.body[1].direction).toBe("up");
  expect(snake.body[1].coordinate[0]).toBe(3);
});

it("hit a wall", () => {
  let snake = new Snake();
  snake.addLength("right", [9, 0]);
  snake.addLength("right", [8, 0]);
  snake.addLength("right", [7, 0]);
  expect(snake.move([0, 0])).toBe("game over");
});

it("hit a itself", () => {
  let snake = new Snake();
  snake.addLength("down", [1, 1]);
  snake.addLength("left", [2, 1]);
  snake.addLength("up", [2, 0]);
  snake.addLength("right", [1, 0]);
  expect(snake.move([0, 0])).toBe("hitting itself");
});
it("automatically add length when hit fruit", () => {
  let snake = new Snake();
  snake.addLength("up", [3, 0]);
  snake.addLength("right", [2, 0]);
  snake.addLength("right", [1, 0]);
  expect(snake.move([3, 1])).toBe("eat fruit");
  expect(snake.length).toBe(4);
  expect(snake.body[3].coordinate[0]).toBe(1);
  expect(snake.body[3].direction).toBe("right");
});
