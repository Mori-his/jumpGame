import { EventEmitter } from 'events';
import { loadFiles } from "../utils/loadQueue";

export default class GameLoading extends EventEmitter {
    source = [
        {
            id: 'loadingCableCar',
            src: require('/src/assets/images/loading_cable_car.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'quotes1',
            src: require('/src/assets/images/quotes1.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'quotes2',
            src: require('/src/assets/images/quotes2.png').default,
            type: createjs.Types.IMAGE
        },
        {
            id: 'trumpet',
            src: require('/src/assets/images/trumpet.png').default,
            type: createjs.Types.IMAGE
        },
    ]
    constructor(stage) {
        super();
        this.stage = stage;
        this.container = new createjs.Container()
        this.loadSource();
    }

    sourceComplete(event, loader) {
        this.backgroundAlpha = new createjs.Shape();
        this.backgroundAlpha.graphics.beginFill('rgba(0, 0, 0, 0.7)').drawRect(
            0,
            0,
            this.stage.canvas.width,
            this.stage.canvas.height,
        )

        this.loadingBg = new createjs.Shape();
        const loadingBgWidth = 262;
        const loadingBgHeight = 22;
        const progressRadius = 11;
        this.loadingBg.graphics
            .beginFill('rgba(255, 255, 255, 0.5)')
            .beginStroke('rgba(8, 6, 185, 0.4)')
            .setStrokeStyle(2)
            .drawRoundRect(
                (this.stage.canvas.width - loadingBgWidth) / 2,
                382,
                loadingBgWidth,
                loadingBgHeight,
                progressRadius
            );
        const progressLeft = (this.stage.canvas.width - loadingBgWidth) / 2 + 2;
        const progressTop = 383;
        this.progressBox = new createjs.Shape().set({x: progressLeft, y: progressTop, scaleX: 0});
        this.progressBox.graphics.beginFill('#fff')
            .drawRoundRect(
                0,
                0,
                loadingBgWidth,
                loadingBgHeight - 2,
                progressRadius
            );

        this.progressCableCar = new createjs.Bitmap(loader.getResult('loadingCableCar'));
        this.progressCableCar.x = (this.stage.canvas.width - loadingBgWidth - this.progressCableCar.image.width) / 2
        this.progressCableCar.y = 382

        this.quotes1 = new createjs.Bitmap(loader.getResult('quotes1'));
        this.quotes2 = new createjs.Bitmap(loader.getResult('quotes2'));
        this.trumpet = new createjs.Bitmap(loader.getResult('trumpet'));

        this.quotes1.x = (this.stage.canvas.width - this.quotes1.image.width) / 2;
        this.quotes2.x = (this.stage.canvas.width - this.quotes2.image.width) / 2;
        this.trumpet.x = 20;
        this.quotes1.y = 183;
        this.quotes2.y = 287;
        this.trumpet.y = 211;

        this.container.addChild(
            this.backgroundAlpha,
            this.quotes1,
            this.quotes2,
            this.trumpet,
            this.loadingBg,
            this.progressBox,
            this.progressCableCar
        )
        this.stage.addChild(this.container);
        this.stage.update();
        this.emit('loaded', this);
    }

    toProgress(percentage) {
        const totalWidth = this.loadingBg.graphics.command.w;
        const scaleX = percentage / 100
        const progressWidth = scaleX * totalWidth;
        console.log(percentage)
        createjs.Tween.get(this.progressBox, { override: true })
            .to({
                scaleX: scaleX
            }, 500, createjs.Ease.quadIn).call(() => {
                if (scaleX >= 1) {
                    this.emit('play');
                }
            })
        createjs.Tween.get(this.progressCableCar, { override: true })
            .to({
                x: this.progressCableCar.x + progressWidth
            }, 500, createjs.Ease.quadIn);
    }

    loadSource() {
        this.loader = loadFiles(
            this.source,
            this.sourceComplete.bind(this)
        );
    }
}


