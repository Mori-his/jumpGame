import { EventEmitter } from "events";
import gameState from "../controls/gameState";
import { loadFiles } from "../utils/loadQueue";
import source from './gamePlaySource';
import SelectRole from "./selectRole";
import WeightsAlgorithm from "./weightsAlgorithm";

const font = 'PingFangSC-Medium,-apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Source Han Sans", "Noto Sans CJK Sc", "Microsoft YaHei", "Microsoft Jhenghei", sans-serif'

const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
export default class GamePlay extends EventEmitter {
    // 是否展示新手提示
    noviceTips = true;
    source = source;
    currTime = 0;
    currDistance = 0;
    // 踩中块累计
    currBatterNum = 0;
    currBatterType = null;
    row = 0;
    col = 0;
    renderRow = 1;
    renderCol = 1;
    padding = 100;
    rollCount = 1;
    leftKeyDown = false;
    rightKeyDown = false;
    soundId = 'BGMMP3'
    constructor(stage, options = {}) {
        super();
        this.stage = stage;
        this.time = options.time || 40;
        this.noviceTips = options.noviceTips;
        this.currTime = this.time;
        this.container = new createjs.Container();
        this.moveContainer = new createjs.Container();
        this.backgroundContainer = new createjs.Container();
        this.jumpContainer = new createjs.Container();
        this.loadSource();
        this.scaleX = this.stage.canvas.width / 375;
    }

    keydown(event) {
        switch(event.key) {
            case ARROW_LEFT:
                this.leftKeyDown = true;
                break;
            case ARROW_RIGHT:
                this.rightKeyDown = true;
                break;
        }
    }
    keyup() {
        switch(event.key) {
            case ARROW_LEFT:
                this.leftKeyDown = false;
                break;
            case ARROW_RIGHT:
                this.rightKeyDown = false;
                break;
        }
    }

    mouseMove(event) {
        const minX = this.padding / 2;
        const maxX = this.stage.canvas.width - minX;
        let moveX = event.offsetX;
        if (moveX < minX) {
            moveX = minX;
        } else if (moveX > maxX) {
            moveX = maxX;
        }
        this.moveRoleX(moveX);
    }

    touchStart(event) {
        const { x } = this.stage.canvas.getBoundingClientRect();
        const touch = event.touches[0];
        let moveX = touch.clientX - x;
        const minX = this.padding / 2;
        const maxX = this.stage.canvas.width - minX;
        if (moveX < minX) {
            moveX = minX;
        } else if (moveX > maxX) {
            moveX = maxX;
        }
        let offsetX = this.renderWidth / 2;
        clearTimeout(this.moveXTimer);
        if (this.role.x > moveX) {
            offsetX = -offsetX;
            this.moveXTimer = setTimeout(() => {
                this.role.image = this.rise ? this.roleLeft : this.roleFastLeft;
            }, 100)
        } else {
            this.moveXTimer = setTimeout(() => {
                this.role.image = this.rise ? this.roleRight : this.roleFastRight;
            })
        }
        this.moveRoleX(moveX + offsetX);
    }

    tickerTick(event) {
        if (!this.role) return
        let nextX = this.role.x;
        if (this.leftKeyDown) {
            const minX = this.padding / 2;
            if (nextX < minX) {
                nextX = minX;
            } else {
                nextX = nextX - 3;
            }
        }
        if (this.rightKeyDown) {
            const maxX = this.stage.canvas.width - this.padding / 2;
            if (nextX > maxX) {
                nextX = maxX
            } else {
                nextX = nextX + 3;
            }
        }
        this.role.x = nextX;
    }

    sourceComplete(event, loader) {
        this.weightAlgorithm = new WeightsAlgorithm(this.stage, {
            row: this.row,
            column: this.col
        });
        // 选择人物
        this.selectRole(loader);
        
    }
    selectRole(loader) {
        this.selectRole = new SelectRole(this.stage, { loader });
        this.selectRole.once('selectedRole', (roleType) => {
            this.selectRoleType = roleType;
            this.init();
        });
    }

    init() {
        // 增加背景以及跳台容器
        this.renderBackground(this.loader);
        // 渲染倒计时
        this.renderDistance(this.loader);
        // 渲染游戏人物
        this.renderRole(this.loader);
        // 连击效果
        this.renderBatterEffet();
        // 渲染初始化时的新手提示
        if (this.noviceTips) {
          this.renderTips(this.loader);
        } else {
          this.start()
        }
        this.emit('play');
    }
    /**
     * 渲染人物角色
     */
    renderRole(loader) {
        if (this.selectRoleType === 0) {
            this.roleRight = loader.getResult('roleMaleRight');
            this.roleLeft = loader.getResult('roleMaleLeft');
            this.roleFastRight = loader.getResult('roleMaleFastRight');
            this.roleFastLeft = loader.getResult('roleMaleFastLeft');
        } else {
            this.roleRight = loader.getResult('roleFemaleRight');
            this.roleLeft = loader.getResult('roleFemaleLeft');
            this.roleFastRight = loader.getResult('roleFemaleFastRight');
            this.roleFastLeft = loader.getResult('roleFemaleFastLeft');
        }
        this.role = new createjs.Bitmap(this.roleRight);
        this.role.y = this.rollBg.image.height / 2 - this.role.image.height;
        this.role.x = (this.stage.canvas.width - this.role.image.width) / 2;
        this.jumpRoleX = this.role.x;
        this.jumpRoleY = this.role.y;
        this.role.scale = 0.5;
        this.jumpContainer.addChild(this.role);
        this.stage.update();
    }

    renderBackground(loader) {
        this.fixedTopBg = new createjs.Bitmap(loader.getResult('fixedTopBg'));
        this.rollBg = new createjs.Bitmap(loader.getResult('rollBg'));
        this.scaleX = this.stage.canvas.width / this.rollBg.image.width;



        this.fixedTopBg.scale = this.scaleX;
        this.fixedTopBg.x = 0;
        this.fixedTopBg.y = 0;

        this.rollContainer = new createjs.Container();

        this.rollBg.scale = this.scaleX;
        this.rollBg.x = 0;
        this.rollBg.y = 0;
        this.rollContainer.y = -(this.rollBg.image.height * this.scaleX - this.stage.canvas.height);


        this.computedGrid();
        this.renderJump(this.rollBg.image.height * this.scaleX - this.renderHeight);

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

        const batterAddIcon = new createjs.Bitmap(loader.getResult('batterAddIcon'));
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
            createjs.Sound.stop(this.soundId);
        });
        this.volumeClose.addEventListener('click', () => {
            this.distanceContainer.addChild(this.volumeOpen);
            this.distanceContainer.removeChild(this.volumeClose);
            createjs.Sound.play(this.soundId, { loop: -1 });
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

    renderBatterEffet() {
        this.batter2Img = this.loader.getResult('batter_2');
        this.batter3Img = this.loader.getResult('batter_3');
        this.batter4Img = this.loader.getResult('batter_4');
        // 加速金句 更快 更高 更强！
        this.speedQuotes = new createjs.Bitmap(this.loader.getResult('speed_quotes'));
        this.batterContainer = new createjs.Bitmap(this.batter2Img);
        this.batterContainer.x = (this.stage.canvas.width - this.batter2Img.width) / 2;
        this.batterContainer.y = 100;
    }
    renderBatterContainer() {
      this.batterContainer.alpha = 1;
      this.container.addChild(this.batterContainer);
    }
    removeBatterContainer() {
      createjs.Tween.get(this.batterContainer)
        .to({
          alpha: 0
        }, 300, createjs.Ease.linear).call(() => {
            this.container.removeChild(this.batterContainer);
        });
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
        window.localStorage.setItem('noviceTips', false)
    }

    start() {
        if (!gameState.playing) return
        createjs.Sound.play(this.soundId, {loop: -1});
        this.bindEvents();
        this.countdown();
        this.jumpRole(
           this.jumpRoleY - this.renderHeight * 3.3,
        )
    }
    bindEvents() {

        this.keydown = this.keydown.bind(this)
        this.keyup = this.keyup.bind(this)
        this.mouseMove = this.mouseMove.bind(this);
        this.tickerTick = this.tickerTick.bind(this);
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
        this.stage.canvas.addEventListener('mousemove', this.mouseMove);
        this.touchStart = this.touchStart.bind(this);
        this.stage.canvas.addEventListener('touchstart', this.touchStart);
        this.stage.canvas.addEventListener('touchmove', this.touchStart)

        this.tickerTick = this.tickerTick.bind(this);
        createjs.Ticker.addEventListener('tick', this.tickerTick);
    }

    moveRoleX(x = this.role.x) {
        createjs.Tween.get(this.role)
            .to({
                x,
            }, 600, createjs.Ease.linear);
    }

    jumpRole(
        y = this.jumpRoleY,
        x = this.role.x,
        time = 800
    ) {
        this.rise = true
        this.jumpRoleY = y;
        this.role.image = this.roleRight;
        const roleTween = createjs.Tween.get(this.role, { override: true })
            .to({
                y,
            }, time, createjs.Ease.quadOut).call(() => {
                this.rise = false;
                this.fallingRole(this.role.y + this.stage.canvas.height / 3);
            })
        roleTween.call(() => {
            const offsetY = this.stage.canvas.height / 1.5 - this.role.y;
            if (this.rollContainer.y < offsetY) {
                this.moveBackground(offsetY, 800)
            }
        });
        return roleTween;

    }
    fallingRole(
        y = 0,
        time = 1500
    ) {
        this.jumpRoleY = y;
        this.role.image = this.roleFastRight;
        const fallTween = createjs.Tween.get(this.role, { override: true })
            .to({
                y,
            }, time, createjs.Ease.sineInOut);

        // 给当前角色下降时每一次tick都会执行
        fallTween.addEventListener('change', () => {
            // const originY = -(this.rollBg.image.height - this.stage.canvas.height);
            // const moveY = this.rollContainer.y;

            const leftX = this.role.x + this.role.image.width / 3;
            const leftY = this.role.y + this.role.image.height / 3;
            const roleWidth = this.role.image.width * 0.33;
            const roleHeight = this.role.image.height * 0.66;
            // 角色
            const points = [
                new createjs.Point(leftX, leftY),
                // new createjs.Point(leftX + roleWidth, leftY),
                // new createjs.Point(leftX , leftY + roleHeight),
                // new createjs.Point(leftX + roleWidth, leftY + roleHeight),
            ]
            for(let i = 0; i < points.length; i++) {
                // 在跳台容器内 判断此x, y点 有哪些object重叠了
                let objects = this.jumpContainer.getObjectsUnderPoint(points[i].x, points[i].y);
                objects = objects.filter((object) => object.name === 'jump')
                if (objects.length > 0) {
                    if (objects[0].__type === 'time') {
                        this.currTime += 10;
                    }
                    createjs.Tween.get(objects[0]).to({
                        alpha: 0
                    }, 300, createjs.Ease.linear)
                    .call(() => {
                        // 执行完渐变动画后删除次Object
                        this.rollContainer.removeChild(objects[0]);
                    });



                    const currBitmapName = objects[0]['@@name'];
                    if (this.currBatterType === null) {
                      this.currBatterType = currBitmapName
                    } else if (
                        this.currBatterType === currBitmapName
                        || objects[0].__type === 'time'
                    ) {
                        this.currBatterNum++;
                    } else {
                        this.currBatterNum = 1;
                        this.currBatterType = currBitmapName;
                        clearTimeout(this.batterEffectTimer);
                        this.removeBatterContainer();
                    }

                    switch (this.currBatterNum) {
                      case 2:
                          this.batterContainer.image = this.batter2Img
                          break;
                      case 3:
                          this.batterContainer.image = this.batter3Img
                          break;
                      case 4:
                          this.batterContainer.image = this.batter4Img
                          break;
                    }
                    if (this.currBatterNum >= 1) {
                      this.renderBatterContainer()
                      clearTimeout(this.batterEffectTimer);
                      this.batterEffectTimer = setTimeout(() => {
                          this.removeBatterContainer();
                      }, 4000);
                    }





                    if (this.currBatterNum >= 4) {
                        this.role.image = this.roleFastRight;
                        this.jumpRole(
                            this.role.y - this.renderHeight * 15,
                            this.role.x,
                            3000
                        ).call(() => {
                            clearTimeout(this.batterEffectTimer);
                            this.removeBatterContainer();
                        });
                        // 金句动画
                        this.speedQuotes.x = (this.stage.canvas.width - this.speedQuotes.image.width) / 2;
                        this.speedQuotes.y = (this.stage.canvas.height - this.speedQuotes.image.height) / 2;
                        this.speedQuotes.alpha = 1;
                        this.stage.addChild(this.speedQuotes);
                        createjs.Tween.get(this.speedQuotes)
                            .to({
                                y: -this.speedQuotes.image.height,
                                alpha: 0
                            }, 2000, createjs.Ease.quadIn).call(() => {
                                this.stage.removeChild(this.speedQuotes);
                            });
                        this.moveBackground(
                            this.rollContainer.y + this.renderHeight * 15,
                            3000
                        )
                        this.currBatterNum = 0;
                    } else {
                        this.jumpRole(
                            this.role.y - this.renderHeight * 3.3,
                            this.role.x,
                            1100
                        );
                    }
                    this.computedBatterNum();

                    // fallTween.setPaused(true);
                }
            }

        });

        fallTween.call(() => {
            this.gameOver();
        })
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
                    if (col[c].bitmap === 'jump_time') {
                        currBitmap.__type = 'time';
                        createjs.Tween.get(currBitmap, { loop: true })
                            .to({
                                scale: 1.1
                            }, 200, createjs.Ease.linear)
                            .to({
                                scale: 1,
                            }, 200, createjs.Ease.linear);
                    }
                    currBitmap['@@name'] = col[c].bitmap;
                    this.jumpContainer.addChild(currBitmap);
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
        cloneRollBg.y = -(this.rollBg.image.height * this.scaleX * this.rollCount);
        // 增加循环背景
        this.backgroundContainer.addChild(
            cloneRollBg
        );
        const jumpY = -(this.rollBg.image.height * this.scaleX * (this.rollCount - 1) + this.renderHeight);
        // 循环跳台
        this.renderJump(jumpY);

        // 给角色置顶
        this.jumpContainer.addChild(this.role);
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
        const bgTween = createjs.Tween.get(this.rollContainer, { override: true })
            .to({
                y,
            }, time, createjs.Ease.linear);
            bgTween.addEventListener('change', () => {
                if (this.rollContainer.y >= this.rollBg.image.height * this.scaleX * (this.rollCount - 1)) {
                    this.renderDepthJump();
                }
                // 增加米数
                this.currDistance++
                this.computedDistance();
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
        createjs.Sound.stop(this.soundId);
        this.destory();
        createjs.Ticker.reset();
        gameState.gameOver(this.currDistance);
    }

    computedGrid() {
        const canvasWidth = this.stage.canvas.width;
        const { width, height } = this.loader.getResult('jump_red');
        this.renderWidth = width;
        this.renderHeight = height;
        this.row = Math.floor((this.rollBg.image.height * this.scaleX) / height);
        console.log(this.row)
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
        this.tipsContainer?.removeAllEventListeners('click');
        this.volumeClose?.removeAllEventListeners('click');
        this.volumeOpen?.removeAllEventListeners('click');
        this.removeAllListeners('loadProgress');
        this.removeAllListeners('tipsClick');

        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);
        this.stage.canvas.removeEventListener('mousemove', this.mouseMove);
        this.stage.canvas.removeEventListener('touchstart', this.touchStart);
        this.stage.canvas.removeEventListener('touchmove', this.touchStart);

        createjs.Ticker.removeEventListener('tick', this.tickerTick);
        this.stage.removeChild(
            this.tipsContainer,
            this.container
        );
    }

}
