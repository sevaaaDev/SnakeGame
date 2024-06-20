class SnakeBody {
  constructor(direction, coordinate) {
    this.direction = direction;
    this.coordinate = coordinate;
  }
}

class Snake {
  constructor(autoLength) {
    this.body = [];
    if (autoLength) {
      this.addLength([3, 0]);
      for (let i = 0; i < 2; i++) {
        this.addLength();
      }
    }
  }

  addLength(direction, coordinate) {
    if (!direction) {
      direction = this.body[this.length - 1].direction;
    }
    if (!coordinate) {
      coordinate = [...this.body[this.length - 1].coordinate];
      switch (direction) {
        case "right":
          coordinate[0]--;
          break;
        case "left":
          coordinate[0]++;
          break;
        case "up":
          coordinate[1]--;
          break;
        case "down":
          coordinate[1]++;
          break;
      }
    }
    this.body.push(new SnakeBody(direction, coordinate));
  }

  move(fruitCoordinate) {
    for (let snakeBody of this.body) {
      let tmpCoordinate = [...snakeBody.coordinate];
      switch (snakeBody.direction) {
        case "right":
          // TODO: check for wall ,itself, or fruit
          tmpCoordinate[0]++;
          break;
        case "left":
          tmpCoordinate[0]--;
          break;
        case "up":
          tmpCoordinate[1]++;
          break;
        case "down":
          tmpCoordinate[1]--;
          break;
      }
      if (this.#checkForWall(tmpCoordinate)) return "game over";
      if (this.#checkForHittingItself(tmpCoordinate)) return "hitting itself";
      snakeBody.coordinate = [...tmpCoordinate];
    }
    if (
      this.body[0].coordinate[0] === fruitCoordinate[0] &&
      this.body[0].coordinate[1] === fruitCoordinate[1]
    ) {
      // TODO: publish event eat fruit
      this.addLength();
      return "eat fruit";
    }

    // change direction
    for (let i = this.length - 1; i > 0; i--) {
      this.body[i].direction = this.body[i - 1].direction;
    }
  }

  get length() {
    return this.body.length;
  }
  #checkForWall(coordinate) {
    if (coordinate[0] > 9 || coordinate[0] < 0) return true;
    if (coordinate[1] > 9 || coordinate[1] < 0) return true;
    return false;
  }

  #checkForHittingItself(coordinate) {
    for (let snakeBody of this.body) {
      if (
        snakeBody.coordinate[0] === coordinate[0] &&
        snakeBody.coordinate[1] === coordinate[1]
      )
        return true;
    }
    return false;
  }
}

module.exports = Snake;
