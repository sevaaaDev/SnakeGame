import { Game } from "./Game/game";
import Board from "./UI/board";
import "./UI/style.css";
import radio from "./pubsub";

const board = new Board();
board.render();
const game = new Game();
radio.listen("SnakeMove", board.update);
game.start();
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    game.addDirectionQueue("up");
    return;
  }
  if (e.key === "ArrowDown") {
    game.addDirectionQueue("down");
    return;
  }
  if (e.key === "ArrowRight") {
    game.addDirectionQueue("right");
    return;
  }
  if (e.key === "ArrowLeft") {
    game.addDirectionQueue("left");
    return;
  }
});
