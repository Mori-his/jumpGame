import gameState from "../controls/gameState";
import { loadFiles } from "../utils/loadQueue";


const font = 'Microsoft YaHei'

export class GameScore {

    constructor(stage, options = {}) {
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
        btnShare.x = (this.stage.canvas.width - btnShare.image.width) / 2 + 5;
        btnShare.y = btnRestart.y - btnShare.image.height - 13;

        btnRestart.addEventListener('click', () => {
          gameState.restart();
        })

        const overQuotes1 = new createjs.Bitmap(loader.getResult('overQuotes1'))
        const overQuotes2 = new createjs.Bitmap(loader.getResult('overQuotes2'))
        overQuotes1.x = (this.stage.canvas.width - overQuotes1.image.width) / 2;
        overQuotes2.x = (this.stage.canvas.width - overQuotes2.image.width) / 2;
        overQuotes1.y = btnShare.y - overQuotes1.image.height - 48;
        overQuotes2.y = btnShare.y - overQuotes2.image.height - 30;


        const scorePanel = new createjs.Bitmap(loader.getResult('scorePanel'));
        scorePanel.x = (this.stage.canvas.width - scorePanel.image.width) / 2;
        scorePanel.y = btnShare.y - scorePanel.image.height - 136;

        const scoreTitle = new createjs.Text('恭喜!', `bold 32px ${font}`, '#fff');
        scoreTitle.x = scorePanel.x + 101;
        scoreTitle.y = scorePanel.y + 35;
        const scoreTitle1 = new createjs.Text('你的滑雪距离是', `bold 20px ${font}`, '#fff');
        scoreTitle1.x = scorePanel.x + 65;
        scoreTitle1.y = scorePanel.y + 77;
        const scoreNum = new createjs.Text(`${this.score}米`, `bold 56px ${font}`, '#fff');
        scoreNum.lineHeight = 81;
        const { width } = scoreNum.getBounds();
        scoreNum.x = (this.stage.canvas.width - width) / 2;
        scoreNum.y = scorePanel.y + 108;



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
            overQuotes2,
            overQuotes1,
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
