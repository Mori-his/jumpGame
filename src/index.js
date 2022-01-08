import GameStartPanel from './model/startPanel';
import State from './controls/gameState'
import GameLoading from './model/gameLoding';
import GamePlay from './model/gamePlay';
import { GameScore } from './model/gameScore';
import WeightsAlgorithm from './model/weightsAlgorithm';


window.addEventListener('load', function() {
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
        let gameScore;
        gameLoading.on('loaded', () => {
            gamePlay = new GamePlay(stage);
            gamePlay.on('loadProgress', (context, percentage) => {
                gameLoading.toProgress(percentage);
            });
        });
    
        gameLoading.on('play', () => {
            gameStartPanel.destory();
            gameLoading.destory();
            gameScore = new GameScore(stage, {
                loader: gamePlay.loader,
            })
            gamePlay.run();
            const weightMatrix = new WeightsAlgorithm(stage, {
                row: 5,
                column: 3,
                loader: gamePlay.loader
            });
            console.log(weightMatrix);
            // gameScore.render();
        });
    })
})



