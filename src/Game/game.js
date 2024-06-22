import Snake from "./snake";
import radio from "../pubsub";

export class Game {
  constructor(snake = new Snake(true)) {
    this.snake = snake;
    this.score = 0;
    this.hiScore = 0;
    this.fruitCoordinate = [4, 4];
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
      let x = Math.floor(Math.random() * 10);
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
    this.#intervalId = setInterval(() => {
      this.#changeHead();
      this.snake.move();
      if (this.#isHittingWall(this.snake.body[0].coordinate)) {
        this.#gameover();
        return;
      }
      if (this.#isHittingItself(this.snake.body)) {
        this.#gameover();
        return;
      }
      // check if snake ate a fruit
      if (
        this.fruitCoordinate.join() === this.snake.body[0].coordinate.join()
      ) {
        this.snake.addLength();
        this.incrementScore();
        this.generateFruitCoordinate(this.snake.body);
      }
      radio.publish("SnakeMove", [
        this.snake.body[0],
        this.snake.body[this.snake.length - 1],
        this.fruitCoordinate,
      ]);
      this.snake.changeDirection();
    }, 1000);
  }

  stop() {
    clearInterval(this.#intervalId);
  }

  reset() {
    this.stop();
    this.snake = new Snake();
    this.resetScore();
    this.generateFruitCoordinate(this.snake.body);
    this.isGameOver = false;
  }

  restart() {
    this.stop();
    this.reset();
    this.start();
  }

  incrementScore() {
    this.score++;
  }

  resetScore() {
    if (this.hiScore < this.score) {
      this.hiScore = this.score;
    }
    this.score = 0;
  }

  addDirectionQueue(newDirection) {
    this.directionQueue.push(newDirection);
  }

  #changeHead() {
    if (this.directionQueue.length !== 0) {
      this.snake.body[0].direction = this.directionQueue.shift();
    }
  }

  #gameover() {
    this.isGameOver = true;
    this.stop();
  }

  #isHittingWall(coordinate) {
    if (coordinate[0] > 14 || coordinate[0] < 0) return true;
    if (coordinate[1] > 9 || coordinate[1] < 0) return true;
    console.log(coordinate[0]);
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
