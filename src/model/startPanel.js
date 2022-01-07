import { loadFiles } from "../utils/loadQueue";

class HomeBackground extends createjs.Bitmap {
    constructor({
        imageOrUrl,
        x,
        y
    }) {
        super(imageOrUrl);
        this.x = x || 0;
        this.y = y || 0;

        this.scaleX = 0.5;
        this.scaleY = 0.5;
        this.imageWidget = this.image.width * 0.5;
        this.imageHeight = this.image.height * 0.5;
    }
}

export default class GameStartPanel {
    sources = [
        {
            id: 'mainPng',
            src: require('/src/assets/images/main.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'dkPng',
            src: require('/src/assets/images/start_button.png').default,
            type: createjs.Types.IMAGE
        },
    ]
    constructor(stage) {
        this.stage = stage;
        this.loadSource();
    }

    sourceComplete(event, loader) {
        this.container = new createjs.Container();
        this.homeBG = new HomeBackground({
            imageOrUrl: loader.getResult('mainPng')
        });
        this.startBtn = new createjs.Bitmap(loader.getResult('dkPng'));
        this.startBtn.scale = 0.5
        this.startBtn.x = (this.homeBG.imageWidget - this.startBtn.image.width * 0.5) / 2;
        this.startBtn.y = this.homeBG.imageHeight - this.startBtn.image.height * 0.5;
        this.container.addChild(
            this.homeBG,
            this.startBtn
        );
        this.stage.addChild(this.container);
        this.stage.update();
        this.stage.addEventListener('stagemousedown', this.handleMouseDown.bind(this));
    }
    handleMouseDown() {
        createjs.Tween.get(this.startBtn, { override: true })
            .to({
                    y: this.startBtn.y - 60,
                    rotation: -10
                },
                500,
                createjs.Ease.getPowOut(2)
            ).to({
                    y: this.homeBG.imageHeight + this.startBtn.image.height * 0.5,
                    rotation: 30
                },
                1500,
                createjs.Ease.getPowIn(2)
            ).call(this.gameOver.bind(this));
    }
    gameOver() {
        console.log('结束了', this)
        this.container.removeChild(this.startBtn);
    }
    loadSource() {
        this.loader = loadFiles(this.sources, this.sourceComplete.bind(this));
    }

}




