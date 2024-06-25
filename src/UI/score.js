import radio from "../pubsub";
export class Score {
  constructor() {}

  render([score, highscore]) {
    const scoreWrapper = document.querySelector(".score-wrapper");
    const scoreDisplay = document.createElement("p");
    const hiScoreDisplay = document.createElement("p");
    scoreDisplay.classList.add("score");
    hiScoreDisplay.classList.add("hi-score");
    scoreDisplay.innerText = score;
    hiScoreDisplay.innerText = "Hi score: " + highscore;
    scoreWrapper.append(scoreDisplay);
    scoreWrapper.append(hiScoreDisplay);
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
