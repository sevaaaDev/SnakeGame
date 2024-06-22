export default class Board {
  constructor() {}
  render(data) {
    const board = document.querySelector(".board");
    for (let y = 9; y >= 0; y--) {
      for (let x = 0; x < 15; x++) {
        const div = document.createElement("div");
        div.setAttribute("data-x", x);
        div.setAttribute("data-y", y);
        board.append(div);
      }
    }
  }
  update([head, tail]) {
    const headDiv = document.querySelector(
      `.board div[data-x="${head.coordinate[0]}"][data-y="${head.coordinate[1]}"]`,
    );
    headDiv.classList.add("snake");
    const tailDivCoordinate = [...tail.coordinate];
    switch (tail.direction) {
      case "right":
        tailDivCoordinate[0]--;
        break;
      case "left":
        tailDivCoordinate[0]++;
        break;
      case "up":
        tailDivCoordinate[1]--;
        break;
      case "down":
        tailDivCoordinate[1]++;
        break;
    }
    const tailDivPrevous = document.querySelector(
      `.board div[data-x="${tailDivCoordinate[0]}"][data-y="${tailDivCoordinate[1]}"]`,
    );
    tailDivPrevous.classList.remove("snake");
  }
}