import GameStartPanel from './model/startPanel';
import GameLoading from './model/gameLoding';
import GamePlay from './model/gamePlay';
import { GameScore } from './model/gameScore';
import gameState from './controls/gameState';

import './assets/css/ranking-list.css';

// ranking-list
import { renderRankingList, save } from './utils/ranking-list'

// 调用示例
// setTimeout(() => {
//   console.log('查询成绩，执行了')
//   renderRankingList(500, 0)
// }, 20)
// 调用示例
// setTimeout(() => {
//   console.log('保存成绩，执行了')
//   save(parseInt(475 * (Math.random() + 0)))
// }, 1000)

window.addEventListener('load', function() {
    const maxWidth = 375;
    const maxHeight = 812;
    const stage = new createjs.Stage('mainCanvas');

    stage.canvas.width = window.innerWidth
    stage.canvas.height = window.innerHeight
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
      // 上传本次分数
      save(gameState.score);

      gameScore.render();
      // 查看排行榜
      gameScore.once('viewRanking', () => {
        renderRankingList(gameState.score, gamePlay.selectRoleType)
      });
    });
    gameState.on('restart', () => {
      // gamePlay.run();
      window.location.reload()
    })
})
