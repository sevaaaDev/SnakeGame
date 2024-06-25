import radio from "../pubsub";
class Button {
  constructor() {
    this.buttonGrid = document.querySelector(".button-container");
    this.buttonGrid.onclick = this.handler.bind(this);
  }

  hide() {
    const buttonGrid = document.querySelector(".button-container");
    buttonGrid.classList.add("invisible");
  }
  show() {
    const buttonGrid = document.querySelector(".button-container");
    buttonGrid.classList.remove("invisible");
  }

  handler(e) {
    if (e.target.matches(".button")) {
      radio.publish("ChangeDirection", e.target.dataset.direction);
    }
  }
}

class Keys {
  constructor() {}

  listen() {
    document.addEventListener("keydown", this.handler);
  }

  removeListener() {
    document.removeEventListener("keydown", this.handler);
  }

  handler(e) {
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
  }
}

export default function initButton() {
  const btn = new Button();
  const keys = new Keys();
  radio.listen("StartGame", btn.show);
  radio.listen("RenderMenu", btn.hide);
  radio.listen("StartGame", keys.listen.bind(keys));
  radio.listen("RenderMenu", keys.removeListener.bind(keys));
}
