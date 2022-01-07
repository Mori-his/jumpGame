import { EventEmitter } from "events";
import { loadFiles } from "../utils/loadQueue";

export default class GamePlay extends EventEmitter {
    source = [
        {
            id: 'background',
            src: require('/src/assets/images/game_background.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'woods',
            src: require('/src/assets/images/woods.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'snow',
            src: require('/src/assets/images/snow.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'hand',
            src: require('/src/assets/images/hand.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'leftArrow',
            src: require('/src/assets/images/left_arrow.png').default,
            type: createjs.Types.IMAGE
        },
        
    ];
    constructor(stage) {
        super();
        this.stage = stage;
        this.container = new createjs.Container();
        this.loadSource();
    }

    sourceComplete(event, loader) {
        
        this.renderTips(loader);
    }

    renderTips(loader) {
        const tipsContainer = new createjs.Container();
        
        const backgroundAlpha = new createjs.Shape();
        backgroundAlpha.graphics.beginFill('rgba(0, 0, 0, 0.7)').drawRect(
            0,
            0,
            this.stage.canvas.width,
            this.stage.canvas.height,
        );
        // 雪花对象
        const snow1 = new createjs.Bitmap(loader.getResult('snow'));
        const snow2 = new createjs.Bitmap(loader.getResult('snow'));
        const snow3 = new createjs.Bitmap(loader.getResult('snow'));
        const snow4 = new createjs.Bitmap(loader.getResult('snow'));
        
        snow1.x = 73;
        snow1.y = 175;
        snow2.x = 290;
        snow2.y = 223;
        snow3.x = 272;
        snow3.y = 66;
        snow4.x = 52;
        snow4.y = 389;
        
        const arrowLeft = new createjs.Bitmap(loader.getResult('leftArrow'));
        const arrowRight = new createjs.Bitmap(loader.getResult('leftArrow'));
        const hand = new createjs.Bitmap(loader.getResult('hand'));

        arrowLeft.x = this.stage.canvas.width / 2 - 37.5 - arrowLeft.image.width;
        arrowLeft.y = (this.stage.canvas.height - arrowLeft.image.height) - 185;
        arrowRight.x = this.stage.canvas.width / 2 + arrowLeft.image.width + 37.5;
        arrowRight.y = this.stage.canvas.height - 185;
        arrowRight.rotation = 180;
        hand.x = (this.stage.canvas.width - hand.image.width) / 2;
        hand.y = (this.stage.canvas.height - arrowLeft.image.height) - 200;

    
        tipsContainer.addChild(
            backgroundAlpha,
            snow1,
            snow2,
            snow3,
            snow4,
            arrowLeft,
            arrowRight,
            hand,
        );
        this.stage.addChild(tipsContainer);
    }

    showTips() {
        this.stage.update();
    }

    loadSource() {
        this.loader = loadFiles(
            this.source,
            this.sourceComplete.bind(this),
            this.loadProcess.bind(this)
        );
    }

    loadProcess(percentage) {
        console.log(percentage);
        this.emit('loadProcess', this, percentage);
    }


    
}
