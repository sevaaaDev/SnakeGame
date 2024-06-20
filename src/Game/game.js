const Snake = require("./snake");
class Game {
  constructor(snake = new Snake()) {
    this.snake = snake;
    this.score = 0;
    this.hiScore = 0;
    this.fruitCoordinate = [0, 0];
    this.isGameOver = false;
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
      this.snake.move();
      if (this.#isHittingWall(this.snake.body[0].coordinate)) {
        this.#gameover();
      }
      if (this.#isHittingItself(this.snake.body)) {
        this.#gameover();
      }
      if (
        this.fruitCoordinate.join() === this.snake.body[0].coordinate.join()
      ) {
        this.snake.addLength();
        this.incrementScore();
        this.generateFruitCoordinate(this.snake.body);
      }
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

  #gameover() {
    this.isGameOver = true;
  }

  #isHittingWall(coordinate) {
    if (coordinate[0] > 9 || coordinate[0] < 0) return true;
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

module.exports = Game;
