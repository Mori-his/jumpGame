import { loadFiles } from "../utils/loadQueue";
import { scaleTarget } from "../utils/tool";
import { EventEmitter } from 'events';

class HomeBackground extends createjs.Bitmap {
    constructor({
        imageOrUrl,
        x,
        y
    }) {
        super(imageOrUrl);
        this.x = x || 0;
        this.y = y || 0;
        this.imageWidth = this.image.width;
        this.imageHeight = this.image.height;
    }
}

export default class GameStartPanel extends EventEmitter {
    source = [
        {
            id: 'mainPng',
            src: require('/src/assets/images/start_background.jpg').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'startBtn',
            src: require('/src/assets/images/start_btn.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'iceRole',
            src: require('/src/assets/images/ice_role.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'snowRole',
            src: require('/src/assets/images/snow_role.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'startTips1',
            src: require('/src/assets/images/start_tips_1.png').default,
            type: createjs.Types.IMAGE
        },
    ]
    constructor(stage) {
        super();
        this.stage = stage;
        this.container = new createjs.Container();
        this.loadSource();
    }

    sourceComplete(event, loader) {
        this.homeBG = new HomeBackground({
            imageOrUrl: loader.getResult('mainPng')
        });

        const canvasRect = {
            width: this.stage.canvas.width,
            height: this.stage.canvas.height,
        }
        const scale = scaleTarget({
            width: this.homeBG.image.width,
            height: this.homeBG.image.height,
        }, canvasRect);

        this.homeBG.scaleX = scale.scaleX;
        this.homeBG.scaleY = scale.scaleY;

        this.startTips1 = new createjs.Bitmap(loader.getResult('startTips1'));
        this.startTips1.scale = 0.5;
        this.startTips1.x = (canvasRect.width - this.startTips1.image.width * 0.5) / 2;
        this.startTips1.y = canvasRect.height - this.startTips1.image.height * 0.5 - 120;

        this.startBtn = new createjs.Bitmap(loader.getResult('startBtn'));
        this.startBtn.x = (canvasRect.width - this.startBtn.image.width) / 2;
        this.startBtn.y = canvasRect.height - this.startBtn.image.height - 49;
        this.startBtn.addEventListener('click', () => {
            this.emit('start', this);
        });

        this.iceRole = new createjs.Bitmap(loader.getResult('iceRole'));
        this.iceRole.scale = 0.5;
        this.iceRole.x = 20;
        this.iceRole.y = canvasRect.height - this.iceRole.image.height * 0.5 - 199;

        this.snowRole = new createjs.Bitmap(loader.getResult('snowRole'))
        this.snowRole.scale = 0.5;
        this.snowRole.x = (canvasRect.width - this.snowRole.image.width * 0.5) / 2 + 77;
        this.snowRole.y = canvasRect.height - this.snowRole.image.height * 0.5 - 228;

        this.container.addChild(
            this.homeBG,
            this.startBtn,
            this.iceRole,
            this.snowRole,
            this.startTips1,
        );

        this.animateRole();

        this.stage.addChild(this.container);
        this.stage.update();
    }

    animateRole() {
        createjs.Tween.get(this.snowRole, {loop: true})
            .to({
                y: this.snowRole.y + 10,
            }, 500, createjs.Ease.quadInOut())
            .to({
                y: this.snowRole.y,
            }, 800, createjs.Ease.quadInOut());
        createjs.Tween.get(this.iceRole, {loop: true})
            .to({
                y: this.iceRole.y + 10,
            }, 500, createjs.Ease.quadInOut())
            .to({
                y: this.iceRole.y,
            }, 500, createjs.Ease.quadInOut());
    }

    loadSource() {
        this.loader = loadFiles(this.source, this.sourceComplete.bind(this));
    }

    destory() {
        this.stage.removeChild(this.container)
        this.removeAllListeners('start');
    }

}
