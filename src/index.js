import { Game, initGame } from "./Game/game";
import Board, { initBoard } from "./UI/board";
import initScoreUI, { Score } from "./UI/score";
import "./UI/style.css";
import radio from "./pubsub";

initBoard();
initScoreUI();
initGame();
window.addEventListener("load", (e) => {
  radio.publish("RenderBoard");
  radio.publish("RenderScore", [0, 0]);
  radio.publish("RenderMenu", "SnakeGame");
});
document.addEventListener("click", (e) => {
  if (e.target.matches(".menu")) {
    radio.publish("StartGame");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    radio.publish("ChangeDirection", "up");
    return;
  }
  if (e.key === "ArrowDown") {
    radio.publish("ChangeDirection", "down");
    return;
  }
  if (e.key === "ArrowRight") {
    radio.publish("ChangeDirection", "right");
    return;
  }
  if (e.key === "ArrowLeft") {
    radio.publish("ChangeDirection", "left");
    return;
  }
});
