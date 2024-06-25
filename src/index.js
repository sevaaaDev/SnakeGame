import { initGame } from "./Game/game";
import { initBoard } from "./UI/board";
import initButton from "./UI/button";
import initScoreUI from "./UI/score";
import "./UI/style.css";
import radio from "./pubsub";

initBoard();
initScoreUI();
initGame();
initButton();
window.addEventListener("load", (e) => {
  radio.publish("InitRender", [0, 0]);
  radio.publish("RenderMenu", ["SnakeGame", "Start"]);
});
document.addEventListener("click", (e) => {
  if (e.target.closest(".menu")) {
    radio.publish("StartGame");
  }
});
