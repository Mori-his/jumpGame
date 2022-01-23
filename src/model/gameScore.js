import { EventEmitter } from 'events';
import gameState from "../controls/gameState";


const font = 'Microsoft YaHei'

export class GameScore extends EventEmitter {

    constructor(stage, options = {}) {
        super();
        this.stage = stage;
        this.loader = options.loader
        this.score = options.score || 0;
        this.container = new createjs.Container();
        this.sourceComplete();
    }


    sourceComplete() {
        const loader = this.loader;
        this.backgroundAlpha = new createjs.Shape();
        this.backgroundAlpha.graphics.beginFill('rgba(0, 0, 0, 0.7)').drawRect(
            0,
            0,
            this.stage.canvas.width,
            this.stage.canvas.height,
        );
        this.backgroundAlpha.addEventListener('click', () => {});

        const light = new createjs.Bitmap(loader.getResult('light'));
        light.x = 0;
        light.y = 110;

        this.scorePanelContainer = new createjs.Container();

        const btnShare = new createjs.Bitmap(loader.getResult('btnShare'));
        const btnRestart = new createjs.Bitmap(loader.getResult('btnRestart'));
        btnRestart.x = (this.stage.canvas.width - btnRestart.image.width) / 2;
        btnRestart.y = this.stage.canvas.height - btnRestart.image.height - 69;
        btnShare.x = (this.stage.canvas.width - btnShare.image.width) / 2;
        btnShare.y = btnRestart.y - btnShare.image.height - 13;

        btnRestart.addEventListener('click', () => {
          gameState.restart();
        })

        let overQuotes = ''

        if (parseInt(Math.random() * 10) % 2) {
          overQuotes = new createjs.Bitmap(loader.getResult('overQuotes1'))
          overQuotes.x = (this.stage.canvas.width - overQuotes.image.width) / 2;
          overQuotes.y = btnShare.y - overQuotes.image.height - 20;
        } else {
          overQuotes = new createjs.Bitmap(loader.getResult('overQuotes2'))
          overQuotes.x = (this.stage.canvas.width - overQuotes.image.width) / 2;
          overQuotes.y = btnShare.y - overQuotes.image.height - 20;
        }

        const self = this;
        btnShare.addEventListener('click', function btnClick() {
            self.emit('viewRanking');
            btnShare.removeAllEventListeners('click');
        });

        const scorePanel = new createjs.Bitmap(loader.getResult('scorePanel'));
        scorePanel.x = (this.stage.canvas.width - scorePanel.image.width) / 2;
        scorePanel.y = btnShare.y - scorePanel.image.height - 136;

        const scoreTitle = new createjs.Text('恭喜!', `bold 32px ${font}`, '#fff');
        scoreTitle.x = scorePanel.x + 125;
        scoreTitle.y = scorePanel.y + 125;
        const scoreTitle1 = new createjs.Text('你的滑雪距离是', `bold 20px ${font}`, '#fff');
        scoreTitle1.x = scorePanel.x + 85;
        scoreTitle1.y = scorePanel.y + 167;
        const scoreNum = new createjs.Text(`${this.score}`, `bold 56px ${font}`, '#fff');
        scoreNum.lineHeight = 81;
        const { width } = scoreNum.getBounds();
        scoreNum.x = (this.stage.canvas.width - width) / 2;
        scoreNum.y = scorePanel.y + 198;



        this.scorePanelContainer.addChild(
            light,
            scorePanel,
            scoreTitle,
            scoreTitle1,
            scoreNum,
        );




        this.container.addChild(
            this.backgroundAlpha,
            this.scorePanelContainer,
            overQuotes,
            btnRestart,
            btnShare
        )

    }


    render() {
        this.stage.addChild(this.container);
        this.stage.update();
    }

    destory() {
        this.backgroundAlpha.removeAllEventListeners('click');
    }

}
