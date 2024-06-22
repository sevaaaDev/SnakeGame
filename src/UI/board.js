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
}
