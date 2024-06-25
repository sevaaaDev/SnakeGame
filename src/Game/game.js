import Snake from "./snake";
import radio from "../pubsub";

export function initGame() {
  const game = new Game();
  radio.listen("StartGame", game.start.bind(game));
  radio.listen("ChangeDirection", game.addDirectionQueue.bind(game));
}
export class Game {
  constructor(snake = new Snake(true)) {
    this.snake = snake;
    this.score = 0;
    this.hiScore = 0;
    this.fruitCoordinate = [4, 4]; // TODO: randomized this
    this.isGameOver = false;
    this.directionQueue = [];
  }

  #intervalId;

  generateFruitCoordinate(arrayOfBody) {
    let set = new Set();
    for (let body of arrayOfBody) {
      set.add(body.coordinate.join());
    }
    // TODO: find better solution other than looping
    while (true) {
      let x = Math.floor(Math.random() * 15);
      let y = Math.floor(Math.random() * 10);
      let coordinate = [x, y];
      let oldSetSize = set.size;
      set.add(coordinate.join());
      let newSetSize = set.size;
      if (oldSetSize !== newSetSize) {
        this.fruitCoordinate = coordinate;
        return;
      }
    }
  }
  start() {
    // WARN: figure out where and when to render this
    radio.publish("HideMenu");
    radio.publish("ResetBoard");
    radio.publish("FruitRender", this.fruitCoordinate);
    this.#intervalId = setInterval(() => {
      this.#changeHeadDirection();
      this.snake.move();
      if (this.#isHittingWall(this.snake.body[0].coordinate)) {
        this.#gameover();
        return;
      }
      if (this.#isHittingItself(this.snake.body)) {
        this.#gameover();
        return;
      }
      radio.publish("SnakeMove", [
        this.snake.body[0],
        this.snake.body[this.snake.length - 1],
      ]);
      // check if snake ate a fruit
      if (
        this.fruitCoordinate.join() === this.snake.body[0].coordinate.join()
      ) {
        this.snake.addLength();
        this.incrementScore();
        this.generateFruitCoordinate(this.snake.body);
        radio.publish("FruitRender", this.fruitCoordinate);
      }
      // INFO: have new event "FruitRender", so it is separated from snake move
      this.snake.changeDirection();
    }, 300);
  }

  stop() {
    clearInterval(this.#intervalId);
  }

  reset() {
    this.stop();
    this.snake = new Snake(true);
    this.resetScore();
    this.generateFruitCoordinate(this.snake.body);
    this.resetQueue();
    this.isGameOver = false;
  }

  restart() {
    this.stop();
    this.reset();
  }

  resetQueue() {
    this.directionQueue = [];
  }

  incrementScore() {
    this.score++;
    radio.publish("UpdateScore", this.score);
  }

  resetScore() {
    this.score = 0;
    radio.publish("UpdateScore", this.score);
  }

  UpdateHiScore() {
    if (this.hiScore < this.score) {
      this.hiScore = this.score;
    }
    radio.publish("UpdateHiScore", this.hiScore);
  }

  addDirectionQueue(newDirection) {
    let nextDirection = this.snake.body[0].direction;
    if (this.directionQueue.length !== 0) {
      nextDirection = this.directionQueue[this.directionQueue.length - 1];
    }
    if (nextDirection === newDirection) return;
    if (nextDirection === "right" && newDirection === "left") return;
    if (nextDirection === "up" && newDirection === "down") return;
    if (nextDirection === "down" && newDirection === "up") return;
    if (nextDirection === "left" && newDirection === "right") return;
    this.directionQueue.push(newDirection);
  }

  #changeHeadDirection() {
    if (this.directionQueue.length === 0) {
      return;
    }
    let newDirection = this.directionQueue.shift();
    this.snake.body[0].direction = newDirection;
  }

  #gameover() {
    this.isGameOver = true;
    console.log("gameover");
    this.UpdateHiScore();
    this.restart();
    radio.publish("RenderMenu", "Game Over");
  }

  #isHittingWall(coordinate) {
    if (coordinate[0] > 14 || coordinate[0] < 0) return true;
    if (coordinate[1] > 9 || coordinate[1] < 0) return true;
    return false;
  }

  #isHittingItself(arrayOfBody) {
    let set = new Set();
    for (let body of arrayOfBody) {
      let coordinate = body.coordinate.join(",");
      set.add(coordinate);
    }

    if (set.size < arrayOfBody.length) {
      return true;
    }
    return false;
  }
}
