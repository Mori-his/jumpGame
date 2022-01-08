import GameStartPanel from './model/startPanel';
import State from './controls/gameState'
import GameLoading from './model/gameLoding';
import GamePlay from './model/gamePlay';

const maxWidth = 375;
const maxHeight = 812;
const stage = new createjs.Stage('mainCanvas');

stage.canvas.width = Math.min(window.innerWidth, maxWidth)
stage.canvas.height = Math.min(window.innerHeight, maxHeight)

createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', stage);
const gameStartPanel = new GameStartPanel(stage);


gameStartPanel.on('start', () => {
    State.playing = true;
    // 开始游戏
    const gameLoading = new GameLoading(stage);
    let gamePlay;
    gameLoading.on('loaded', () => {
        gamePlay = new GamePlay(stage);
        gamePlay.on('loadProgress', (context, percentage) => {
            gameLoading.toProgress(percentage);
        });
    });

    gameLoading.on('play', () => {
        gameStartPanel.destory();
        gameLoading.destory();
        gamePlay.run();
    });
})


