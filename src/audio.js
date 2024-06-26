import radio from "./pubsub";
import eatSfxWav from "./sfx/eatSfx.wav";
import hitSfxWav from "./sfx/hit.wav";

export default function initAudio() {
  let eatSfx = new Audio(eatSfxWav);
  let hitSfx = new Audio(hitSfxWav);
  radio.listen("Gameover", hitSfx.play.bind(hitSfx));
  radio.listen("EatFruit", eatSfx.play.bind(eatSfx));
}
