(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var i=e.g.document;if(!t&&i&&(i.currentScript&&(t=i.currentScript.src),!t)){var r=i.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&(!t||!/^http(s?):/.test(t));)t=r[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();class t{constructor(e,t){this.direction=e,this.coordinate=t}}class i{constructor(e){if(this.body=[],e){this.addLength("right",[3,0]);for(let e=0;e<2;e++)this.addLength()}}addLength(e,i){if(e||(e=this.body[this.length-1].direction),!i)switch(i=[...this.body[this.length-1].coordinate],e){case"right":i[0]--;break;case"left":i[0]++;break;case"up":i[1]--;break;case"down":i[1]++}this.body.push(new t(e,i))}move(){for(let e of this.body){let t=[...e.coordinate];switch(e.direction){case"right":t[0]++;break;case"left":t[0]--;break;case"up":t[1]++;break;case"down":t[1]--}e.coordinate=[...t]}}changeDirection(){for(let e=this.length-1;e>0;e--)this.body[e].direction=this.body[e-1].direction}get length(){return this.body.length}}const r=new class{constructor(){this.listener={}}listen(e,t){this.listener[e]?this.listener[e].push(t):this.listener[e]=[t]}publish(e,t){this.listener[e]&&this.listener[e].forEach((e=>e(t)))}};class n{constructor(e=new i(!0)){this.snake=e,this.score=0,this.hiScore=0,this.fruitCoordinate=[4,4],this.isGameOver=!1,this.directionQueue=[]}#e;generateFruitCoordinate(e){let t=new Set;for(let i of e)t.add(i.coordinate.join());for(;;){let e=[Math.floor(15*Math.random()),Math.floor(10*Math.random())],i=t.size;if(t.add(e.join()),i!==t.size)return void(this.fruitCoordinate=e)}}start(){r.publish("HideMenu"),r.publish("ResetBoard"),r.publish("FruitRender",this.fruitCoordinate),this.#e=setInterval((()=>{this.#t(),this.snake.move(),this.#i(this.snake.body[0].coordinate)||this.#r(this.snake.body)?this.#n():(r.publish("SnakeMove",[this.snake.body[0],this.snake.body[this.snake.length-1]]),this.fruitCoordinate.join()===this.snake.body[0].coordinate.join()&&(this.snake.addLength(),this.incrementScore(),this.generateFruitCoordinate(this.snake.body),r.publish("FruitRender",this.fruitCoordinate),r.publish("EatFruit")),this.snake.changeDirection())}),300)}stop(){clearInterval(this.#e)}reset(){this.stop(),this.snake=new i(!0),this.resetScore(),this.generateFruitCoordinate(this.snake.body),this.resetQueue(),this.isGameOver=!1}restart(){this.stop(),this.reset()}resetQueue(){this.directionQueue=[]}incrementScore(){this.score++,r.publish("UpdateScore",this.score)}resetScore(){this.score=0,r.publish("UpdateScore",this.score)}storeHiScoreToLocalStorage(){localStorage.setItem("HighScore",this.hiScore)}getHiScoreFromLocalStorage(){this.hiScore=+localStorage.getItem("HighScore"),r.publish("UpdateHiScore",this.hiScore)}UpdateHiScore(){this.hiScore<this.score&&(this.hiScore=this.score,r.publish("UpdateHiScore",this.hiScore),this.storeHiScoreToLocalStorage())}addDirectionQueue(e){let t=this.snake.body[0].direction;0!==this.directionQueue.length&&(t=this.directionQueue[this.directionQueue.length-1]),t!==e&&("right"===t&&"left"===e||"up"===t&&"down"===e||"down"===t&&"up"===e||"left"===t&&"right"===e||this.directionQueue.push(e))}#t(){if(0===this.directionQueue.length)return;let e=this.directionQueue.shift();this.snake.body[0].direction=e}#n(){this.isGameOver=!0,this.UpdateHiScore(),this.restart(),r.publish("Gameover"),r.publish("RenderMenu",["Game Over","Play again"])}#i(e){return e[0]>14||e[0]<0||e[1]>9||e[1]<0}#r(e){let t=new Set;for(let i of e){let e=i.coordinate.join(",");t.add(e)}return t.size<e.length}}class s{constructor(){}render(){const e=document.querySelector(".board");for(let t=9;t>=0;t--)for(let i=0;i<15;i++){const r=document.createElement("div");r.setAttribute("data-x",i),r.setAttribute("data-y",t),e.append(r)}}reset(){const e=document.querySelector(".fruit"),t=document.querySelectorAll(".snake");e&&e.classList.remove("fruit"),t&&t.forEach((e=>e.classList.remove("snake")))}renderMenu([e,t]){const i=document.querySelector(".menu");document.querySelector(".board").classList.add("transparent"),i.classList.remove("invisible"),document.querySelector(".menu .title").innerText=e,document.querySelector(".menu .blinking-text").innerText=t}hideMenu(){const e=document.querySelector(".board");document.querySelector(".menu").classList.add("invisible"),e.classList.remove("transparent")}updateFruit(e){document.querySelector(`.board div[data-x="${e[0]}"][data-y="${e[1]}"]`).classList.add("fruit")}update([e,t]){const i=[...t.coordinate];switch(t.direction){case"right":i[0]--;break;case"left":i[0]++;break;case"up":i[1]--;break;case"down":i[1]++}document.querySelector(`.board div[data-x="${i[0]}"][data-y="${i[1]}"]`).classList.remove("snake");const r=document.querySelector(`.board div[data-x="${e.coordinate[0]}"][data-y="${e.coordinate[1]}"]`);r.classList.add("snake"),r.classList.remove("fruit")}}class o{constructor(){this.buttonGrid=document.querySelector(".button-container"),this.buttonGrid.onclick=this.handler.bind(this)}hide(){document.querySelector(".button-container").classList.add("invisible")}show(){document.querySelector(".button-container").classList.remove("invisible")}handler(e){let t=e.target.closest(".button");t&&r.publish("ChangeDirection",t.dataset.direction)}}class a{constructor(){}listen(){document.addEventListener("keydown",this.handler)}removeListener(){document.removeEventListener("keydown",this.handler)}handler(e){"ArrowUp"!==e.key?"ArrowDown"!==e.key?"ArrowRight"!==e.key?"ArrowLeft"!==e.key||r.publish("ChangeDirection","left"):r.publish("ChangeDirection","right"):r.publish("ChangeDirection","down"):r.publish("ChangeDirection","up")}}class c{constructor(){}render([e,t]){const i=document.querySelector(".score"),r=document.querySelector(".hi-score");i.innerText=e,r.innerText="Hi score: "+t}updateScore(e){document.querySelector(".score").innerText=e}updateHiScore(e){document.querySelector(".hi-score").innerText="Hi Score: "+e}}const d=e.p+"1945e74b86d4e3d80ad9.wav",h=e.p+"3b4d4487e0e457194d35.wav";!function(){const e=new s;r.listen("InitRender",e.render),r.listen("SnakeMove",e.update),r.listen("FruitRender",e.updateFruit),r.listen("RenderMenu",e.renderMenu),r.listen("HideMenu",e.hideMenu),r.listen("ResetBoard",e.reset)}(),function(){const e=new c;r.listen("UpdateScore",e.updateScore),r.listen("UpdateHiScore",e.updateHiScore),r.listen("InitRender",e.render)}(),function(){const e=new n;r.listen("InitRender",e.getHiScoreFromLocalStorage.bind(e)),r.listen("StartGame",e.start.bind(e)),r.listen("ChangeDirection",e.addDirectionQueue.bind(e))}(),function(){const e=new o,t=new a;r.listen("StartGame",e.show),r.listen("RenderMenu",e.hide),r.listen("StartGame",t.listen.bind(t)),r.listen("RenderMenu",t.removeListener.bind(t))}(),function(){let e=new Audio(d),t=new Audio(h);r.listen("Gameover",t.play.bind(t)),r.listen("EatFruit",e.play.bind(e))}(),window.addEventListener("load",(e=>{r.publish("InitRender",[0,0]),r.publish("RenderMenu",["SnakeGame","Start"])})),document.addEventListener("click",(e=>{e.target.closest(".menu")&&r.publish("StartGame")}))})();