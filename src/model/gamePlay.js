import { EventEmitter } from "events";
import gameState from "../controls/gameState";
import { loadFiles } from "../utils/loadQueue";
import source from './gamePlaySource';
import WeightsAlgorithm from "./weightsAlgorithm";

const font = 'PingFangSC-Medium,-apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Source Han Sans", "Noto Sans CJK Sc", "Microsoft YaHei", "Microsoft Jhenghei", sans-serif'
export default class GamePlay extends EventEmitter {
    source = source;
    currTime = 0;
    currDistance = 0;
    currBatterNum = 0;
    row = 0;
    col = 0;
    renderRow = 1;
    renderCol = 1;
    padding = 100;
    rollCount = 1;
    constructor(stage, options = {}) {
        super();
        this.stage = stage;
        this.time = options.time || 90;
        this.currTime = this.time;
        this.container = new createjs.Container();
        this.moveContainer = new createjs.Container();
        this.backgroundContainer = new createjs.Container();
        this.jumpContainer = new createjs.Container();
        this.loadSource();
    }

    sourceComplete(event, loader) {
        this.weightAlgorithm = new WeightsAlgorithm(this.stage, {
            row: this.row,
            column: this.col
        });
        // 增加背景以及跳台容器
        this.renderBackground(loader);
        // 渲染倒计时
        this.renderDistance(loader);
        // 渲染游戏人物
        this.renderRole(loader);
        // 渲染初始化时的新手提示
        this.renderTips(loader);
    }

    /**
     * 渲染人物角色
     */
    renderRole(loader) {
        this.role = new createjs.Bitmap(loader.getResult('roleMaleRight'));
        this.role.y = this.rollBg.image.height - this.role.image.height;
        this.role.x = (this.stage.canvas.width - this.role.image.width) / 2;
        this.jumpRoleX = this.role.x;
        this.jumpRoleY = this.role.y;
        this.role.scale = 0.7
        this.jumpContainer.addChild(this.role);
        this.stage.update();
    }

    renderBackground(loader) {
        this.fixedTopBg = new createjs.Bitmap(loader.getResult('fixedTopBg'));
        this.fixedTopBg.x = 0;
        this.fixedTopBg.y = 0;

        this.rollContainer = new createjs.Container();

        this.rollBg = new createjs.Bitmap(loader.getResult('rollBg'));
        this.rollTree = new createjs.Bitmap(loader.getResult('tree'));
        this.rollBg.x = 0;
        this.rollTree.x = 0;
        this.rollBg.y = 0;
        this.rollTree.y = 0;
        this.rollContainer.y = -(this.rollBg.image.height - this.stage.canvas.height);
        this.rollTree.regX = 25;
        

        this.computedGrid();
        this.renderJump(this.rollBg.image.height - this.renderHeight);

        this.backgroundContainer.addChild(this.rollBg);

        // 绘制背景以及跳台容器
        this.rollContainer.addChild(
            this.backgroundContainer,
            this.jumpContainer
        );
        
        // 给滚动容器合固定容器组合
        this.moveContainer.addChild(
            this.rollContainer,
            this.fixedTopBg,
        );
        // 放置到总容器里
        this.container.addChild(
            this.moveContainer,
        );
    }

    renderDistance(loader) {
        this.distanceContainer = new createjs.Container();
        this.distanceBg = new createjs.Shape().set({x: 20, y: 44});
        this.distanceBg.graphics.beginFill('rgba(0, 0, 0, .6)')
            .drawRoundRect(0, 0, 118, 44, 4);
        this.distanceNums = []
        const distanceNumLeft = 32;
        const image = loader.getResult('distance_0');
        for(let i = 0; i < 4; i++) {
            const currNumLeft = distanceNumLeft + (image.width - 3.5) * i
            this.distanceNums.push(
                new createjs.Bitmap(image).set({x: currNumLeft, y: 52})
            );
        }

        this.disanceText = new createjs.Text(
            '米',
            `bold 18px ${font}`,
            '#fff');
        const { height: textHeihgt } = this.disanceText.getBounds();
        const { h } = this.distanceBg.graphics.command;
        this.disanceText.set({
            x: 110,
            y: this.distanceBg.y + (h - textHeihgt) / 2
        });

        const batterBg = new createjs.Bitmap(loader.getResult('overtime_bg'));
        batterBg.x = this.stage.canvas.width - batterBg.image.width - 18;
        batterBg.y = 44;
        
        this.batterNums = [];
        const batterImage = loader.getResult('batter_num_0');
        const batterNumLeft = batterBg.x + 33;
        for(let i = 0; i < 3; i++) {
            const currBatterNumLeft = batterNumLeft + i * (batterImage.width + 2);
            this.batterNums.push(
                new createjs.Bitmap(batterImage).set({x: currBatterNumLeft, y: 58})
            );
        }
        
        const batterAddIcon = new createjs.Text('+', `bold 18px ${font}`, '#004786');
        batterAddIcon.outline = 1;
        batterAddIcon.x = batterBg.x + 15;
        batterAddIcon.y = batterBg.y + 14;

        this.volumeOpen = new createjs.Bitmap(loader.getResult('volume_open'));
        this.volumeClose = new createjs.Bitmap(loader.getResult('volume_close'));
        this.volumeOpen.x = this.stage.canvas.width - this.volumeOpen.image.width - 19;
        this.volumeClose.x = this.stage.canvas.width - this.volumeClose.image.width - 19;
        this.volumeOpen.y = 89;
        this.volumeClose.y = 89;

        this.volumeOpen.addEventListener('click', () => {
            this.distanceContainer.addChild(this.volumeClose);
            this.distanceContainer.removeChild(this.volumeOpen);
        });
        this.volumeClose.addEventListener('click', () => {
            this.distanceContainer.addChild(this.volumeOpen);
            this.distanceContainer.removeChild(this.volumeClose);
        });


        const countdownBg = new createjs.Bitmap(loader.getResult('countdown_bg'));
        countdownBg.x = 5;
        countdownBg.y = this.stage.canvas.height - countdownBg.image.height - 53;
        this.countdownNums = [];
        const countdownNumImage = loader.getResult('countdown_0');
        const countdownNumLeft = countdownBg.x + 25;
        for(let i = 0; i < 2; i++) {
            const currCountdownBgNumLeft = countdownNumLeft + i * (countdownNumImage.width + 2);
            this.countdownNums.push(
                new createjs.Bitmap(countdownNumImage).set({x: currCountdownBgNumLeft, y: countdownBg.y + 62})
            );
        }
        this.setCountdownNum();


        const progressBg = new createjs.Bitmap(loader.getResult('progress_bg'));
        progressBg.x = (this.stage.canvas.width - progressBg.image.width) / 2;
        progressBg.y = this.stage.canvas.height - progressBg.image.height - 22;

        this.progress = new createjs.Bitmap(loader.getResult('progress'))
            .set({x: progressBg.x + 4, y: progressBg.y + 5});
        this.progress.sourceRect = new createjs.Rectangle(0,0, this.progress.image.width, this.progress.image.height);

        this.distanceContainer.addChild(
            this.distanceBg,
            ...this.distanceNums,
            this.disanceText,
            batterBg,
            ...this.batterNums,
            this.volumeOpen,
            countdownBg,
            ...this.countdownNums,
            progressBg,
            this.progress,
            batterAddIcon
        );
    }

    renderTips(loader) {
        this.tipsContainer = new createjs.Container();
        
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

            
        const guideLogo = new createjs.Bitmap(loader.getResult('guideLogo'));
        const guideText = new createjs.Bitmap(loader.getResult('guideText'));
        guideLogo.x = (this.stage.canvas.width - guideLogo.image.width) / 2;
        guideLogo.y = hand.y - guideLogo.image.height - 30;
        guideText.x = (this.stage.canvas.width - guideText.image.width) / 2;
        guideText.y = hand.y + guideText.image.height + 13;
        this.tipsContainer.addEventListener('click', this.handleTipsClick.bind(this))
        
        createjs.Tween.get(arrowLeft, { loop: true })
            .to({x: arrowLeft.x - 10}, 300, createjs.Ease.linear)
            .to({x: arrowLeft.x}, 300, createjs.Ease.quadInOut)
            .wait(300);
        createjs.Tween.get(arrowRight, { loop: true })
            .wait(300)
            .to({x: arrowRight.x + 10}, 300, createjs.Ease.linear)
            .to({x: arrowRight.x}, 300, createjs.Ease.quadInOut);

        this.tipsContainer.addChild(
            backgroundAlpha,
            snow1,
            snow2,
            snow3,
            snow4,
            arrowLeft,
            arrowRight,
            hand,
            guideLogo,
            guideText
        );
    }

    run() {
        this.stage.addChild(
            this.container,
            this.distanceContainer
        );
        this.showTips()
        this.stage.update()
        window.test = this
    }

    start() {
        if (!gameState.playing) return
        // this.moveBackground();
        this.countdown();
        this.jumpRole(
            this.jumpRoleX,
           (this.jumpRoleY - this.renderHeight * 3.3),
        )
    }

    jumpRole(
        x = 0,
        y = 0,
        time = 800
    ) {
        this.jumpRoleX = x;
        this.jumpRoleY = y;
        createjs.Tween.get(this.role, { override: true })
            .to({
                y,
                x
            }, time, createjs.Ease.quadOut).call(() => {
                this.fallingRole(this.jumpRoleX, this.rollBg.image.height);
            });

    }
    fallingRole(
        x = 0,
        y = 0,
        time = 1100
    ) {
        this.jumpRoleX = x;
        this.jumpRoleY = y;
        const fallTween = createjs.Tween.get(this.role, { override: true })
            .to({
                y,
                x
            }, time, createjs.Ease.quadIn)
        fallTween.addEventListener('change', () => {
            const originY = -(this.rollBg.image.height - this.stage.canvas.height);
            const moveY = this.rollContainer.y;

            const leftX = this.role.x;
            const leftY = this.role.y;
            const points = [
                new createjs.Point(leftX, leftY),
                new createjs.Point(leftX + this.role.image.width / 2, leftY),
                new createjs.Point(leftX , leftY + this.role.image.height / 2),
                new createjs.Point(leftX + this.role.image.width / 2, leftY + this.role.image.height / 2),
            ]
            for(let i = 0; i < points.length; i++) {
                let objects = this.jumpContainer.getObjectsUnderPoint(points[i].x, points[i].y);
                objects = objects.filter((object) => object.name == 'jump')
                if (objects.length > 0) {
                    createjs.Tween.get(objects[0]).to({
                        x: 0
                    }, 5000, createjs.Ease.linear)
                    console.log(objects[0])
                    this.jumpRole(
                        this.role.x,
                        this.role.y - this.renderHeight * 3.3 
                    );
                    this.moveBackground(this.rollContainer.y + this.renderHeight * 3.3, 800)

                    // fallTween.setPaused(true);
                }
            }

        });
    }

    /**
     * 渲染跳台
     */
    renderJump(startY) {
        const matrix = this.weightAlgorithm.generate({
            row: this.row,
            column: this.col
        });
        for(let r = 0; r < matrix.length; r++) {
            const col = matrix[r];
            this.renderCol = 0;
            let startX = this.padding / 2;
            for (let c = 0; c < col.length; c++) {
                const currBitmap = new createjs.Bitmap(this.loader.getResult(col[c].bitmap));
                if (currBitmap) {
                    currBitmap.x = startX;
                    currBitmap.y = startY;
                    currBitmap.name = 'jump';
                    currBitmap['@@name'] = col[c].bitmap;
                    this.jumpContainer.addChild(currBitmap);
                    this.jumpContainer.setChildIndex(0);
                }
                startX += this.renderWidth;
                this.renderCol++;
            }
            startY -= this.renderHeight;
            this.renderRow++;
        }
    }

    renderDepthJump() {
        const cloneRollBg = this.rollBg.clone()
        cloneRollBg.x = 0;
        cloneRollBg.y = -(this.rollBg.image.height * this.rollCount);
        this.backgroundContainer.addChild(
            cloneRollBg
        );
        const jumpY = -(this.rollBg.image.height * (this.rollCount - 1) + this.renderHeight);
        this.renderJump(jumpY);
        // this.moveBackground(Math.abs(cloneRollBg.y) - this.stage.canvas.height);
        this.rollCount += 1;
    }

    /**
     * 倒计时
     */
    countdown() {
        setTimeout(() => {
            --this.currTime
            const percentage = this.currTime / this.time;
            this.moveProgress(percentage);
            this.setCountdownNum();
            if (this.currTime > 0) {
                this.countdown();
            }
        }, 1000);
    }

    /**
     * 
     */
    computedDistance() {
        const nums = this.currDistance.toString().padStart(4, '0').split('');
        this.distanceNums.forEach((num, index) => {
            num.image = this.loader.getResult(`distance_${nums[index]}`)
        });
    }
    computedBatterNum() {
        const nums = this.currBatterNum.toString().padStart(3, '0').split('');
        this.batterNums.forEach((num, index) => {
            num.image = this.loader.getResult(`batter_num_${nums[index]}`)
        });
    }

    setCountdownNum() {
        const nums = this.currTime.toString().padStart(2, '0').split('');
        this.countdownNums.forEach((num, index) => {
            num.image = this.loader.getResult(`countdown_${nums[index]}`)
        });
    }

    

    moveBackground(y = 0, time = 3000) {
        console.log(time)
        createjs.Tween.get(this.rollContainer, { override: true })
            .to({
                y,
            }, time, createjs.Ease.linear).call(() => {
                if (this.rollContainer.y >= this.rollBg.image.height * this.rollCount) {
                    this.renderDepthJump();
                }
            })
    }
    moveProgress(scaleX) {
        const sourceRect = this.progress.sourceRect;
        const totalWidth = this.progress.image.width;
        const width = scaleX * totalWidth;
        createjs.Tween.get(sourceRect, { override: true })
            .to({
                width,
            }, 1000, createjs.Ease.linear).call(() => {
                if (width <= 0) {
                    this.gameOver();
                }
            });
    }
    gameOver() {
        console.log('游戏结束了')
        gameState.gameOver();
    }

    computedGrid() {
        const canvasWidth = this.stage.canvas.width;
        const { width, height } = this.loader.getResult('jump_red');
        this.renderWidth = width;
        this.renderHeight = height;
        this.row = Math.floor((this.rollBg.image.height) / height);
        this.col = Math.floor((canvasWidth - this.padding) / width);
    }

    showTips() {
        this.stage.addChild(this.tipsContainer);
    }


    handleTipsClick() {
        this.emit('tipsClick');
        this.stage.removeChild(this.tipsContainer);
        this.start();
    }

    loadSource() {
        this.loader = loadFiles(
            this.source,
            this.sourceComplete.bind(this),
            this.loadProgress.bind(this)
        );
    }

    loadProgress(percentage) {
        this.emit('loadProgress', this, percentage);
    }

    destory() {
        this.tipsContainer.removeAllEventListeners('click');
        this.volumeClose.removeAllEventListeners('click');
        this.volumeOpen.removeAllEventListeners('click');
        this.removeAllListeners('loadProgress');
        this.removeAllListeners('tipsClick');
        this.stage.removeChild(
            this.tipsContainer,
            this.container
        );
    }
    
}
