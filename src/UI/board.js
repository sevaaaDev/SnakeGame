export default class Board {
  constructor() {}
  render() {
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
  renderMenu(title) {
    const menu = document.querySelector(".menu");
    const board = document.querySelector(".board");
    board.classList.add("transparent");
    menu.classList.remove("invisible");
    const menuTitle = document.querySelector(".menu .title");
    menuTitle.innerText = title;
  }
  hideMenu() {
    const board = document.querySelector(".board");
    const menu = document.querySelector(".menu");
    menu.classList.add("invisible");
    board.classList.remove("transparent");
  }
  updateFruit(fruit) {
    const fruitDiv = document.querySelector(
      `.board div[data-x="${fruit[0]}"][data-y="${fruit[1]}"]`,
    );
    fruitDiv.classList.add("fruit");
  }
  update([head, tail]) {
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
    // fix snake head got removed because it was the prev tail coordinate
    const headDiv = document.querySelector(
      `.board div[data-x="${head.coordinate[0]}"][data-y="${head.coordinate[1]}"]`,
    );
    headDiv.classList.add("snake");
    headDiv.classList.remove("fruit");
  }
}
