const Game = require("../Game/game.js");
const Snake = require("../Game/snake.js");

it("Game hi score ", () => {
  let game = new Game();
  game.incrementScore();
  game.incrementScore();
  game.resetScore();
  expect(game.hiScore).toBe(2);
  expect(game.score).toBe(0);
});

it("Game over hitting wall", () => {
  let snake = new Snake(false);
  snake.addLength("right", [9, 0]);
  snake.addLength("right", [8, 0]);
  snake.addLength("right", [7, 0]);
  let game = new Game(snake);
  game.start();
  expect(game.isGameOver).toBe(true);
});

it("Game over hitting itself", () => {
  let snake = new Snake(false);
  snake.addLength("down", [1, 1]);
  snake.addLength("left", [2, 1]);
  snake.addLength("up", [2, 0]);
  snake.addLength("right", [1, 0]);
  snake.addLength("right", [0, 0]);
  let game = new Game(snake);
  game.start();
  expect(game.isGameOver).toBe(true);
});

it("not game over if circling around", () => {
  let snake = new Snake(false);
  snake.addLength("down", [1, 1]);
  snake.addLength("left", [2, 1]);
  snake.addLength("up", [2, 0]);
  snake.addLength("right", [1, 0]);
  let game = new Game(snake);
  game.start();
  expect(game.isGameOver).toBe(false);
});

it("add length when eating fruit", () => {
  let snake = new Snake(false);
  snake.addLength("up", [4, 0]);
  snake.addLength("right", [3, 0]);
  snake.addLength("right", [2, 0]);
  let game = new Game(snake);
  game.fruitCoordinate = [4, 1];
  game.start();
  expect(snake.length).toBe(4);
  expect(snake.body[3].coordinate[0]).toBe(2);
  expect(snake.body[0].coordinate[1]).toBe(1);
});

it("doesnt generate fruit inside snake body", () => {
  let snake = new Snake(false);
  snake.addLength("right", [4, 0]);
  snake.addLength("right", [2, 0]);
  snake.addLength("right", [1, 0]);
  snake.addLength("right", [0, 0]);
  snake.addLength("right", [0, 1]);
  snake.addLength("right", [1, 1]);
  snake.addLength("right", [2, 1]);
  snake.addLength("right", [3, 1]);
  snake.addLength("right", [4, 1]);
  let game = new Game(snake);
  game.generateFruitCoordinate(snake.body);
});
