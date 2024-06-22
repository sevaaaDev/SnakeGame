class SnakeBody {
  constructor(direction, coordinate) {
    this.direction = direction;
    this.coordinate = coordinate;
  }
}

export default class Snake {
  constructor(autoLength) {
    this.body = [];
    if (autoLength) {
      this.addLength("right", [3, 0]);
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

  move() {
    for (let snakeBody of this.body) {
      let tmpCoordinate = [...snakeBody.coordinate];
      switch (snakeBody.direction) {
        case "right":
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
      snakeBody.coordinate = [...tmpCoordinate];
    }
  }

  changeDirection() {
    // change direction
    for (let i = this.length - 1; i > 0; i--) {
      this.body[i].direction = this.body[i - 1].direction;
    }
  }

  get length() {
    return this.body.length;
  }
}
