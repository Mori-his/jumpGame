import GameStartPanel from './model/startPanel';
import GameLoading from './model/gameLoding';
import GamePlay from './model/gamePlay';
import { GameScore } from './model/gameScore';
import gameState from './controls/gameState';

import './assets/css/ranking-list.css';


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

    let gamePlay;
    let gameScore;
    let gameLoading;
    function start() {
        gameState.playing = true;
        // 开始游戏
        gameLoading = new GameLoading(stage);
        gameLoading.on('loaded', () => {
            const noviceTips = window.localStorage.getItem('noviceTips')
            console.log('noviceTips:', noviceTips)

            gamePlay = new GamePlay(stage, {
              noviceTips: noviceTips !== 'false'
            });
            gamePlay.on('loadProgress', (context, percentage) => {
                gameLoading.toProgress(percentage);
            });
            gamePlay.once('play', () => {
                gameStartPanel.destory();
                gamePlay.run();
            })
        });
        gameLoading.once('play', () => {
            gameLoading.destory();
        })
    }

    gameStartPanel.on('start', () => {
      start();
    });

    gameState.on('gameOver', () => {

      gameScore = new GameScore(stage, {
          loader: gamePlay.loader,
          score: gameState.score
      });

      gameScore.render();
    });
    gameState.on('restart', () => {
      // gamePlay.run();
      window.location.reload()
    })
})
