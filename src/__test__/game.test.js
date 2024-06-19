const Game = require("../Game/game.js");
const Snake = require("../Game/snake.js");

it("Game score increment", () => {
  let game = new Game();
  game.incrementScore();
  expect(game.score).toBe(1);
});

it("Game hi score ", () => {
  let game = new Game();
  game.incrementScore();
  game.incrementScore();
  game.resetScore();
  expect(game.highestScore).toBe(2);
  expect(game.score).toBe(0);
});
