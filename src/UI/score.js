import radio from "../pubsub";
export class Score {
  constructor() {}

  render([score, highscore]) {
    const scoreDisplay = document.querySelector(".score");
    const hiScoreDisplay = document.querySelector(".hi-score");
    scoreDisplay.innerText = score;
    hiScoreDisplay.innerText = "Hi score: " + highscore;
  }

  updateScore(score) {
    const scoreDisplay = document.querySelector(".score");
    scoreDisplay.innerText = score;
  }

  updateHiScore(hiScore) {
    const hiScoreDisplay = document.querySelector(".hi-score");
    hiScoreDisplay.innerText = "Hi Score: " + hiScore;
  }
}

export default function initScoreUI() {
  const scoreUi = new Score();
  radio.listen("UpdateScore", scoreUi.updateScore);
  radio.listen("UpdateHiScore", scoreUi.updateHiScore);
  radio.listen("InitRender", scoreUi.render);
}
