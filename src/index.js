import GameStartPanel from './model/startPanel';

const maxWidth = 375;
const maxHeight = 812;
const stage = new createjs.Stage('mainCanvas');

stage.canvas.width = Math.min(window.innerWidth, maxWidth)
stage.canvas.height = Math.min(window.innerHeight, maxHeight)

createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', stage);
new GameStartPanel(stage)
