import GameStartPanel from './model/startPanel';


const stage = new createjs.Stage('mainCanvas');
createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', stage);
new GameStartPanel(stage)
