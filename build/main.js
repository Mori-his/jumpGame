/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controls/gameState.js":
/*!***********************************!*\
  !*** ./src/controls/gameState.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);


class GameState extends events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  playing = false;
  score = 0;

  gameOver(score) {
    this.playing = false;
    this.score = score;
    this.emit('gameOver');
  }

  restart() {
    this.emit('restart');
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new GameState());

/***/ }),

/***/ "./src/model/gameLoding.js":
/*!*********************************!*\
  !*** ./src/model/gameLoding.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameLoading)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_loadQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/loadQueue */ "./src/utils/loadQueue.js");


class GameLoading extends events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  source = [{
    id: 'loadingCableCar',
    src: (__webpack_require__(/*! ../../src/assets/images/loading_cable_car.png */ "./src/assets/images/loading_cable_car.png")["default"]),
    type: createjs.Types.IMAGE
  }, {
    id: 'quotes1',
    src: (__webpack_require__(/*! ../../src/assets/images/quotes1.png */ "./src/assets/images/quotes1.png")["default"]),
    type: createjs.Types.IMAGE
  }, {
    id: 'quotes2',
    src: (__webpack_require__(/*! ../../src/assets/images/quotes2.png */ "./src/assets/images/quotes2.png")["default"]),
    type: createjs.Types.IMAGE
  }, {
    id: 'trumpet',
    src: (__webpack_require__(/*! ../../src/assets/images/trumpet.png */ "./src/assets/images/trumpet.png")["default"]),
    type: createjs.Types.IMAGE
  }];

  constructor(stage) {
    super();
    this.stage = stage;
    this.container = new createjs.Container();
    this.loadSource();
  }

  sourceComplete(event, loader) {
    this.backgroundAlpha = new createjs.Shape();
    this.backgroundAlpha.graphics.beginFill('rgba(0, 0, 0, 0.7)').drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height); // 防止点透

    this.backgroundAlpha.addEventListener('click', () => {});
    this.loadingBg = new createjs.Shape();
    const loadingBgWidth = 262;
    const loadingBgHeight = 22;
    const progressRadius = 11;
    this.loadingBg.graphics.beginFill('rgba(255, 255, 255, 0.5)').beginStroke('rgba(8, 6, 185, 0.4)').setStrokeStyle(2).drawRoundRect((this.stage.canvas.width - loadingBgWidth) / 2, 382, loadingBgWidth, loadingBgHeight, progressRadius);
    this.loadingBg.shadow = new createjs.Shadow('rgba(8, 6, 185, 0.4)', 0, 0, 5);
    const progressLeft = (this.stage.canvas.width - loadingBgWidth) / 2 + 2;
    const progressTop = 383;
    this.progressBox = new createjs.Shape().set({
      x: progressLeft,
      y: progressTop,
      scaleX: 0
    });
    this.progressBox.graphics.beginFill('#fff').drawRoundRect(0, 0, loadingBgWidth, loadingBgHeight - 2, progressRadius);
    this.progressCableCar = new createjs.Bitmap(loader.getResult('loadingCableCar'));
    this.progressCableCar.x = (this.stage.canvas.width - loadingBgWidth - this.progressCableCar.image.width) / 2;
    this.progressCableCar.y = 382;
    this.quotes1 = new createjs.Bitmap(loader.getResult('quotes1'));
    this.quotes2 = new createjs.Bitmap(loader.getResult('quotes2'));
    this.trumpet = new createjs.Bitmap(loader.getResult('trumpet'));
    this.quotes1.x = (this.stage.canvas.width - this.quotes1.image.width) / 2;
    this.quotes2.x = (this.stage.canvas.width - this.quotes2.image.width) / 2;
    this.trumpet.x = 20;
    this.quotes1.y = 183;
    this.quotes2.y = 287;
    this.trumpet.y = 211;
    this.container.addChild(this.backgroundAlpha, this.quotes1, this.quotes2, this.trumpet, this.loadingBg, this.progressBox, this.progressCableCar);
    this.stage.addChild(this.container);
    this.stage.update();
    this.emit('loaded', this);
  }

  toProgress(percentage) {
    const totalWidth = this.loadingBg.graphics.command.w;
    const scaleX = percentage / 100;
    const progressWidth = scaleX * totalWidth;
    createjs.Tween.get(this.progressBox, {
      override: true
    }).to({
      scaleX: scaleX
    }, 500, createjs.Ease.quadIn).wait(200).call(() => {
      if (scaleX >= 1 && progressWidth >= totalWidth) {
        this.emit('play');
      }
    });
    createjs.Tween.get(this.progressCableCar, {
      override: true
    }).to({
      x: progressWidth + this.progressCableCar.image.width
    }, 500, createjs.Ease.quadIn);
  }

  loadSource() {
    this.loader = (0,_utils_loadQueue__WEBPACK_IMPORTED_MODULE_1__.loadFiles)(this.source, this.sourceComplete.bind(this));
  }

  destory() {
    this.stage.removeChild(this.container);
    this.removeAllListeners('play');
    this.removeAllListeners('loaded');
    this.backgroundAlpha.removeAllEventListeners('click');
  }

}

/***/ }),

/***/ "./src/model/gamePlay.js":
/*!*******************************!*\
  !*** ./src/model/gamePlay.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GamePlay)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controls_gameState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controls/gameState */ "./src/controls/gameState.js");
/* harmony import */ var _utils_loadQueue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/loadQueue */ "./src/utils/loadQueue.js");
/* harmony import */ var _gamePlaySource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gamePlaySource */ "./src/model/gamePlaySource.js");
/* harmony import */ var _weightsAlgorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./weightsAlgorithm */ "./src/model/weightsAlgorithm.js");





const font = 'PingFangSC-Medium,-apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Source Han Sans", "Noto Sans CJK Sc", "Microsoft YaHei", "Microsoft Jhenghei", sans-serif';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
class GamePlay extends events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  // 是否展示新手提示
  noviceTips = true;
  source = _gamePlaySource__WEBPACK_IMPORTED_MODULE_3__["default"];
  currTime = 0;
  currDistance = 0; // 踩中块累计

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
  soundId = 'BGMMP3';

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
  }

  keydown(event) {
    switch (event.key) {
      case ARROW_LEFT:
        this.leftKeyDown = true;
        break;

      case ARROW_RIGHT:
        this.rightKeyDown = true;
        break;
    }
  }

  keyup() {
    switch (event.key) {
      case ARROW_LEFT:
        this.leftKeyDown = false;
        break;

      case ARROW_RIGHT:
        this.rightKeyDown = false;
        break;
    }
  }

  mouseMove(event) {
    this.moveRoleX(event.offsetX);
  }

  touchStart(event) {
    const {
      x
    } = this.stage.canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const moveX = touch.clientX - x;
    let offsetX = this.renderWidth / 2;

    if (this.role.x > moveX) {
      offsetX = -offsetX;
      this.role.image = this.rise ? this.roleLeft : this.roleFastLeft;
    } else {
      this.role.image = this.rise ? this.roleRight : this.roleFastRight;
    }

    this.moveRoleX(moveX + offsetX);
  }

  tickerTick(event) {
    if (!this.role) return;
    let nextX = this.role.x;

    if (this.leftKeyDown) {
      nextX = nextX - 3;
    }

    if (this.rightKeyDown) {
      nextX = nextX + 3;
    }

    this.role.x = nextX;
  }

  sourceComplete(event, loader) {
    this.weightAlgorithm = new _weightsAlgorithm__WEBPACK_IMPORTED_MODULE_4__["default"](this.stage, {
      row: this.row,
      column: this.col
    }); // 增加背景以及跳台容器

    this.renderBackground(loader); // 渲染倒计时

    this.renderDistance(loader); // 渲染游戏人物

    this.renderRole(loader); // 连击效果

    this.renderBatterEffet(); // 渲染初始化时的新手提示

    if (this.noviceTips) {
      this.renderTips(loader);
    } else {
      this.start();
    }
  }
  /**
   * 渲染人物角色
   */


  renderRole(loader) {
    this.roleRight = loader.getResult('roleMaleRight');
    this.roleLeft = loader.getResult('roleMaleLeft');
    this.roleFastRight = loader.getResult('roleMaleFastRight');
    this.roleFastLeft = loader.getResult('roleMaleFastLeft');
    this.role = new createjs.Bitmap(this.roleRight);
    this.role.y = this.rollBg.image.height - this.role.image.height;
    this.role.x = (this.stage.canvas.width - this.role.image.width) / 2;
    this.jumpRoleX = this.role.x;
    this.jumpRoleY = this.role.y;
    this.role.scale = 0.5;
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
    this.backgroundContainer.addChild(this.rollBg); // 绘制背景以及跳台容器

    this.rollContainer.addChild(this.backgroundContainer, this.jumpContainer); // 给滚动容器合固定容器组合

    this.moveContainer.addChild(this.rollContainer, this.fixedTopBg); // 放置到总容器里

    this.container.addChild(this.moveContainer);
  }

  renderDistance(loader) {
    this.distanceContainer = new createjs.Container();
    this.distanceBg = new createjs.Shape().set({
      x: 20,
      y: 44
    });
    this.distanceBg.graphics.beginFill('rgba(0, 0, 0, .6)').drawRoundRect(0, 0, 118, 44, 4);
    this.distanceNums = [];
    const distanceNumLeft = 32;
    const image = loader.getResult('distance_0');

    for (let i = 0; i < 4; i++) {
      const currNumLeft = distanceNumLeft + (image.width - 3.5) * i;
      this.distanceNums.push(new createjs.Bitmap(image).set({
        x: currNumLeft,
        y: 52
      }));
    }

    this.disanceText = new createjs.Text('米', `bold 18px ${font}`, '#fff');
    const {
      height: textHeihgt
    } = this.disanceText.getBounds();
    const {
      h
    } = this.distanceBg.graphics.command;
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

    for (let i = 0; i < 3; i++) {
      const currBatterNumLeft = batterNumLeft + i * (batterImage.width + 2);
      this.batterNums.push(new createjs.Bitmap(batterImage).set({
        x: currBatterNumLeft,
        y: 58
      }));
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
      createjs.Sound.stop(this.soundId);
    });
    this.volumeClose.addEventListener('click', () => {
      this.distanceContainer.addChild(this.volumeOpen);
      this.distanceContainer.removeChild(this.volumeClose);
      createjs.Sound.play(this.soundId, {
        loop: -1
      });
    });
    const countdownBg = new createjs.Bitmap(loader.getResult('countdown_bg'));
    countdownBg.x = 5;
    countdownBg.y = this.stage.canvas.height - countdownBg.image.height - 53;
    this.countdownNums = [];
    const countdownNumImage = loader.getResult('countdown_0');
    const countdownNumLeft = countdownBg.x + 25;

    for (let i = 0; i < 2; i++) {
      const currCountdownBgNumLeft = countdownNumLeft + i * (countdownNumImage.width + 2);
      this.countdownNums.push(new createjs.Bitmap(countdownNumImage).set({
        x: currCountdownBgNumLeft,
        y: countdownBg.y + 62
      }));
    }

    this.setCountdownNum();
    const progressBg = new createjs.Bitmap(loader.getResult('progress_bg'));
    progressBg.x = (this.stage.canvas.width - progressBg.image.width) / 2;
    progressBg.y = this.stage.canvas.height - progressBg.image.height - 22;
    this.progress = new createjs.Bitmap(loader.getResult('progress')).set({
      x: progressBg.x + 4,
      y: progressBg.y + 5
    });
    this.progress.sourceRect = new createjs.Rectangle(0, 0, this.progress.image.width, this.progress.image.height);
    this.distanceContainer.addChild(this.distanceBg, ...this.distanceNums, this.disanceText, batterBg, ...this.batterNums, this.volumeOpen, countdownBg, ...this.countdownNums, progressBg, this.progress, batterAddIcon);
  }

  renderBatterEffet() {
    this.batter2Img = this.loader.getResult('batter_2');
    this.batter3Img = this.loader.getResult('batter_3');
    this.batter4Img = this.loader.getResult('batter_4');
    this.batterContainer = new createjs.Bitmap(this.batter2Img);
    this.batterContainer.x = (this.stage.canvas.width - this.batter2Img.width) / 2;
    this.batterContainer.y = 100;
  }

  renderBatterContainer() {
    this.batterContainer.alpha = 1;
    this.container.addChild(this.batterContainer);
  }

  removeBatterContainer() {
    createjs.Tween.get(this.batterContainer).to({
      alpha: 0
    }, 300, createjs.Ease.linear).call(() => {
      this.container.removeChild(this.batterContainer);
    });
  }

  renderTips(loader) {
    this.tipsContainer = new createjs.Container();
    const backgroundAlpha = new createjs.Shape();
    backgroundAlpha.graphics.beginFill('rgba(0, 0, 0, 0.7)').drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height); // 雪花对象

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
    arrowLeft.y = this.stage.canvas.height - arrowLeft.image.height - 185;
    arrowRight.x = this.stage.canvas.width / 2 + arrowLeft.image.width + 37.5;
    arrowRight.y = this.stage.canvas.height - 185;
    arrowRight.rotation = 180;
    hand.x = (this.stage.canvas.width - hand.image.width) / 2;
    hand.y = this.stage.canvas.height - arrowLeft.image.height - 200;
    const guideLogo = new createjs.Bitmap(loader.getResult('guideLogo'));
    const guideText = new createjs.Bitmap(loader.getResult('guideText'));
    guideLogo.x = (this.stage.canvas.width - guideLogo.image.width) / 2;
    guideLogo.y = hand.y - guideLogo.image.height - 30;
    guideText.x = (this.stage.canvas.width - guideText.image.width) / 2;
    guideText.y = hand.y + guideText.image.height + 13;
    this.tipsContainer.addEventListener('click', this.handleTipsClick.bind(this));
    createjs.Tween.get(arrowLeft, {
      loop: true
    }).to({
      x: arrowLeft.x - 10
    }, 300, createjs.Ease.linear).to({
      x: arrowLeft.x
    }, 300, createjs.Ease.quadInOut).wait(300);
    createjs.Tween.get(arrowRight, {
      loop: true
    }).wait(300).to({
      x: arrowRight.x + 10
    }, 300, createjs.Ease.linear).to({
      x: arrowRight.x
    }, 300, createjs.Ease.quadInOut);
    this.tipsContainer.addChild(backgroundAlpha, snow1, snow2, snow3, snow4, arrowLeft, arrowRight, hand, guideLogo, guideText);
  }

  run() {
    this.stage.addChild(this.container, this.distanceContainer);
    this.showTips();
    this.stage.update();
  }

  start() {
    if (!_controls_gameState__WEBPACK_IMPORTED_MODULE_1__["default"].playing) return;
    createjs.Sound.play(this.soundId, {
      loop: -1
    });
    this.bindEvents();
    this.countdown();
    this.jumpRole(this.jumpRoleY - this.renderHeight * 3.3);
  }

  bindEvents() {
    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.tickerTick = this.tickerTick.bind(this);
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
    this.stage.canvas.addEventListener('mousemove', this.mouseMove);
    this.touchStart = this.touchStart.bind(this);
    this.stage.canvas.addEventListener('touchstart', this.touchStart);
    this.stage.canvas.addEventListener('touchmove', this.touchStart);
    this.tickerTick = this.tickerTick.bind(this);
    createjs.Ticker.addEventListener('tick', this.tickerTick);
  }

  moveRoleX(x = this.role.x) {
    createjs.Tween.get(this.role).to({
      x
    }, 300, createjs.Ease.linear);
  }

  jumpRole(y = this.jumpRoleY, x = this.role.x, time = 800) {
    this.rise = true;
    this.jumpRoleY = y;
    this.role.image = this.roleRight;
    const roleTween = createjs.Tween.get(this.role, {
      override: true
    }).to({
      y
    }, time, createjs.Ease.quadOut).call(() => {
      this.rise = false;
      this.fallingRole(this.role.y + this.stage.canvas.height / 3);
    });
    roleTween.call(() => {
      const offsetY = this.stage.canvas.height / 1.5 - this.role.y;

      if (this.rollContainer.y < offsetY) {
        this.moveBackground(offsetY, 800);
      }
    });
    return roleTween;
  }

  fallingRole(y = 0, time = 2000) {
    this.jumpRoleY = y;
    this.role.image = this.roleFastRight;
    const fallTween = createjs.Tween.get(this.role, {
      override: true
    }).to({
      y
    }, time, createjs.Ease.cubicInOut); // 给当前角色下降时每一次tick都会执行

    fallTween.addEventListener('change', () => {
      // const originY = -(this.rollBg.image.height - this.stage.canvas.height);
      // const moveY = this.rollContainer.y;
      const leftX = this.role.x + this.role.image.width / 3;
      const leftY = this.role.y + this.role.image.height / 3;
      const roleWidth = this.role.image.width * 0.33;
      const roleHeight = this.role.image.height * 0.66; // 角色

      const points = [new createjs.Point(leftX, leftY) // new createjs.Point(leftX + roleWidth, leftY),
      // new createjs.Point(leftX , leftY + roleHeight),
      // new createjs.Point(leftX + roleWidth, leftY + roleHeight),
      ];

      for (let i = 0; i < points.length; i++) {
        // 在跳台容器内 判断此x, y点 有哪些object重叠了
        let objects = this.jumpContainer.getObjectsUnderPoint(points[i].x, points[i].y);
        objects = objects.filter(object => object.name === 'jump');

        if (objects.length > 0) {
          createjs.Tween.get(objects[0]).to({
            alpha: 0
          }, 300, createjs.Ease.linear).call(() => {
            // 执行完渐变动画后删除次Object
            this.rollContainer.removeChild(objects[0]);
          });
          const currBitmapName = objects[0]['@@name'];

          if (this.currBatterType === null) {
            this.currBatterType = currBitmapName;
          } else if (this.currBatterType === currBitmapName) {
            this.currBatterNum++;
          } else {
            this.currBatterNum = 1;
            this.currBatterType = currBitmapName;
            clearTimeout(this.batterEffectTimer);
            this.removeBatterContainer();
          }

          switch (this.currBatterNum) {
            case 2:
              this.batterContainer.image = this.batter2Img;
              break;

            case 3:
              this.batterContainer.image = this.batter3Img;
              break;

            case 4:
              this.batterContainer.image = this.batter4Img;
              break;
          }

          if (this.currBatterNum >= 1) {
            this.renderBatterContainer();
            clearTimeout(this.batterEffectTimer);
            this.batterEffectTimer = setTimeout(() => {
              this.removeBatterContainer();
            }, 4000);
          }

          if (this.currBatterNum >= 4) {
            this.role.image = this.roleFastRight;
            this.jumpRole(this.role.y - this.renderHeight * 15, this.role.x, 3000).call(() => {
              clearTimeout(this.batterEffectTimer);
              this.removeBatterContainer();
            });
            this.moveBackground(this.rollContainer.y + this.renderHeight * 15, 3000);
            this.currBatterNum = 0;
          } else {
            this.jumpRole(this.role.y - this.renderHeight * 3.3, this.role.x, 1100);
          }

          this.computedBatterNum(); // fallTween.setPaused(true);
        }
      }
    });
    fallTween.call(() => {
      this.gameOver();
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

    for (let r = 0; r < matrix.length; r++) {
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
        }

        startX += this.renderWidth;
        this.renderCol++;
      }

      startY -= this.renderHeight;
      this.renderRow++;
    }
  }

  renderDepthJump() {
    const cloneRollBg = this.rollBg.clone();
    cloneRollBg.x = 0;
    cloneRollBg.y = -(this.rollBg.image.height * this.rollCount); // 增加循环背景

    this.backgroundContainer.addChild(cloneRollBg);
    const jumpY = -(this.rollBg.image.height * (this.rollCount - 1) + this.renderHeight); // 循环跳台

    this.renderJump(jumpY); // 给角色置顶

    this.jumpContainer.addChild(this.role);
    this.rollCount += 1;
  }
  /**
   * 倒计时
   */


  countdown() {
    setTimeout(() => {
      --this.currTime;
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
      num.image = this.loader.getResult(`distance_${nums[index]}`);
    });
  }

  computedBatterNum() {
    const nums = this.currBatterNum.toString().padStart(3, '0').split('');
    this.batterNums.forEach((num, index) => {
      num.image = this.loader.getResult(`batter_num_${nums[index]}`);
    });
  }

  setCountdownNum() {
    const nums = this.currTime.toString().padStart(2, '0').split('');
    this.countdownNums.forEach((num, index) => {
      num.image = this.loader.getResult(`countdown_${nums[index]}`);
    });
  }

  moveBackground(y = 0, time = 3000) {
    const bgTween = createjs.Tween.get(this.rollContainer, {
      override: true
    }).to({
      y
    }, time, createjs.Ease.linear);
    bgTween.addEventListener('change', () => {
      if (this.rollContainer.y >= this.rollBg.image.height * (this.rollCount - 1)) {
        this.renderDepthJump();
      } // 增加米数


      this.currDistance++;
      this.computedDistance();
    });
  }

  moveProgress(scaleX) {
    const sourceRect = this.progress.sourceRect;
    const totalWidth = this.progress.image.width;
    const width = scaleX * totalWidth;
    createjs.Tween.get(sourceRect, {
      override: true
    }).to({
      width
    }, 1000, createjs.Ease.linear).call(() => {
      if (width <= 0) {
        this.gameOver();
      }
    });
  }

  gameOver() {
    console.log('游戏结束了');
    createjs.Sound.stop(this.soundId);
    this.destory();
    createjs.Ticker.reset();
    _controls_gameState__WEBPACK_IMPORTED_MODULE_1__["default"].gameOver(this.currDistance);
  }

  computedGrid() {
    const canvasWidth = this.stage.canvas.width;
    const {
      width,
      height
    } = this.loader.getResult('jump_red');
    this.renderWidth = width;
    this.renderHeight = height;
    this.row = Math.floor(this.rollBg.image.height / height);
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
    this.loader = (0,_utils_loadQueue__WEBPACK_IMPORTED_MODULE_2__.loadFiles)(this.source, this.sourceComplete.bind(this), this.loadProgress.bind(this));
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
    this.stage.removeChild(this.tipsContainer, this.container);
  }

}

/***/ }),

/***/ "./src/model/gamePlaySource.js":
/*!*************************************!*\
  !*** ./src/model/gamePlaySource.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  id: 'background',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/game_background.png */ "./src/assets/images/gamePlay/game_background.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'fixedTopBg',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/fixed_top_bg.png */ "./src/assets/images/gamePlay/fixed_top_bg.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'rollBg',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/roll_bg.png */ "./src/assets/images/gamePlay/roll_bg.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'tree',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/tree.png */ "./src/assets/images/gamePlay/tree.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'woods',
  src: (__webpack_require__(/*! ../../src/assets/images/woods.png */ "./src/assets/images/woods.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'snow',
  src: (__webpack_require__(/*! ../../src/assets/images/snow.png */ "./src/assets/images/snow.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'guideLogo',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/guide_logo.png */ "./src/assets/images/gamePlay/guide_logo.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'guideText',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/guide_text.png */ "./src/assets/images/gamePlay/guide_text.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'hand',
  src: (__webpack_require__(/*! ../../src/assets/images/hand.png */ "./src/assets/images/hand.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'leftArrow',
  src: (__webpack_require__(/*! ../../src/assets/images/left_arrow.png */ "./src/assets/images/left_arrow.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_2',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter_2.png */ "./src/assets/images/gamePlay/batter_2.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_3',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter_3.png */ "./src/assets/images/gamePlay/batter_3.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_4',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter_4.png */ "./src/assets/images/gamePlay/batter_4.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_bg',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown_bg.png */ "./src/assets/images/gamePlay/countdown_bg.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'gameover_text',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/gameover_text.png */ "./src/assets/images/gamePlay/gameover_text.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'jump_blue',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/jump_blue.png */ "./src/assets/images/gamePlay/jump_blue.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'jump_green',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/jump_green.png */ "./src/assets/images/gamePlay/jump_green.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'jump_red',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/jump_red.png */ "./src/assets/images/gamePlay/jump_red.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'jump_yellow',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/jump_yellow.png */ "./src/assets/images/gamePlay/jump_yellow.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'overtime_bg',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/overtime_bg.png */ "./src/assets/images/gamePlay/overtime_bg.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'progress_bg',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/progress_bg.png */ "./src/assets/images/gamePlay/progress_bg.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'progress',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/progress.png */ "./src/assets/images/gamePlay/progress.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'speed_quotes',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/speed_quotes.png */ "./src/assets/images/gamePlay/speed_quotes.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'volume_close',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/volume_close.png */ "./src/assets/images/gamePlay/volume_close.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'volume_open',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/volume_open.png */ "./src/assets/images/gamePlay/volume_open.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_0',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/0.png */ "./src/assets/images/gamePlay/distance/0.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_1',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/1.png */ "./src/assets/images/gamePlay/distance/1.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_2',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/2.png */ "./src/assets/images/gamePlay/distance/2.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_3',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/3.png */ "./src/assets/images/gamePlay/distance/3.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_4',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/4.png */ "./src/assets/images/gamePlay/distance/4.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_5',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/5.png */ "./src/assets/images/gamePlay/distance/5.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_6',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/6.png */ "./src/assets/images/gamePlay/distance/6.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_7',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/7.png */ "./src/assets/images/gamePlay/distance/7.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_8',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/8.png */ "./src/assets/images/gamePlay/distance/8.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'distance_9',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/distance/9.png */ "./src/assets/images/gamePlay/distance/9.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_0',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/0.png */ "./src/assets/images/gamePlay/batter/0.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_1',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/1.png */ "./src/assets/images/gamePlay/batter/1.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_2',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/2.png */ "./src/assets/images/gamePlay/batter/2.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_3',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/3.png */ "./src/assets/images/gamePlay/batter/3.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_4',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/4.png */ "./src/assets/images/gamePlay/batter/4.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_5',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/5.png */ "./src/assets/images/gamePlay/batter/5.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_6',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/6.png */ "./src/assets/images/gamePlay/batter/6.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_7',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/7.png */ "./src/assets/images/gamePlay/batter/7.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_8',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/8.png */ "./src/assets/images/gamePlay/batter/8.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'batter_num_9',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/batter/9.png */ "./src/assets/images/gamePlay/batter/9.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_0',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/0.png */ "./src/assets/images/gamePlay/countdown/0.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_1',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/1.png */ "./src/assets/images/gamePlay/countdown/1.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_2',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/2.png */ "./src/assets/images/gamePlay/countdown/2.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_3',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/3.png */ "./src/assets/images/gamePlay/countdown/3.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_4',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/4.png */ "./src/assets/images/gamePlay/countdown/4.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_5',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/5.png */ "./src/assets/images/gamePlay/countdown/5.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_6',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/6.png */ "./src/assets/images/gamePlay/countdown/6.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_7',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/7.png */ "./src/assets/images/gamePlay/countdown/7.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_8',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/8.png */ "./src/assets/images/gamePlay/countdown/8.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'countdown_9',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/countdown/9.png */ "./src/assets/images/gamePlay/countdown/9.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'scorePanel',
  src: (__webpack_require__(/*! ../../src/assets/images/gameOverScore/score_panel.png */ "./src/assets/images/gameOverScore/score_panel.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'btnRestart',
  src: (__webpack_require__(/*! ../../src/assets/images/gameOverScore/btn_restart.png */ "./src/assets/images/gameOverScore/btn_restart.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'btnShare',
  src: (__webpack_require__(/*! ../../src/assets/images/gameOverScore/btn_share.png */ "./src/assets/images/gameOverScore/btn_share.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'light',
  src: (__webpack_require__(/*! ../../src/assets/images/gameOverScore/light.png */ "./src/assets/images/gameOverScore/light.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'overQuotes1',
  src: (__webpack_require__(/*! ../../src/assets/images/gameOverScore/over_quotes_1.png */ "./src/assets/images/gameOverScore/over_quotes_1.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'overQuotes2',
  src: (__webpack_require__(/*! ../../src/assets/images/gameOverScore/over_quotes_2.png */ "./src/assets/images/gameOverScore/over_quotes_2.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'roleMaleFastLeft',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/role/role_male_fast_left.png */ "./src/assets/images/gamePlay/role/role_male_fast_left.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'roleMaleFastRight',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/role/role_male_fast_right.png */ "./src/assets/images/gamePlay/role/role_male_fast_right.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'roleMaleLeft',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/role/role_male_left.png */ "./src/assets/images/gamePlay/role/role_male_left.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'roleMaleRight',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/role/role_male_right.png */ "./src/assets/images/gamePlay/role/role_male_right.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'BGMMP3',
  src: (__webpack_require__(/*! ../../src/assets/sound/BGM.mp3 */ "./src/assets/sound/BGM.mp3")["default"]),
  type: createjs.Types.SOUND
}]);

/***/ }),

/***/ "./src/model/gameScore.js":
/*!********************************!*\
  !*** ./src/model/gameScore.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameScore": () => (/* binding */ GameScore)
/* harmony export */ });
/* harmony import */ var _controls_gameState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controls/gameState */ "./src/controls/gameState.js");
/* harmony import */ var _utils_loadQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/loadQueue */ "./src/utils/loadQueue.js");


const font = 'Microsoft YaHei';
class GameScore {
  constructor(stage, options = {}) {
    this.stage = stage;
    this.loader = options.loader;
    this.score = options.score || 0;
    this.container = new createjs.Container();
    this.sourceComplete();
  }

  sourceComplete() {
    const loader = this.loader;
    this.backgroundAlpha = new createjs.Shape();
    this.backgroundAlpha.graphics.beginFill('rgba(0, 0, 0, 0.7)').drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
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
      _controls_gameState__WEBPACK_IMPORTED_MODULE_0__["default"].restart();
    });
    const overQuotes1 = new createjs.Bitmap(loader.getResult('overQuotes1'));
    const overQuotes2 = new createjs.Bitmap(loader.getResult('overQuotes2'));
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
    const {
      width
    } = scoreNum.getBounds();
    scoreNum.x = (this.stage.canvas.width - width) / 2;
    scoreNum.y = scorePanel.y + 108;
    this.scorePanelContainer.addChild(light, scorePanel, scoreTitle, scoreTitle1, scoreNum);
    this.container.addChild(this.backgroundAlpha, this.scorePanelContainer, overQuotes2, overQuotes1, btnRestart, btnShare);
  }

  render() {
    this.stage.addChild(this.container);
    this.stage.update();
  }

  destory() {
    this.backgroundAlpha.removeAllEventListeners('click');
  }

}

/***/ }),

/***/ "./src/model/startPanel.js":
/*!*********************************!*\
  !*** ./src/model/startPanel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameStartPanel)
/* harmony export */ });
/* harmony import */ var _utils_loadQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/loadQueue */ "./src/utils/loadQueue.js");
/* harmony import */ var _utils_tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/tool */ "./src/utils/tool.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_2__);




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

class GameStartPanel extends events__WEBPACK_IMPORTED_MODULE_2__.EventEmitter {
  source = [{
    id: 'mainPng',
    src: (__webpack_require__(/*! ../../src/assets/images/start_background.jpg */ "./src/assets/images/start_background.jpg")["default"]),
    type: createjs.Types.IMAGE
  }, {
    id: 'startBtn',
    src: (__webpack_require__(/*! ../../src/assets/images/start_btn.png */ "./src/assets/images/start_btn.png")["default"]),
    type: createjs.Types.IMAGE
  }, {
    id: 'iceRole',
    src: (__webpack_require__(/*! ../../src/assets/images/ice_role.png */ "./src/assets/images/ice_role.png")["default"]),
    type: createjs.Types.IMAGE
  }, {
    id: 'snowRole',
    src: (__webpack_require__(/*! ../../src/assets/images/snow_role.png */ "./src/assets/images/snow_role.png")["default"]),
    type: createjs.Types.IMAGE
  }, {
    id: 'startTips1',
    src: (__webpack_require__(/*! ../../src/assets/images/start_tips_1.png */ "./src/assets/images/start_tips_1.png")["default"]),
    type: createjs.Types.IMAGE
  }, {
    id: 'startTips2',
    src: (__webpack_require__(/*! ../../src/assets/images/start_tips_2.png */ "./src/assets/images/start_tips_2.png")["default"]),
    type: createjs.Types.IMAGE
  }];

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
      height: this.stage.canvas.height
    };
    const scale = (0,_utils_tool__WEBPACK_IMPORTED_MODULE_1__.scaleTarget)({
      width: this.homeBG.image.width,
      height: this.homeBG.image.height
    }, canvasRect);
    this.homeBG.scaleX = scale.scaleX;
    this.homeBG.scaleY = scale.scaleY;
    this.startTips1 = new createjs.Bitmap(loader.getResult('startTips1'));
    this.startTips2 = new createjs.Bitmap(loader.getResult('startTips2'));
    this.startTips1.x = (canvasRect.width - this.startTips1.image.width) / 2;
    this.startTips2.x = (canvasRect.width - this.startTips2.image.width) / 2;
    this.startTips1.y = canvasRect.height - this.startTips1.image.height - 155;
    this.startTips2.y = canvasRect.height - this.startTips1.image.height - 121;
    this.startBtn = new createjs.Bitmap(loader.getResult('startBtn'));
    this.startBtn.x = (canvasRect.width - this.startBtn.image.width) / 2;
    this.startBtn.y = canvasRect.height - this.startBtn.image.height - 49;
    this.startBtn.addEventListener('click', () => {
      this.emit('start', this);
    });
    this.iceRole = new createjs.Bitmap(loader.getResult('iceRole'));
    this.iceRole.x = 20;
    this.iceRole.y = canvasRect.height - this.iceRole.image.height - 199;
    this.snowRole = new createjs.Bitmap(loader.getResult('snowRole'));
    this.snowRole.x = (canvasRect.width - this.snowRole.image.width) / 2 + 77;
    this.snowRole.y = canvasRect.height - this.snowRole.image.height - 228;
    this.container.addChild(this.homeBG, this.startBtn, this.iceRole, this.snowRole, this.startTips1, this.startTips2);
    this.animateRole();
    this.stage.addChild(this.container);
    this.stage.update();
  }

  animateRole() {
    createjs.Tween.get(this.snowRole, {
      loop: true
    }).to({
      y: this.snowRole.y + 10
    }, 500, createjs.Ease.quadInOut()).to({
      y: this.snowRole.y
    }, 800, createjs.Ease.quadInOut());
    createjs.Tween.get(this.iceRole, {
      loop: true
    }).to({
      y: this.iceRole.y + 10
    }, 500, createjs.Ease.quadInOut()).to({
      y: this.iceRole.y
    }, 500, createjs.Ease.quadInOut());
  }

  loadSource() {
    this.loader = (0,_utils_loadQueue__WEBPACK_IMPORTED_MODULE_0__.loadFiles)(this.source, this.sourceComplete.bind(this));
  }

  destory() {
    this.stage.removeChild(this.container);
    this.removeAllListeners('start');
  }

}

/***/ }),

/***/ "./src/model/weightsAlgorithm.js":
/*!***************************************!*\
  !*** ./src/model/weightsAlgorithm.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WeightsAlgorithm)
/* harmony export */ });
class WeightsAlgorithm {
  matrix = [];
  colors = [];
  stepWeight = 5;
  maxWeight = 100;
  maxColNum = 2;

  constructor(stage, {
    row,
    column,
    loader
  }) {
    this.stage = stage;
    this.row = row;
    this.column = column;
    this.initColors();
    this.initMatrix();
  }

  initMatrix() {
    this.matrix = [];
    const {
      row,
      column,
      matrix
    } = this;

    for (let r = 0; r < row; r++) {
      let col = [];

      for (let c = 0; c < column; c++) {
        col.push({
          bitmap: null
        });
      }

      matrix.push(col);
    }
  }

  initColors() {
    const jumpRed = 'jump_red';
    const jumpBlue = 'jump_blue';
    const jumpGreen = 'jump_green';
    const jumpYellow = 'jump_yellow';
    this.colors = [{
      weight: this.maxWeight,
      rise: false,
      bitmap: jumpBlue
    }, {
      weight: this.maxWeight,
      rise: false,
      bitmap: jumpRed
    }, {
      weight: this.maxWeight,
      rise: false,
      bitmap: jumpGreen
    }, {
      weight: this.maxWeight,
      rise: false,
      bitmap: jumpYellow
    }];
  }

  setOptions(options = {}) {
    if (options.row !== this.row || options.column !== this.row) {
      this.row = options.row || this.row;
      this.column = options.column || this.column;
      this.initMatrix();
    }
  }

  generate(options) {
    this.setOptions(options);
    let prevRow = [];
    let circuitBreak = 0;
    this.matrix.forEach((row, index) => {
      let colCount = 0; // row.forEach(column => {
      //     const random = this.random();
      //     let currColor = this.colors[random];
      //     if (currColor) {
      //         const currWeight = currColor.weight / this.maxWeight;
      //         const index = Math.round(random * currWeight);
      //         currColor = this.colors[index];
      //         column.bitmap = currColor.bitmap;
      //         column.index = index;
      //         this.handleWeight(currColor);
      //         ++colCount;
      //         circuitBreak = 0;
      //     }
      // });

      for (let i = 0; i < this.maxColNum; i++) {
        const random = this.random(this.colors.length + 2);
        const randomCol = this.random(this.column - 1);
        const currColor = this.colors[random];

        if (currColor) {
          row[randomCol].bitmap = currColor.bitmap;
          row[randomCol].col = randomCol;
          ++colCount;
          circuitBreak = 0;
        }
      }

      if (colCount === 0) {
        ++circuitBreak;
      }

      if (circuitBreak > 0) {
        // 如果短路次数超过1则随机补上一个
        const random = this.random(this.colors.length - 1);
        let currColor = this.colors[random];
        row[random].bitmap = currColor.bitmap;
      }

      if (colCount > 1) {
        // 如果本行的列数超过1 则出现重复叠加次数减少
        prevRow.forEach((col, index) => {
          if (Boolean(col.bitmap) && Boolean(row[index].bitmap)) {
            row[index].bitmap = null;
          }
        });
      }

      prevRow = row;
    });
    return JSON.parse(JSON.stringify(this.matrix));
  }

  handleWeight(color) {
    if (color.weight === 100) {
      color.rise = false;
    } else if (color.weight <= this.stepWeight) {
      color.rise = true;
    }

    if (color.rise) {
      color.weight += this.stepWeight;
    } else {
      color.weight -= this.stepWeight;
    }
  }

  random(length = this.colors.length + 5) {
    return Math.round(Math.random() * length);
  }

}

/***/ }),

/***/ "./src/utils/loadQueue.js":
/*!********************************!*\
  !*** ./src/utils/loadQueue.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadFiles": () => (/* binding */ loadFiles)
/* harmony export */ });
function loadFiles(files, callback = () => {}, progress = () => {}) {
  const queue = new createjs.LoadQueue(true);
  queue.installPlugin(createjs.Sound);
  queue.addEventListener('complete', event => {
    callback(event, queue);
  });
  queue.addEventListener('progress', function (event) {
    progress(event.loaded * 100);
  });

  if (Array.isArray(files)) {
    files.forEach(file => {
      queue.loadFile(file, true);
    });
  } else {
    queue.loadFile(files, true);
  }

  return queue;
}

/***/ }),

/***/ "./src/utils/tool.js":
/*!***************************!*\
  !*** ./src/utils/tool.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scaleTarget": () => (/* binding */ scaleTarget)
/* harmony export */ });
function scaleTarget(targetRect, sourceRect) {
  return {
    scaleX: sourceRect.width / targetRect.width,
    scaleY: sourceRect.height / targetRect.height
  };
}

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./src/assets/sound/BGM.mp3":
/*!**********************************!*\
  !*** ./src/assets/sound/BGM.mp3 ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "src/assets/sound/BGM.mp3");

/***/ }),

/***/ "./src/assets/images/gameOverScore/btn_restart.png":
/*!*********************************************************!*\
  !*** ./src/assets/images/gameOverScore/btn_restart.png ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "476d7bf07a145348fd3af65a42a6bbe9.png");

/***/ }),

/***/ "./src/assets/images/gameOverScore/btn_share.png":
/*!*******************************************************!*\
  !*** ./src/assets/images/gameOverScore/btn_share.png ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "af21df9096c37cfa089d5ad89e8aa27f.png");

/***/ }),

/***/ "./src/assets/images/gameOverScore/light.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gameOverScore/light.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "be8336a1d2525231ef03c621b5c8f991.png");

/***/ }),

/***/ "./src/assets/images/gameOverScore/over_quotes_1.png":
/*!***********************************************************!*\
  !*** ./src/assets/images/gameOverScore/over_quotes_1.png ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "22f48f23b24f25fbb8c51b1f523b280e.png");

/***/ }),

/***/ "./src/assets/images/gameOverScore/over_quotes_2.png":
/*!***********************************************************!*\
  !*** ./src/assets/images/gameOverScore/over_quotes_2.png ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "f8018b8935b0d9043be08c77731c6bf1.png");

/***/ }),

/***/ "./src/assets/images/gameOverScore/score_panel.png":
/*!*********************************************************!*\
  !*** ./src/assets/images/gameOverScore/score_panel.png ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9efcfd00462a1a1dd22d88575dff75eb.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/0.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/0.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAACTElEQVQoFWWRXUiTURjHH993a3NfrH30YS1zhJI2qMtadVOwzaGVN7UuyoIsJIJurKguKpibRhcDqYwKCYwK88JgjD4IRaFgV0WhazOwjc21ttb2tvV+nM7jZJqdi8Pz/P//3znved4aWLbkbX2dBrXyuIxlGqhMBEmc/VEoPeTHLjxaFquUyrb+O6zLJ01/yxBelMgfQSRYb+++n1O29w/+A7Ct/hOHvaPzEiHk/N1XBWvn7SQ4vORMIMgJFG7puldg3b0nEWJws5g0py977OYbw5PC0MsPk7EUbwOVfO3o1Mzrp+OfheGLB9QWo64LswBu365D10fi+BnNpwbnwBXQVQy60xo19A5eG4mD07uTAQm27G6xmKKJLPCSNAvBc/kqQGvU0Ntrs5io3sgYtIr6OqNmVfonB6JI5qrhxQI19DBj0KrqGV2t0kobyHNlehmkVwKooVdn0IJOpWhg6GB+c2Ue5DIWJFGs/Q+gGnqYkUAqMd/zXDSVLYJaKQeFXL704EUSNfRSuSJkcqUoUywJqfkcV7Su04MgittW3oAaevTQYrHMJxlgydTjt5+yeo2SPkxrBrd/axVy3WxGDT2ayWF2wdt0bOBZKBwj76YTZL0nMANOfwc4fUfwb3/8miboYQbDNQuEo28PgDAeG+qGL3Tmt56/LzRtNAgd9ib9BqMWXFeexCPxvAdCPRMVAClH737LGt2Dq0ftq22bzRqUwpFk4exASANMzT4IXnqD2hKAXau3EQi005nvwDaR+RUGmWwMXvREsMf1F0bKEk3BCrQcAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/1.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/1.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAAA70lEQVQoFWNkQAeB3WKirGxT+bnZ+X/9+XP80eKcenQlCL5Pp5lC/LQrW07e/nXuzov/EhGT7iEkISwWECWfNlOS4cefTdpyIrJN8XbiBkriDB++/mDg4mD5hq6BCSTA+PPvxBl5Hiara4LEy+fu/3zs2pPf6AphfLAGBob//w9ffvxBJ332pb0XH0w+dv3pH5gCdBrspG8//q7sXXfq9M8/DOsZ/jOaoStC5oM1vFqZtw4u6NGOVwPUSXDlBBmjGggGEVABOB7QFS7ec4Xt79//DK8/fpNAl2NEFwDzPdriGRiZ2ICxfohhR/lNZDUAsDNSipkJd/QAAAAASUVORK5CYII=");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/2.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/2.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAACVElEQVQoFWNkQAYenc6KErz5//8zaDAzMbIxMDK8+fj11943P/+1M2wo/ICslIE/uH+aXOzUz2duP////suP/19//P7/8NXH/12rT3wTi5j4gMFvgjhIAyOIYPbsDHDUl523uSlMsHPV8S9L9l398B9ozd1n72UeLclhOHf7xf/UCdsuvv7MZMHE4DuTS0aUp31xmZ/ghPWn/7QsP/rxzu/PGnfnZ8oyMDKGxXRu+uRlpsxoqSUjyvD/pzoTA+M7KUUJAR4xAW6GaZvPfvvDyGbOsLj0K8hmhh2Vq19/+v4c6EQGcw0pXgamvzpMDL8YJc7feSlaNGvv+w9ffvxl2Fz4DKwYRCTM5/j09YeAIA8H0HkffjD8+/+MiWFHxZGPP397Ttx4JvrzLwZDoDP+wzTwf3o/xc9CjQ/oHYbTN599ZWBivQ+TQ6VDV7FJxUxuCG5Z9+bvv///sybv/CIY0leFqgjG8+xSlo2deqB64cHP33/9+V8xb/8X3sDeywwN+1lgSuA0m29XpEbqzPs7z9779+Dlx/9etateiUVMmsUQuooZrgjGEAjpzzXImvfu8etP/7eevvtXPWXmXTaf7kCYPCrt2e5kmDPvLSh2J20881UyatIpBt8OOVRFEB4jg+ckdnlRluMb6oMNX7z/wuBZvZKBl5u9nYWZCRIXUF3AmGf8IMTdyQKKPV0FSTEDJTGGP/9EGZZV+IOUVELVwalpW879O3LtyTOgz/8on7/7QnzmtgtwSWwMoHPB6Q5MMHh0JjMw/mfCphAu9p/xH8OO8rkAzuMCk09zjOAAAAAASUVORK5CYII=");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/3.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/3.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAACvklEQVQoFWNkQAJsvl2R0sI8mf/+/ZdlZmJiAkp9+Pbr9+EX7772MOyofIBQmjaTlTew97J83NQft5+9+//t5+//P3///f/83Zf/c3de/C0VNfkVg0+HPkgDI4gQi5jYF+esm9oSb8dTteDAz51n73388fPv77vP30s/WJTN8O//fwbb4iX3nn77bsnEENrBL8TDEdyZ7MjjUb3y76I9V7uuvhOQvbsgU4aBkTEoqnPTRykhHgZbHRlOhh//lJgYvjLoP3r9SWrC+lN/z9x5/uuNAEczw+qwXyCbge5e/+HL91efv/9i0JEXZWP4/18B7CQGj44IBqZ/nAwsjIcZNlXeASsGEV5t5swMTMc+ritisipY9OTS/XdREA1wFUCGT5+0OC/zFhE+TsavP/4oLSj24V139Obb+bsu3vu8vsSMBVktmP37h1Oqh412upcBq7ggN0NE+4av647cFGbgYtUCyWPa4Nmjxc7875S0CO+XJ28+iR7pjWU6du3ph6JZezj+8SjzMAI9wsiQuIAdbPqCxB9gGkSErmJm+HTPQ1maf/H+zmjBlP5t73adfdDELHxdsIb1+7eN4iz/s0SN/fjeXdhyAKzp2ur/DHf33FawDtY3VBbXdTVS5Nx88vZTJmCwPamKsGLe1xklAXRgIEPDf1CSgIOPn3/qsrMyMzx69YnhP8P/p0x///2/uefcg9cK4vwM4faainL3pm1n8OyyZvDpNJOJmbqFhYVJxVZHluHYtSev33z8foOZ4c7eJ5+kbOXuvniv35PizM3Lxa4sxMsWZqwkHhNkraY7v9ibZda2839nbb944DOLbC08lMQjJq1QkhSwz/M3kZAS5mFgZWZiuPfiA8PC3ZdfH7r8+NtPTm4dhtXZX+AawI726jQR5GZzF+Tm0GJkZGR+8/nbpY/ffp9m2Fa+G+YpAFOdHgQAfG8kAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/4.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/4.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAAB2UlEQVQoFWNkwAU8J7HLizIvY2Zm4vv5++/tp0tysnApZWBImM8hEzP5wJRNZ/9efvD6v0Bw3weYYhYYA5kW/f6pK9Hb0Djb14gJJM7LyfYVpgMsgKyY0787ykxNMiLORYcnb/puoGv+IUszoNrg1aGrJCHQPiXbTdS9asULaVFeRlZmJnFkHQgbAvoF5IX5Fs/I9ZArmLn3zcM3n5p4ONn+ICsGsSEaGv4zSXEzzywLs9A4cOnh1+PXn6z5+ZfxMLpiuAaBK/2FbkZKroqS/Kwzt124+OorRzE2xRANXh12atLCxRVhloIFM/bcf/L2WxzD5vRvuDSwqIgLTF9R6S8Z0rzu7Z2n73sZ/jEYM7h3GDP8/8395sM3NpBGYFCxAsXCGJgZ77EI8LDzigtwM+QFmHA9ef2lG2byf6DOAEt1sIa5hV68F++9nte28hgTy9WHb0QnbzrzHaSQhYURHmr//jEB+UyMIHE2YNgC5f4z/P/PyMjg1WbO8I9RCSSBAv4zcLsbKzbuaA2XYvXu/PPn3/84Bqb/91DUoHC8u3V8G1Y/+Q8EsjFTnsLk4E6ACSDThy8/FgEGM8Pj158lYeJgN8I4GLRXuwfDf0ZZhn9MZxl2lp0DyQMAd8qjelpXCJMAAAAASUVORK5CYII=");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/5.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/5.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAACoklEQVQoFW2Ra0hTYRjHn3O2ue2oJ3WbbeVlTpsgaKSQ2gXKhhsMQ/0gJUhoF4uSVCizRvkpUcOgQisQFkKlJEjhJcRuRGjhajYFcbM5THNe5q7unJ2d07ZaEPp8et/n+f/e98/zRyBQsqrHCqD9jSiKUMH7duUlKctC2sVqdnDI+Knarnp1gWgHtp021CtoeGoDs7YmBLBQRJAcj8PU/Krr2btpFxtFt4AeguQDHUmHAIpmBEIcA432vXvSvHISENS7hWAzi9BfRrLh3CMOEH4MxyLAQ/goEIvHQFvphYq2SOi+4gaGQQBBmPADKMx7hCIco92ED0iKJgRuhya1slMn50QbpKc6psXl93tB1SwNA2xgEUKxIBJ1e31gsdplmvJDdaeVWVhMFA98FA3fTMvy6nvDeT9UzaUw3PgFAXXL0fPKvT2dNUrRyFczNHV/XP655nQhgd05N8nk7w/PcpfWXbD/spb0C1hxLEg9Jp1dXK/Sz1lXut9MLUwYrSp7X92tDf3gg83EI2PjM4tFDWX5fJphHB/GLWYWGEfNRIpiwGBZ7bE6Pb0weG0q7BdMo3O78oqLc9LECYEe/+3kvA4FdXMsAJ0RiE8Owp0z/8R/Dzan17Bi90CiCAd+BEeG4tyIm7l7JE9ulOV3ZfL8L/8Dmhh0zbFZmCDEYWL2F7m84f6EOjzESEaScPX6iQO8JBGexy1qHQBVW1ZUyd0CXN9uLj2YLpDvjoOBz8YlP40YkWBwEhfxPDtNcrxPU8KuuPOKcbqJDZkklqvYJ8UKc1LgTPuQ47XO1GJ7UX8bCVkIfB2tb9flpksk1erseJk4BmwubzAX/6WOEYrDYmntfbUXgon/AcLGla2H42N4iiiMk0nTYF+yOQyED+mHoaumsOQ3qP8bsU/smRMAAAAASUVORK5CYII=");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/6.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/6.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAAC2UlEQVQoFU2Sa0iTYRTHz3uZU9emzsvc1HTlLZWMLjK1KCPYzDTEGypFYX4qSypU6ItUGGsSpGHWBynCImwkOjEsyS7mheUF0zQ1L21O3ebcXnfx3eVtr0J5PhwOz/n/zsP5cxDYGZKa5EBfVjkDRQ96MXEPygUmi93es0xYZNBetbhTCiC5lw3iGur90Bxld7oozdoGtWwwU/VtSjv9DqfvB9MAskWlS0VHongvFbfzhI/bhy1NXaMmp8vlUOuIUFVzGah0Jsi9+1apMjKOozQg8GOVVOSLwl/1TJCvP080LxLkPnVzWRiGYzk5d+REAMcbIng+IUAahAhkSQXxfG6/sv5iWNLVZ6oxlUkEiuvqrZ/dKbb0aQ1pd5wyWUiWzmzNxMEOSdkp0ezR3ytA2p1DXpijkH+hIdXuoOKZDEytNZrH9QSWAZ3lWnoIjiIUL8Sfw9EZraAxbCQUnUg4ekmSyI3bHQB/tKaosXltSlXTR/GCRHoG3lVOIYKielnDFfFNnh8LVtctlu6ROUfH4KwJQcDJxPHAT7XF3j8X9XDsxgsAPt8LZeCYv+8uTxDFCuBR23ePxo7hvtkNa/TM7tjIaY3hfFb1G0NSjABuFaauw7KmAF/fsE7Ttq2bN2FKpSdIRaVka+EWABJA7rz2/PLA5FLafmGQbwCHtRc1WslFt9+2NcIKPizm7JZ4R7LYHBN6dy8kgA2eTCwCBQyd7h5Z0NNeYygihPQ65j89RSFakzkvLJANY3OrTq3BMoCConLw67jKpZzWQIn4gF94IPaBkSkVQYYsgZPzQHEoMpiduIcHrX2/ljad8GN7mPvoYkufrMyvGKmWL5PUOVkbcbZarq6VD9hspIMqa+gyBxXU1dLi7VuiqwxpWlwIt7H4ZHxoojDIm7Z5fEFLPWxV6mY0hl4CC8uFlnznf4CGJNIYQFyHQ7nsZJyB8vVGWz9hc3yDzopeuk3HXx5kRQKhmPjIAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/7.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/7.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAABs0lEQVQoFWNkCOwWk+RkX8vNwfaNAQ/4/vP376fv/kexMHz/Y21rqmpUG2XNhUc9Q/qk7e+fvn2qzsLAwPTp8JXHTLO2nX+LruH/fwYGO11ZziBrdS45Ub4vx5ifsbIw7Cjf+9yrw33ylvPs6BqYGP4r/fn3r9NSU5rh+I1nnxm4lE6iq0HhK8ZPO3Luzov/PWtOfucN6isGSTKhqEDmeLSbqkoLKukqijEs2H3pzedfDCvwapAS4k1L9zKS2Hv+AcPHbz+PMGwpeopbg98EcQEedncvM2XGebsuvnr85vNsmOVYncTH/C8q3kVH5OX7rwwnbzx/xcCjfBCmARisaCBtJqvQz7+pUY7anMv2X/3+5tO3OQwbwv7CVGHa8PC9m6OenKiYADfDwt2X3379xwL2LE4NChJ8OUnu+iK7z91n+PT99wGGTQUvYYpBNKoNnj1aUsK8etbaMgzzdl16+eTt1znIijE0SAiwJWd4GYjfe/6B4dztFy8ZzEsPo2tAeDq0g//Fuy9Fn7//Yojp2vT71cdvMxkaGP+ha2BEEfBq92D4zyjLwPjvOcO2qi0oclAOAIVOoiNN1f2vAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/8.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/8.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAACxElEQVQoFUVSC0hTYRQ+99+cOnXqnMvhTJ3OxeartBGGkPRQK8tHGZIoEUaQQiqGFEQPULSHFdljQVFJFCKE5SsyCTF6GC50pfnK6Rp7511uc9u9t92N9If/cPge5z+c82Pw/xy+HshDqDGMHZDrIkgBDTMR9tvy19lvxuw3oLNxmcYwOkBecxxQ1HxD6TZ7VV56IIvJ8MJONwEv3v+w3+4e1eksZBYM1Gox8FQW+rOG2k/tkafE87HKK69xE27XuAiCOa0xi9Ud1fBzyUwdaXo5ZQoK3YwAd4qSYyOFOWmxmKjyDgyr1GXfH1RJpx+eTAJA+wsvdlnkEgGWIY4KAa0uAQECUUp8JEP3ZwU8L4xC/9lebz90GGjscbmJWZpLFfEZtBYBhhZHVBprVHgwWO1OMeS2blkzePLxeX0mzX2e1OK0FoMLQ8zgsa/DZTmypIpdyeHZ9U8xkYCrpE0cth//bk2eoE4xaJvRWnoMnIByX7H8W5GQ20Qp+pROu9NNqQ2499J53f1BF83BvmYRLfZMqT0Y8GXr44YCmyyWx778bMShWjB6Z064yYiu88XMRYPVdrytd8koTZUhLrgaaovljp3pcezM6kfQMzp3cMbKjZ7ZKBGqTXhhdn2HI03EZ9ccyIgJnVBegsRj9958m9NTT96Ok6El1875elyPshOKFg9HKed0FK1FFFBuz5KAwUAYQmhduZYhP4QwcBMkkBTlYhqtDuXkomm3Z3FMHoddwyq7qdPhtndAMrCIEP8S1YK+Nn9rAvR9mXUbcLsSg72tUUC4tR/aKkAczYXylm7SSZAmBgZUesIG3ukiOVLrl+Fo66vJefPqDt/nK7i6KSYs4HlRlkS4XSqMiOaFeBvSGK0wqPxlVvSOcQExE6HvzKzPQNOeBcLHT4f4YYHSIH+WhIZWVp1Teot9AjiiLugsJWjsH0SmNDJ2+XsuAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter/9.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter/9.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAC2HIDeAAAC3UlEQVQoFUWRW0jTcRTHz//i7pu76uYlL2izVFRKy8ACtZrNGYijh8oUIsGHyEs3H8IedKVmadLNl8oE0VI0QsNSI9QQkULUJgst53Jzzl3cRaf7NV3iefj9fvA733M+53sw2I2sRiqf5bnJY1NPAYLgLQ9y4xhM6kyOHldP+avdNN+tqBPC6WpU3jxg+7mwgiz2dbRic6LhaS1SVnUtic41qPYEynYi5HxTX+vA1JbR6kDZd9qXIwueasLynywfK3m9aba7UF5Vl5WiqLnlE8lUyuKmj/pNLwMpv7eFZ6nKdj4qEe6fV19xpbHXObdkRpzcegMo2yk4m04NT5FKRGNqHQTx2V88vbcf+ASYx/K2tHp0etHIYVKh8GQ8AptGhnOYlAORYh7mZQaSIKb3WH0vDEBntDhAGsIXEBgeiJusrh9qrcnjrQ5eVw4DQt6c/6F4zpjTWxIlfBZIBGxCxGVG4U63e6ZtaMqYFBUIyfslB8nsGi3IqlNBdj+DjllnSnKTCTadAmIeE6h+eCgBms+/9MKjl0gc5z0syqALOXSayJ9xNjUmSFl0Jklc8XIIOxEfhulX7dD9bfYDvt3cwRMmN3SPd1yoea8jCRzPz4wPjJRw2c293+cFLHqXc8MNOpNtU7/q0pA7tBYj5+86KmsdnErrHFFLuExarMG8Nup1Wi0NFlQFcJnQPzFvBgxWSJCrDlHcnpHYCJHBZHMu/X5VnOLEMLRTSF4bJ+azpKEiNnQOqy0gxPtxIOhaaYjAMP64MCQ9ITyOllPXB4raCO/gObDpnrx7MS2obWhmw7y20QIt1+0EqPvsRHRm8qxuNebZVRlVs2iKwBAqyDkSrXhxLYuhNa5tVb75OrO0Zr8Bs58sPs8rB0n6xPif9IQw2uWsRF5YAAfsLje8G1abH3WOcYFG3QfdZQvbmHtL2l6YXCUX+7OOM6hktNXpNhgtrjFg+3VBR6lpZybv8Q+0py9RjcZNlwAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter_2.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter_2.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "7cb6c56f041a3d6bd78095bfe8cf59d4.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter_3.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter_3.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "3f4cc8f7bcf3fdde6f712f0648b7a5d0.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/batter_4.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/batter_4.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "b3ebb16ac1685759a4c2866f7cdf32be.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/0.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/0.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "daef40fb98ed22ffce40b91f1a1b6686.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/1.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/1.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAYAAABFlhkzAAAAAXNSR0IArs4c6QAAAotJREFUSEu1ll1IVEEYhp/x6LqVkQVBeVGRXRQRIUQQRCylu1kQEQRdBFY3/UBEFsmeY7axevqhoJvoh4KobooIIpSdoxBdCGHohVEQXZnQRUVRopC6Z2L3HKvN/bXpu5yZ731m5vveOUfwn0Pk1W+M1+Iat0AFMta5XKPbul/M3nIDQhcXEZjsRbB8upAag+R6ZNvrQpDcgHBHA0IkgLKsIornOGZo5oBUZuTcJVAncouoJqR1Nx8kfw1CsXLKgzUZAoZ7DGhOjynacczTMwdkywzb1xEcTE+5HKLbvKEb0IlgW1pUsJ2E2aUbMIhgjQdQa0lYg3oBEfsLMD8tWi4W0Bn9qg8QilVRGRjxBUeRZtW/tenf2fXxVRjGG29YvUVaK/UCPPM5vmgP0mzQDTiAELf9E9xBWvt1A84gRMwHxJFWm15AxD4FXPBE3Z3I1id6AY1HK3EXD+A9dEcKiXteLCU2ty+loqwPwWES5uNiUksDhO2XCNaBGubzUC39NycKQYoHhGJBAoExRPrU48jxWRBz9QEisRUQeOd30BDSWlZIvLQabI2HUMYzz8T04pgbNQM69qLEPV/0AdLcoxcQ7ogihO1f0WWkdVI34CpCTPX+caR5RS8gYqdcu8OvwW4c85FuwABQlxZNGhvoaXmhG/ARWOidwF2C0zo8c0Dqd2Xkw28TBquDzKn+5pssyfdPcxkfnfwF6K9J5jLddCfX27sweAgYxezQr8l7RLAO2Zz6XmdEJiDcvgnKJIJg0eJTC5V6imN5TfBHZAIi51dDsg/E7CyAVA1eAVuywpWI4UTP5gekZsN2E6iWzG2ICZJiH8aPIVRFJzAvc76sCxnNarziX9OS78xL+AkmErsjHONcBgAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/2.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/2.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAYAAACqVHINAAAAAXNSR0IArs4c6QAAAzdJREFUSEu9ll+oFGUUwH9ndr1es0woqMgyxCgDMb0QXAOJ2nvnSr1EroQ9lBElGYIaqbNe2WL/BNW1l1AMwR5LA1PRO+MqYiEayiUhwYeSjOrJShFT786cmJ2R3bk7s2LOdh6/8+f3ne+c7zuf8D+IJDKGqo/g6XZEeyM2yi6cwmbM8kpgWdRfXNR9FWf4XOt6POS58n1k5DuE2TGbcIGtKG8jtPurHOfCuUWc2jZ+wzceYlZzoDZgxGaq/IwwK/EUlBKONdwZ4msHK1WE9W2BlA9x+ZgsY8BDCZsYR+rzsTf96OuTa5LPZ/ir78G2ILX15xtrzxSnk+2dFtEbbg2RRxtrnuY4WDjUGfJfus6s/A3c3XAV93FGh8+mC1lcnIbXczHcm9Jz/U72Fq+kDKk8gUejBqB/YhfuuXnhb/W4hsomKqOh22lsa176ELP8BsjnQSLsx7Ge7wKk9D4YmwKIbsMpvNUFSHk7yOthJsM4VqkbEAdkIGhfXc5oYUcXINUzoHOCwDKAvaHWAVI0GJz0BRLuqtll/6Dus2BMRWQPcMeEBrwXyKBcRjOPcXDd7wmQooE5yT/b12I7WDkFej8i7c9N4OChvIRj7W71j75dg5WPEN5NviL6PSpzEabE2PiAd3CsLRN1TchA9UUM/Tp8NH0Hf240RXSMy9kcU92lQFsghPewrU/jNtiEmJVPgDWh0Qi2tTY5o1vTtEK+AvLhZVrTGLEpSSvkGNAfXqY8jrUrJUbL0DIr/jAKJp3r9VPbeDxdiD8FL82/CmQbgce9GRze+Fu6kMXFGXg9v4ZB69hjvbAz2l23QQxqMvRBP5r1a+LLeWxr5m3EbHMNIAOlPIbhd5f/Th/DLjydPmSwvBqRkTDwl9jWy92AjCCyOrwjm7nwy7oIpPkbFPreDJrjhszKeexc2rF+wXFFM4lL4jOMP9biPbAPyEUMlKt4spDaBv+zFysBJGjhE0BfgpmC/gA8mRDnJ4zrCzhQvBSnb7nxpafAOApMbjNULiJ8C7wQD9FvuDa+hCPFemeIrzVLK1BZFTEU8XC9FdTrJ5ncsxvVhycEOkPmrlc4sOpa5+NKs5ViYv0L15wAMslqJWAAAAAASUVORK5CYII=");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/3.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/3.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAYAAABFlhkzAAAAAXNSR0IArs4c6QAAAvBJREFUSEu1lluIDXEYwH/fnHWr3aj1InIrFinkmcQ64/4gDyIht82DByl2xnJkZ5YH5Yms23pVyt3OseKBXEpuIR5Ial+0qBVhz/k0Z0Z7LjPa3cbUvPy////7/b/v/92E//xJpH7TGYVKG6LVZfLLePZhTHcL6IZSmeTQ3HqyTe+L1ysBC9xaUtxBmB4BzwPHgO2AUSFXeUDX+7k8bv39V1YJMN05wG0gFWmd8g5hYqxnlWayVlM8wJeY7j7gQOUNOUreyGDkniAyIeYCv5GeWXj7Xvry6DcgY1A/dEyFgo49HwGl/tBwwP97PyPXgcikwkJe67lp3/oHYAChlXa+IDKicFJyU2hvepMcYF6mmiGDu8NrKYN/VXMl8z05QNqdgvA6AOhnPLv234/cXw8tchag0hEee45nzUgWkHbXI7QFBnCdrLU0YUCLjWhzANBWsva2ZAGmcxykIbSgiawVwOLzoJ+PYLpXgGWBRt1Iux24KzFA2vEze2aociFe498Hj8vkGAsWHaxDU1eBmrIdIwu1S/mGpuq4ubuz/xbMbx7NILkHMi4GnydnrKRjz6VieUwtilBRf3gqRu4RQnmPCDarfiUlk7lhfRoYwD+VblkLerYELwU3V4WUNjx748ABUb4xWzaDngwB1/DsIJoSi6K0k0Fkf+imE2TtIB+SA7inEDYFANlLttFJFmA67SBmAGADWetcwgD3BYQDQlEnS9BFRZ2shzpuWW+Ts6C4kynKkN5OlowFJZ2MLjzLLxllaRIV231dK+1kz/CssODFhem8TBXdnaXl43FrTyE+/BFn9tYwY0MFtePWIXI6Lsn89V5l6eblYFxAGFRigOoZuj40UDv+IsKSeON0F559JNpF/rioeAjDIhUoTxEqzC/aex7PWh1aGvEGi91p5HgYUyn9ecefVVfEwK/TPXQV93f+iJL3ush01qDsLcWLktcdVNXcJd99CWVs2fVeYdSs5caOn3Gu63s/6Gtkle37A85O6CN6kVqqAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/4.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/4.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAYAAABFlhkzAAAAAXNSR0IArs4c6QAAAvRJREFUSEu1lkto1FAUhr8zbaeKtqCoG0FExWIXiu5cCIPSxCq60K3gA0QruHAhOgkt0TZxoSAUSlUQX1tBfKBNWnR2gqBdiFjQjSCKD7DF2jKDM1cySW3npamNd5ece//vPO45ifCfl1Tobz4xn6cXJ/+Jm7IWkmECrMLU+VJAyqqnsWGAQqKPwfSd2UGsBHrDPZRk8IwL1QGa04twHPhINtdKxhqNDNHtsyCdKCZR+Q0Mdr7xz5ZGoDufgGVF0Xy+laHO19EBzgtgY3G/UhqeOVgKaO9tJD8+iYTQbK6JjDU+C8BnYGkAYB2eMVIG6F5Noe5t6MEonrkosnjKmkcyORE4J4pstnnKuekUbe9OoeqehB68xDPWRwbo1hpIFnMOfMM1FlcWebu9DyW3QsBDPGNnZMAfnJuOQLPTiDgh4DKecTQ6YKZz6hGeuaMyAs3uQ+RYCOjEM3oiA2Y6J+oKA+aRaoB7iOwKAQfwjBuzAEw7h+rCNbsrAfrMeyzb8NKPIwN05y6wu7hf1EEGzOtVAPYXkCVFQyG/dqoTI0F05zmwKdgrbbjpoWoRvANWhIb3fi/PEJ9EpB1FPSh/RjWVgJVajkg9inFUXQuDpz5Uu6Y6BXn0u5MrXR8G/OZbWSOqAvnEHoZO++n6vcpmkX0bZG8NgecoWhAWVrUrNQrJFryT/sioAWi3mik0PEPJqjKRESSXQjW2g7pWYgtmV32Y/5u46f21AZEqWrZJdw4DV8K3D3CN4KqHq/KLNluI3nMGEl3hsX5cI2jW2ACafRWRQ6GeiWsE4yY+gOMiaIGe2o9r3owXoDuvgNYQsBXXDEZ+bBHo9hhIc1GvygSYW5GL1zo5FmQHxfcvC8p/eeYIcFop4KfIJ3zFNYNvcmwpajunkVBuqDeMa4QDL64aaPYhRK4GAaj7eGYwsmOLQHe2ABkgAdKBm74UL8BX0+3+or6b7igX95/nVmRfQTu/gNyPLBnr5/8BVFONrQZ/EY8nRX+B/AKyGP8jRLpDXgAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/5.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/5.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAYAAABFlhkzAAAAAXNSR0IArs4c6QAAAzZJREFUSEu1ll1oHFUUx39nkrRpsIr9UEtR0JKHSsFCaKFCsWnsTsVKEXyKLYioVEPAPjU728KCmTGC+IUtpaVESh58MBK0YGYTZNs+mTYNovggoRRL20B8aJR+ZD/mljs7MTuzOyFJx/s2c879/8/HPf97hf95SSz+7t6NNBnfgGoJ+Si+I5f5HNPuAjrD+2UWr3CAkezNuf/1CTrsJ2mQUYQtdQIoAydRfIBQZ7+6wGyxg3y2pPfWOuw4vIpH158HtsVmp7iK8FyM/RoG2/nJmq5PYNr9IG8tAN7HPT6jhV+BDRG/KZCduOnJ+BKZ9jTIOt9BeJGScSMEMtrzl//96sePMyurQ7bS/X/IZ29X/wuXSJdn9fo7QW09/r7WzPip4sMctDDBno9aMRr+DACncK1oCZbMFSYw7XaQn30UpS6Ty8Q3epFUEQLnIHA22DuEa72+SJxYt0iJHAsDO/D+GtfqTpbAdE4A71dApQc3/UnSBD8C+3xQTx1kJDOQLEHKnkBkqw9aLrczeiyfLEH1kCGt1RO5XKLoKdJT+nQAprXEqwK+S9FrR+QxGmUICKss8i1u+sNoIGGCVO9riPFDbLRKjSHyDPBUjY9CYfAGw9b38VKh1cd0NEGl0bXrEootCKti7LcoG5sZ7ZmZs9fKtZldAyvGUOhI55fwG2VjN4anL5kvIzaN0xj8+wLXOhxPsJxupuxuRL7ytyo1QC6jFcFf8VfmUohMuw/kSIXA6yN3NJ0swV5nAMWblZCli+G0VoQEM0g5eYSXAsT9DFv/ncSkSjQJsqkSs2rDzVxJOAP7HiLNPqjBE3MXfjJN3vXpOlYW/BcESt0nl9ETrpLLYI+9FUMmAsBJXKu1+gA+fA9Szj4ELfN65XGt9oUJdmUb+fdmmHj8lH6l6bSFtvfmJraCs/bZdxF1PChRaMhqe6DFDmMQoak6CuA0xq1uvA3ngJcjtvlPxTvkrDP1MzCdnSjcBYRMv+ReiAWHflzr7ah9vhSvOM9T5heER2pAFDMIF+NVVg1yvdjJH9lCPIG2mHYniqMhJxGPsneIUukyK1cMoVREZeV3rhcO1ANPZg4WqJk2PQBp7+0jpqWhGwAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/6.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/6.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAYAAACqVHINAAAAAXNSR0IArs4c6QAAA6JJREFUSEu9lmtoHFUUx39nkm6iYqEPxUrVIor0k22DhYKPiulOgmihGrBQsVKoWmlpBSE7E+gg2V0tWLWKj4KPD2KlVJEqmJk0EFsoVlCq4BepNL5FG6wVbGKyc2Qem2R2Z8Kuab3f5p4z53fPPef8Z4T/YcmsjK7yMnx9HdH2pJ8ewO17CbO0E7QnaZNx/H82Mej8XN3PhnTuvpaWtiHghpSDTAKvoWxDSImhRxmfuIthJ/BLcwC6nflU5n2KyPL0TEVRPY1wfcZNjGCwmo+t37MhZvEDkPWZV6lapMKLtMpJ4Koav19BbsMtnJrluhwDM3ceyIVOFVkFMpoIdKT3+/D57vICxuXyhG1y7BzDztmZe/X3aRaXgFSLNo5rXQLoXJqwHtJVvgXVz+Kg3+JaaYVvipkCKW1AeS+MovoJnr22qYgpzmmQHSgvxJC38ewHLzwkX96D6JMxpIxnWxcBUjyAyAMRhG141isXHmKWj4HeGkH8e/H6PrwIkOIIyHVhYF9XMmgHAzenVVN4xyCfG0OYF0adZDFDVnIQ/wMuCVnrtNOW+xFYFMf6LTmIcpZJ/w5aKkuR1qDNa9RZ3sUt7Kw9R9owbkb1zcwDqx5H5EbgijofRTG4nwHr/dllJV96DqHuNFMvqQbqvGpK2+pP8wsVYzlHev+smpKZdJY20CKHQIN9H6WSiCF6Av2jCxZsBXkmaQs/G63x3vO41q50iFl6Fngi6ixKDFp2w3XOF7cjsi8e4oRSJDMxSweB+HMqj+EWXm0CsgeRWCn8p/H6ClmZHAfWRKfhHjzro4YhZukdYGPoL/I4A4WXsyDBx+iayGiswO39snFI8RhIpBTCegasw/WQnp4Wzq0cmypes4NozlAKtAPX/qIe0u0sxc/9EBv+xrUuazgLapTC4MrqT0SUWHV1PbUGbQ1qEqxvcK2bGoasc67GyP0Ud9YYnn3pTKWYhqzr78Ewgu4K1hCu1dkwxOxfDcaJ2P8UrhUowtSahuSLuxDZG1nkLdzCw01A7gPjUOw/jGvdmQXZi0g0paplRr/bnYB8vn8ifhY6tlYnO9pauGw7BsEgB+/WfbIzMknJQdnHX+29zD8/AHJ7ZpaqW/DsN9IziVo4uNeO1ACBwgpfATfPAtiPZz9Sa6+RlbCAR4G2lECjEPyPSXcG5CBnRjYxfa0pha9umf2PorIjGUgqiL8FbfsaJg6DLknYRU5yZuShNEDYRg130Bwc/wVnDTIymOE1CAAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/7.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/7.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAYAAACqVHINAAAAAXNSR0IArs4c6QAAAtJJREFUSEu9ll2ITGEYx3/PmTWrfNSWz7iQyJKEC1FbVnZmVqSUFHsjbtkLLuyc8XFo50w+iqw7RcrHhVCEPWetNh/lI1FCLkQiJaJImR3zaO0wJ3PO7J518l6e933+v/d9nuf9n1f4D0N8GcnsMjAWVMypfqErfwisIonsUsRoqIwvfiPfe5Aeq/B7rhKSyK7HkKNAje8GhAMUuYtwCogHJOIIjrnZH9Kca0S1GzCCsygKWgRiVTMt2kRnpk+Lv05iGaTiF4CVgQKqOUSmAGuD18hB3PSW4HQl949AezsQRlWICLdxzEM0WsOJxw8DdZ41sxHqUb2Dm1nkjfUvfNiOS2UngjwCxqGcwDXXRwyxDJLDriGy5JdwsbiHru27ooWk7J3Abo/oBhzzeHSQhL0Yg2t/2l3pRYx5OG1PooE0WmOorX0IOrksqG04mb1/l3SohRdSuUugyz2CDo65DNBoIKnsVpADHrF3aH4urvXerzHDn2Rpdjw18tpjKT9QSeKmrwd1fnhIU3sDMePmH0GlHdfcUe1qhYckcy2IniyJ3mT0tCWcXfMjWkjKNoEsykdisblc3fZmIIMIf5KmvTOJFaZSkJd0m08HAvi4cJWQWVacCTVjyce+cSv9aTDiwS7sF92Qq2OEPgfGAhW2MRBwcOlK2R3Apn4xbcHJnB5IOJytNGfnoPKg/DsursbZfi5aSNLuQVjs8acVOJnL0UES7WsxjHJqVN+S762nx/oaDaTRGklt/BlQdlmRdXSmz4QBVG/hpJ1DaCvbh97AzXjSNniUf3cl9k3HKDwGaktSBWLGfK609X0LPYJekOcRWeUxwQ5cszW0einAH5LKPQWdWVrznu/5GfRYn6OFNNsvUKb23z3diJs5NlRAcOGb7Tcok0Dv4ZgLoe9pOvQRkC77w6/XochCOtP3hy7fHxlQeLsV5RVd5sV/BVS/J1GolzR+Atlt0SNenq94AAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/8.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/8.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "b4cc6dac9a5a2ca08026a2be601cf729.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown/9.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown/9.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAYAAACqVHINAAAAAXNSR0IArs4c6QAAA4xJREFUSEu9lk1oHHUUwH9vNsmmkMWPVPCiVSGmiFjFUw/KVpMdq9aDeBCltqV+VA8FRbGZaXTBzFRFwZMfUWvUmyDYlraZaVovglUIaqX1A2lRoZcSFWItJpl9MjuzZmdnJoywOLCX/3v7fu+9//v4C//DJ7mM6suXU16aAq106OzHs1/CdB8B3ZqUSYAGW/DHz7SfZ0Oqr6ymvHAUuCHDiQbwOvAEYKTkKseZO3Mrs5OLLVkaUq33U+47BqzPjVI5jXDNCvIJfGs8H2K6e4FtKxh4jYZRxwi+QuTqTD1lEVm6Ce+5k6E8HYnpnANZ3fxzEGyA3tMJQzO7fgWUkRcvAsLf8mcEM4gMNQ8aOsIRO0x5B2T9k6uoXHYeaZ4r2lvBf+Z84QKsOb8jcnFTX4K1TI//kIaMvjCEUfoxMqq/4dmDhQHV+gDlvvlYX+lbGOBA/a80xHQ2gISXHn7f4Fk3FobU3LUI32U5mLwT090MfBArHsSz7y4MucO5HZWZWP8EnrWu9d8kZNS1MHBiyJt49uOFITV3C8JUlGkO4Vt3ZUNMN2yylmEbz3KLQ/bYiE5EEJ3Etx/LgxwAWil6CM/6sDDEdN4A2RFHMo5vRcBUCdecsMHiy9bb8OxPi0PcZQdFtzFtR6lLQdobERnCG/upMCThoIzijbWKoKMZTfcX4IrY8Lmwb9sgF1gMRugvlQg4CHRO53BKlFD+REvDHHn2bE66JjYhxv5c75WvEb0EZE2OToPAuJeZXfva5Z2zSzDdEJLXH7MowwgDmRDVPyjJtRy2wiz8+2UMyPql0PclypUdhr5HFqpoeSPoewlZNOt6ojOdwrMTUzx/Mxa+ccDc8zDo2zEkNSm6A6k5dUSejwLRt/DtqF8yS/i/eN+uW3PfQdgeQWQ3/lg8miKl7kRiOtMgZgRhK771fvcjMd1vgeubhts2YpfT1bYRlxjmqBUvvm6lq30jKkp5eSN2L5LERmQOz4oeIV2truRGzFzZWY+7HubPJs9nJ5eadRNW482Pxp0duzq4ZjMi7+Y1YrqEaxObwPgYoTcRr+pe5n7eweBVnyDcmd9O+jSe/Wp+ukz3FhQPYVWmkeYEZqXXy0d41v1xxDl3stG9joAvciZs+J4Kt+Q9OQ4cYr7/Pj5/6kKWvONJ5DyAsjvphigN3UlP5TMa8/tS01k4hVF5kMM7/85LY3fGSv4lNSX/ALpkJjK/BE9ZAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/countdown_bg.png":
/*!*****************************************************!*\
  !*** ./src/assets/images/gamePlay/countdown_bg.png ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "2688e46bb00c0e6ce06567f033bc3a0a.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/0.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/0.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "022a007d02b90ad65d875a4905411ac6.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/1.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/1.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAYAAACTHcTmAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAGwAAAAC3K6xvAAACIElEQVRIDbVVv2sUURCe792pd2IaJY3GJjZaeLfChSgIVkYQvPwBloJ29lqJhYWtjZUiYmelEqOIhpAQTMCQk8PKSg9BsfCCnvdj3zi7d29vc3m794r1we7MfDvz7czsvLeglLVYrx/sNXtnjYsmdKtnSi+NnSSR9OBdvX5gu9l5y0QzcR8oXK/Oevfi2KiuRgFjN/90ygRUjB1JTXdfrX88GtkWJZF0fubUKjHdALBiLgL9ZOJCW/u3LVwRlFh+5BFTnq1tLkk7zkkFD+ZPe1dij3aoiZnu8DIGEJYtmXw1kE06kzIzpB1HAhJpxxcbmcGcSV/XapPSz31BoEZGmXZb/dIDUkk5m0wZfjRGRTWRTU9lN00FWUqe2+crx371dfvduacYfCRCeunBa5xJVQ5PQGhLQ2/Z8xuizqRhCKhRKKiFYbhdcybVPX4kszrd/stX7VRD1JlUZvREGMbSgjHLifTN+0+HhKcYcClOH/zQJ7iNWy3yB+NExHsyImXqRYO/NytSOZX6mQKduVLpx7jKnHrKg90k5A05oeRITV9upKzD8oUtdc+bV1lP/hdrW1UNPW2ciHFNRuo4QDXBHhocebV8qVL+YGwjd5E+X9+8zBqPw0PZeCVJ0LdCUXkXyuXvcZdd5bMmz0LYkn2/Gg8MdUbO76qJUTw/ChzOezcb/paSkiNnMZ5iv9rwf+s78i/JmRiVp/sXKyc/G/u/yn+MYZrOuEUGggAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/2.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/2.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAYAAACTHcTmAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAGwAAAAC3K6xvAAACu0lEQVRIDbWVTWtTQRSGz5nbClppS1BUqAiiiKBNIpoPEAU31TZpBf+AexUsdtWdiqi4cF3wJ9iFaWINFiMomFgxTS114bKVbqyLQLSp987xTNqZTD5KP4x3M2feeefJuZNz5iJs8GTy+e7Sirigl6UgGQ/5J9Pz811u0T2vdRDSGwgFJhFRag11YI/pQqGj/JumiChi6wj4lOcXCeiMrQOK0aGI/6HWhA7s8U9Z+AkgZGsqJoR+QAjW60jyXir35azWm2aqFl9kZ+7w4lVt5Ox+Onuc61SSNxjep3UgOsEJ7AfEzFAkcEnpG0LNpk0C/vFXDO5jaJqhl5W96etvwqlZ5qx6lIBEC3rhn6F80ocrUCEWWwJ9mf3WSQSdCsbn2hqoK0qVLBVUALUGSoBVKLW35kyFJw0UYJfJtE2lXv8kpwunwCNT/JxRMR7xP099zAdIoukm7st+LieuJij2R44XNacBOpGb80vXfcPF7tMm9TckcoUHrpQ3GdJV1dciLqtRW3PsSerz/BHprr7jf3KfrasYgdqZfaxBF/h4MBI0fa/WazJ1y+VnrKmWW2DApyqAZuPhwN1krvBEEhw1OkJ+MBy4b+brQQ2Ub6GT/NqcFY4PRv3D9WaejzTRGiTTURmiNgYeVA675Rp2bEEw0NXpuUPsr5wxX8im5rbAaLBUoUSVi0E5BDiLDc5tCAZKWC1kx7pxtsEyVgNFb+0K4xXvSrh3yTh2EBgo4XofIy7xR8zbActssUpKHtBqIpu/rWOB+DUWDqQT2cI1gOoRCceZi53rndI+ezSfk4ncbFSSfM9taLKvGBFXkWCMy+1W7UZccRyKDoSCM7auYgOIh3s/CKSxekNljnC6mS496G6mW6/PRerbO0zLv8rc+x3a7BAkfT2+1z++Lz/iXtutdU5gPBYOvtXz/z7+BQMB6un2+AdWAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/3.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/3.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAYAAACTHcTmAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAGwAAAAC3K6xvAAACcElEQVRIDb2Vz2sTURDHZ95uC8GmPw6CoAcvxYKa7sGkEaKiB6kpMR704E38A3ryoB69lN5F/AM8eFKaatKe6kFM10s29FL0ZgoiBDQNljbt7jiv4T1eNgGXNbiQvNnvzHx23mNmF2HA9XF7O/nr58F15SILaCydqoDnjf3eF1eVDiLwFzJOBREDrbGB5o20PzUaieZOs0IA10yfAHzOWoaAMqYOKJ4Ws7NLpibMG2k3v7cucHIurAcIN7mEdFhHCp69d7cumXpfpdK5Wq0vEtI9FcgPaQk78SDw9x4iYUHpQHSOfScBcaOYdW4ofSBUOf+2lqoeHxPNM3SdofMqvm/7yhFxPSPjkKhhxv8TlBC6UCF2hgJdr9dP8JlOShif63CgQadbpYQKoOFAj8iA0shwzjQwoACjPZXasvwo18rmVsoCXze5T8EtmYcIu/ns9K7JiAQtffbOg+9/8IGmzOSuLZ6EtUgthQRXuMkHALE9mrRfx4IW5pyXKHCZN/tW/Xjbe9xMycN251EYGmn7Mun2nPPYTF6penyO3KEoDkxd2pG2H04qb34dl1VKPTyiUosFBegcj6cEhKcpNtSHQw1FsnoaPzaU35caOjk10tP4saE+wGmZzF+CVm5mpn1sG3+xzlRVioB9VUp2T0u9c2sLPNPT6qEI1pdCNlVedWt3iOCs0tm+3LXpm9LMVX9OSm79PhG94nekrp6dRzzcL1hfNJOkLZvftjCXTzu1sE9XigE5PIoaqAK5ZS4qW6287X0OvZtPp/qAMkZXukFkt11viUBMqGSuem381ES5/aO1TIAJrQt4U8zMrun7/2H8AT7KygxmTzZFAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/4.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/4.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAaCAYAAABYQRdDAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAGgAAAACKS4XfAAACMklEQVRIDb1Uv2sUURCeeXdETo0WShq1FMErDiUQk0YFG8XgH5BesFfRQjBgoYXY2NlpZSW5k6ssxaypNogQuErONCGGcNELZrNvMnN7b2/e5hbPjfhgefPje99+M+8HwP8YRIR/8x/Gl7J4kw3Ug+U375e+zGTjw/xmq3Wo8Xn5Q30prOq8R1oPwtsANBfH8UsNyrN3N7qPWOkVsPRCYzxSApzsJ8salGtbqiU5JI3xSJHojCQRqa1BeTZ3/7TkmPG7xnikgNAjZdqRSJkuwZMvwiMloN6fIQPSKpz9qd2usMQT4htjhiv9uLIyzqDjAkJj/qj0x+pWIkDwkKO0sxn3S2fQCEoRdlJSizk9jSFKQQRjXjmiPjsIMRVRtke8yvTROZUuxOjyQhBOiV8i7NycrtWbwdfzEUQXHcYSXRcbETo3Lp3tuLjMA9JypQHR9hrv6IS19pUDxdxo/sGTCHbuuI1xuWQ2D32fN84FZifPrRuD95yvZ34Mrg0nxK3DOPZWY8VOScWZnaq95mmei3rnPkR8yvEZNPjMxWTmsrtc1XiXft+VtXoMyu9Hb01feKwByn6gbFhYDLmPvdu5reNie0qzyTy/GbSOiUrJc2u8nZdYIdJd8ys9ThZK+45fIVJDyUPSU1X2b1NhpRYwvShHK/9IKfcxIUXcvFqt/hR1ehQqn6xNSGn/Jgl5IVK+mydlMSv+JnN2FCJlsucIuGGgdD9LeCC/EYaDB+hATCMu3gN+Ja21XML5IwAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/5.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/5.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAaCAYAAABYQRdDAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAGgAAAACKS4XfAAACsElEQVRIDa1VTWhTQRCe2Tz8KdhCRQ9a8dSDiE3SQ/MCSkUUaWMi4smbnkUPehEPgqDUU70KXj2JXpKQoh68CE202EQxVnpT22L9AWupoUl2nH3pJPsSQzVk4L2Z/Xb2e7OzM/sQ2kgmO9+rae2oTGtFOj4SnHpSLPZVViqH6zhgOREdmpKx0WgPxE7NLPZQ+UuGAEYFMxoB77IaJaBhG1eAV+PR0KRgSgzRRKR0ZflhM6GZJ4RYM6HBNcIxo0UcMUSnXhYuAlGMoypxaDOCM9mPQI86T7/pMn/4uOBAsIjO7gv1MRstpKAhWHOgtwk3fMR23rBvsjZPW2ndPsKA54240HbVJhMtpJy5fWYNEnzeZG3b6RZSLgcvUj6o7pCa2iSCXi/SAHWHFGC9lk9mJQh0h1Rj2cunidRR2DGpYwhEeOt7xK5U9Ml0Nl8yYw34M+EGH2de5cO6CmHx4aJfTkRCaRmL5nNpSOb1/K7y+up73vvOBrphId5CMIVfy7lBEZGbTJ2Ku0MZ2993+uPDg18Vqmu2g2WfsAkNzp2Fmqr3X8zN7bD8/n6hJKdnbxPggbojwrtEJHgjlXszyUT7BedtjnH7bgNU10+7wQkLF/P/dXI6X2LSrajwCufW3GCe+LYv4L9ok39DaHxZ+yqlY1KqrO6VjyOpT2Ib3TFplbDeKFyX3YlU7ggOrDoWGVrqSqRcHXJFLnG9VrtCilp7pNwQvnwacl+bGiCdm41pgkFje0KBD+ZvmcwWznLD1u8GvhpH+NhZ8GPNsfH2tWkyVzjHxf2AW6VxgAhlbsZ7XDaXGstqFiKsOLAlOu4eLNpzjcWMcs+FfISeJ/8DEA7Zi4zNhGvcSWeaCb052/k5kfMrl58gUH2CBwjS/QP9z74tfL/D7NsFV0CP4m7oqYxt/Qffa+6FBCtu7wAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/6.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/6.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAaCAYAAABYQRdDAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAGgAAAACKS4XfAAAC/klEQVRIDa1Vz2sTURB+8zZSqlWkoNZqb148mEYsTSIoogepJunNq3hWwVIQb9KLelHw6I8/QG+SBou9lELBWLFtopTiTS0WpC2V0jZJ2TfO7O5s3qYNAemDduZ98+2382ZnXkA1WROzs4c3KvpiGNbGvd6fGCt8+d4J25XzghsF27l0fEz2bMHeiD+1sHBwda0yjogpwdhqgKdGqSsKMRHBFQxn04lngmlxxE4gxkgw3yjIcRLMNAp6OKjL8jzbmL1hf326fJ8ELwGoTTrIjMRR4eqhNry5XoUhwuoiqH5D7Ogt4bHdIaoM9voEmMmlEhdscuA/JMt/TdeO41NGJ302/mr6VIvADlEF0MPPoNKLLZ5tGo6IUi0dQDzObIA9yrRQKnVhUGdQeySqtyCoJ2WKzt7U1IDy6snH39f+/5lGWwpVt19PwFpF5QrFOep3WgjLmXRvvlAsn6MRCFqOPFB/cslEweNY/yJj+mH6a0/FdedJpcPiiDtCRRm2Y0BfE5TOZFPx90JiG/n6VTQxekvNJohPAldtQcapW8Cg+4rvCuGxjRwfjXlJWCcJ/0BrROnNM5lk76NCsfSc6nFCBIh3jYale2Wteoewx4JHREHBaSLxdfRmMJl4ICTL3hWfsxwtlrZ4T1WoCM42PP4E3U4k2MUgDUDLdhovl48Qv435ZCPTF4rWPn/jSXJ8khMhMda4trf8cWYcUEeSqIuiXCREirXOFMENe5pqGEkiFKXvGJIcvT/y5sYseU8/IzJ97kAyvmRzQlFwlUeij1UdOHtq2Sbt5msTTB/AErWba3NCUQyvPFzkprZJu/kI6J1st4uHyiHLHPM8ACdfnL0nKGU+n00lxvPTczfoV8Eb4yDW51v4KVyx1L/+Gv1UThs0UzQmYfYc4XLQLL4m/HZArRtQf3XMSWX74gt10OrTbDL+UQO+sIN1H8/Ufd+jEm2AdgYbBTlqHZ+atLNjCFc2q1TQAyJCmb5ra8fJ2iY+MQBes3MMtHqb7Y9PCs+2/wCFOg9FIF31UgAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/7.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/7.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAGgAAAAAN7U6cAAACT0lEQVRIDaWUz2sTQRTH35tNjKAGT+KteBGhxE0PNebgoYgoxq0XD1KLf4EYoQdBsQcPehAqeBAPQlFQEURIUwXBk4LZ1kCyKngQRIWAXuuPEpKd55skG2az+THGgd357vvx4c2PfQg9o7juHZa+PKSbBeBHJ5t+/PxtdarRpJMhn8DvTiZ9J7BhINRcdL1TEuRDIIjrdkQkJFiUCAtAtFP3KS1A5J2sfautNS8Rne2FKTfbmQin+8GUXyJl1ayGaE/tdwy3zQPia67oc+gBuLYjY6fZ9rRrB/jWykJ4NZux53XOWHrFrdwolCq04lav64BQhbpjmC64748A4IKKQYSveuw/A1943i4E/77aVwWSiF/GBipIfVMu87xbQbi6UnJ6/8uxgcW1ap4IjndgG4DizAxiUweG7qHu6NXP1itp30eXgBItoBBzfLqPeuNivYZB39KHCwGMN/6e0wemco0PhRAnVALv26ftyS3nlO43jIGcPAEIDQtjczOTk7/6wZTNeMnIByAE/cxNpz4MghnZV0vebMGtXuGrYrSaoUHF8rt9Pson3BSu8j8sTSoYumRqyJsMiSNg3QSmYgZWuLpWyfE1OdYB/fkvYLlMcZ9wqQsReLurR4i+Fdaa3nnet70ql5dbS2yFUIsaxowA292EFoMktOjiUdv+HXyPmiPA+iZd5gaQ7CS+cQ5MPRgF0f3RUybYowL4mpCFVl4PNtGRCnnTWt2EAJZzmVTZBKLHRIFECW4AGwDWJT3QVEeWzF3lrgVQO3Ew9cMUosf9BU1yu7x/sH3wAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/8.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/8.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAaCAYAAABYQRdDAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAGgAAAACKS4XfAAADUUlEQVRIDYVUz09TQRCe2deSoPJDEiIqXkxUPECrh/5IQBNCQgRbD/wD3tVEEvWgJ41GowfPRP8BEyUBqwgeuJDQqqEtMYjxJhguQrAIltq+cfa1u28frbBJu7PffPvtzNuZRfjPmE6nmzfz4pxy24LsWCgwMbmw0FTMFbsVDsIuDYaCE4hoKwyVYc4zi4sNa+v5KSKKmDgCPuX1eQI6a+KA4valSOChwqpEp4l8uWRmggl9iqRnxK+84SQf5tnHi6IlfNHBcOcnyfXpDRUjl5q/yWYfImwB4Jzyc3Rr1j5xmTbtK4DYr3AgOkUArUUqPWasV+JVokgUZBIPnItHgj2O6f27z0v5c8ZYMvOOheUhhQoEQhlq5ojayzYtKWy3mVN3+ByM5leJcmrHpAiBWN5NzPWRw0fh8j2ifAEWn3hYbkB0T3YFvNbb5LdGImiUKH8yHYRHNJHNtrHTJ0kIe4sWxaYTpeQLoNqi4g9WvieLkqW/kdxUaxCUP5X0CfJrvidSG0Gf7K/fO1JRsjUfoE5H6qSqoyA4Im1uOSrkIZ5IZpzW44hysUjg5ZsP6SDZqLuJnQNcTsyH3EDkRE7peEQthFEm3uMLa+LfM0WS1zCeyj4o2vZVFmly8YqFeMvEPOlTnZ9v3y1ikwhk97J2LcH1hjp6YXI9kRa3t5+zs5XzWWIBp4/LZJqPhYN3E6nsE5vguBLgr9TPGTVv5EG29h2Fe0T5FTrNHcXlhK/i0cCwIhnzDcOGsdkMf0fmC6FbVPp1+tP8OrFgmwTNlpPrWkMWPgs2SN9OvhYtfPwsO8mSJH6Qdc3Jde1R0DVtdpPkuqKkHhIJWsu1hVy0BH+16M5G0aKEbiFbxovjyngt9TpJtPmg3xOEFsVS+QljTulCuGvFK1G9KgEcdVCEX90dHRsmQ4tS5cnjclrhjuI9uw8VKVeKJ0q5yygp+5CSGU+mrytbIH65GA5OjiezQ3yFute5O6NlDn1XXDXzgeXxOjUftcme4TbU0TsexAJ32QiX2zXFdWf87bOoZzB0JuNixu3Hwl2zAmnEdGoboVPbFYPTzguEoZ2C0m2kz0XacmCYVre2ue72KxGLINHS3vL+54/VR9w79QrnfEbjocCUWpvzPxpYL/sbvxlvAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/distance/9.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/distance/9.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAGgAAAAAN7U6cAAAC9ElEQVRIDZ1VP0yTQRR/79qSNECBGBPjn8SFyGILxtZi0EQGoiUFBxc346aDk4Pi5gDirE6OJjoYDZV/TmxCWdqGkBjdRAYDDLRCsO33Pd995V3vKwSSXtK+3/3u3e/ee313RThkLKyutu0Uq4OyRAGgtnh0DvL5tp09dV14UK4znOidQ0RXOBQg9tvaWnhjfWsGiG4Ip60CfEUACQJK2DygGhtNxiaEUwK0JSK1ub75vlFMr7kIQ4AQ19geSO7zmezKZeGCArTNLBceAsEoIJY59GVZ48i2VTB8z3V27yNgWng++AKvnayS85I5r0Q+Qa5ELztwIPR9JNl3zWysA71Rf7yRWczPcV43eVLep7g01iCEs3pKgGsWfRT0/JHI+PsEWeqct5vAOBylJgGgUr/FzyfIdaudqI6P8Guh0Mo17NRCXKaDgrNLPyNEEPFOslKQkxutW64drnkFdFCQ6+pFV3Oon9goJPMqWYIUMiUyKbtYqdWPdzihuoMINFrXEgRoMREGxZHTPS0YK9Wh6aW8d8X4Fy+mk7GPU0sr0QA4poEdcm9pf0QoppLdRdlrBAMtrdNu+e8WV/gEkfvaEQ8mMou5cSDngQPUZWgD1FMDGZiUU5e6NxSqJ/aiwYiDfIcPEcNSS3vwg/GzBTWZvhJ7y60zzol8lg+/JC+Yv4oKJ4XTllPd5YZpr5TKj21Bk7KQI/19zwQ3WF/0U4t5rht3IKp/tp9J2SaPw7pndXTaz752et6UoN2z9i1pWtCBirkESAHT1E0Lyp3XAp1dIdPUTQtyj57Rm/nh3B7o6Sl5eP+rqRpKhPx6+6LTmr62mc7mhvmOdsuJCIEf6WR09ks2d5uv5nnhGffXMP0STiwfVhuZbOEu/0m94zfORM2LVb6sb5h/JH5idWMHAziQivfmhNPWRIgu8f9JXUycuC0uChbLqe6x651UPOoT0+smwgWiYCmbnyBQHbKRo52PnOqYLf3ZnuRXJ2x4BZ9GE7F5M7fAf8GqBRd2YblUAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/fixed_top_bg.png":
/*!*****************************************************!*\
  !*** ./src/assets/images/gamePlay/fixed_top_bg.png ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "666cd1a8365f6172e3bf699cd08944c4.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/game_background.png":
/*!********************************************************!*\
  !*** ./src/assets/images/gamePlay/game_background.png ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "46206fac2b9bec03aac1ddb9ecdd105f.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/gameover_text.png":
/*!******************************************************!*\
  !*** ./src/assets/images/gamePlay/gameover_text.png ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "8520a72faf036f46ea5b2f917aebd26c.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/guide_logo.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/guide_logo.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "69cff2fd91e9eb210616030b4a286f4f.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/guide_text.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/guide_text.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "e7beec87e878b2d6dbdd4bb16edc7e10.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/jump_blue.png":
/*!**************************************************!*\
  !*** ./src/assets/images/gamePlay/jump_blue.png ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9aa96f222fad83b7559c9430416a6570.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/jump_green.png":
/*!***************************************************!*\
  !*** ./src/assets/images/gamePlay/jump_green.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "4cdd67a0a9b9b61c3bbab99b6bd0593f.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/jump_red.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/jump_red.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "bc2a7ba71d5dd1abd7c8f13d43eb87b3.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/jump_yellow.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/jump_yellow.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "5740b29be92f82395e57e7db087da2d0.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/overtime_bg.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/overtime_bg.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "52ddddba2b7c78d159742b64eb3decc2.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/progress.png":
/*!*************************************************!*\
  !*** ./src/assets/images/gamePlay/progress.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "3901e352d15f8e99edb533ae01b12816.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/progress_bg.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/progress_bg.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "63e32df4bb7d9a6a2abcb6c0996691c0.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/role/role_male_fast_left.png":
/*!*****************************************************************!*\
  !*** ./src/assets/images/gamePlay/role/role_male_fast_left.png ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "e035a9a1e1c939f78f90ccc991da6405.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/role/role_male_fast_right.png":
/*!******************************************************************!*\
  !*** ./src/assets/images/gamePlay/role/role_male_fast_right.png ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "ecb35c8a95916593953a2aeaecd1923b.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/role/role_male_left.png":
/*!************************************************************!*\
  !*** ./src/assets/images/gamePlay/role/role_male_left.png ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "0a5351ada0802d038c04e4d4b3059896.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/role/role_male_right.png":
/*!*************************************************************!*\
  !*** ./src/assets/images/gamePlay/role/role_male_right.png ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "aae3b75017185a5d6ecf1724e70341c6.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/roll_bg.png":
/*!************************************************!*\
  !*** ./src/assets/images/gamePlay/roll_bg.png ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "51c351979fc077ecaca5acddf8390418.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/speed_quotes.png":
/*!*****************************************************!*\
  !*** ./src/assets/images/gamePlay/speed_quotes.png ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "53430f4426316d702267f4ae1894166a.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/tree.png":
/*!*********************************************!*\
  !*** ./src/assets/images/gamePlay/tree.png ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "97c645067fb18f68607002b7dc7d4684.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/volume_close.png":
/*!*****************************************************!*\
  !*** ./src/assets/images/gamePlay/volume_close.png ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "d8812c7adf57de66768eeffd23f8f7bf.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/volume_open.png":
/*!****************************************************!*\
  !*** ./src/assets/images/gamePlay/volume_open.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "cd33b7ddd743d69de004bdbe17f144a5.png");

/***/ }),

/***/ "./src/assets/images/hand.png":
/*!************************************!*\
  !*** ./src/assets/images/hand.png ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "b4231c339716bb44c045dc6bcd3e97e6.png");

/***/ }),

/***/ "./src/assets/images/ice_role.png":
/*!****************************************!*\
  !*** ./src/assets/images/ice_role.png ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "11b62e0e450ed5574c75330cc5b497dc.png");

/***/ }),

/***/ "./src/assets/images/left_arrow.png":
/*!******************************************!*\
  !*** ./src/assets/images/left_arrow.png ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAYCAYAAACV+oFbAAAAAXNSR0IArs4c6QAAAM9JREFUaEPt2tEKwyAMheHkyba92d7c0RULa+kaTc5F4ffSiyR8RlDRTThaaw8ze7v7S5jmNqFdUWlHNrPnEt/dJXkUtStjliLskXvhYK8SJdhnyGD/7pMU9hUy2AXYUWSwE9ijyGBPYM8igz2AnUUGO4BdhQz2H+xqZOUF4W6xl7vG9+gHsn7pwNYbbxk27D5Dh+v0D9gqdN5GAm8jVZ0OdgC7qtPBHsDOooM9gT2LDnYCexQd7ALsKDrYhdhX6GALsM/QwRZi79H5yrCKfACtZ2AZBaOmngAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/images/loading_cable_car.png":
/*!*************************************************!*\
  !*** ./src/assets/images/loading_cable_car.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "7492be16cbb2c49b6a611f3738b3c3a5.png");

/***/ }),

/***/ "./src/assets/images/quotes1.png":
/*!***************************************!*\
  !*** ./src/assets/images/quotes1.png ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "4e9447094109c4043cfd8df6d3b3b8ec.png");

/***/ }),

/***/ "./src/assets/images/quotes2.png":
/*!***************************************!*\
  !*** ./src/assets/images/quotes2.png ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "be000d3e2671479241fc713560aa3997.png");

/***/ }),

/***/ "./src/assets/images/snow.png":
/*!************************************!*\
  !*** ./src/assets/images/snow.png ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "0831db7e8f265c18f6036b14ca09c102.png");

/***/ }),

/***/ "./src/assets/images/snow_role.png":
/*!*****************************************!*\
  !*** ./src/assets/images/snow_role.png ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9d1693e752eaeb4d72d594bdb3c8ec60.png");

/***/ }),

/***/ "./src/assets/images/start_background.jpg":
/*!************************************************!*\
  !*** ./src/assets/images/start_background.jpg ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "3da0441427b5053965d7aeb84a6a346e.jpg");

/***/ }),

/***/ "./src/assets/images/start_btn.png":
/*!*****************************************!*\
  !*** ./src/assets/images/start_btn.png ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "74c774ad2450ed7028738e19391b625b.png");

/***/ }),

/***/ "./src/assets/images/start_tips_1.png":
/*!********************************************!*\
  !*** ./src/assets/images/start_tips_1.png ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "780049a4cd75040ab742090db6669981.png");

/***/ }),

/***/ "./src/assets/images/start_tips_2.png":
/*!********************************************!*\
  !*** ./src/assets/images/start_tips_2.png ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "36f28963ec905b41e3152040df10effb.png");

/***/ }),

/***/ "./src/assets/images/trumpet.png":
/*!***************************************!*\
  !*** ./src/assets/images/trumpet.png ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "2c63f462bb7986ff48f9f8957733327c.png");

/***/ }),

/***/ "./src/assets/images/woods.png":
/*!*************************************!*\
  !*** ./src/assets/images/woods.png ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "48aa95fb7b503d0e15ae9b42033491da.png");

/***/ }),

/***/ "./src/assets/css/ranking-list.css":
/*!*****************************************!*\
  !*** ./src/assets/css/ranking-list.css ***!
  \*****************************************/
/***/ (() => {



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_startPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/startPanel */ "./src/model/startPanel.js");
/* harmony import */ var _model_gameLoding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/gameLoding */ "./src/model/gameLoding.js");
/* harmony import */ var _model_gamePlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/gamePlay */ "./src/model/gamePlay.js");
/* harmony import */ var _model_gameScore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/gameScore */ "./src/model/gameScore.js");
/* harmony import */ var _controls_gameState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controls/gameState */ "./src/controls/gameState.js");
/* harmony import */ var _model_weightsAlgorithm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./model/weightsAlgorithm */ "./src/model/weightsAlgorithm.js");
/* harmony import */ var _assets_css_ranking_list_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/css/ranking-list.css */ "./src/assets/css/ranking-list.css");
/* harmony import */ var _assets_css_ranking_list_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_css_ranking_list_css__WEBPACK_IMPORTED_MODULE_6__);







window.addEventListener('load', function () {
  const maxWidth = 375;
  const maxHeight = 812;
  const stage = new createjs.Stage('mainCanvas');
  stage.canvas.width = Math.min(window.innerWidth, maxWidth);
  stage.canvas.height = Math.min(window.innerHeight, maxHeight);
  createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener('tick', stage);
  const gameStartPanel = new _model_startPanel__WEBPACK_IMPORTED_MODULE_0__["default"](stage);
  let gamePlay;
  let gameScore;
  let gameLoading;

  function start() {
    _controls_gameState__WEBPACK_IMPORTED_MODULE_4__["default"].playing = true; // 开始游戏

    gameLoading = new _model_gameLoding__WEBPACK_IMPORTED_MODULE_1__["default"](stage);
    gameLoading.on('loaded', () => {
      const noviceTips = window.localStorage.getItem('noviceTips');
      console.log('noviceTips:', noviceTips);
      gamePlay = new _model_gamePlay__WEBPACK_IMPORTED_MODULE_2__["default"](stage, {
        noviceTips: noviceTips !== 'false'
      });
      gamePlay.on('loadProgress', (context, percentage) => {
        gameLoading.toProgress(percentage);
      });
    });
    gameLoading.on('play', () => {
      gameStartPanel.destory();
      gameLoading.destory();
      gamePlay.run();
      window.localStorage.setItem('noviceTips', false);
    });
  }

  gameStartPanel.on('start', () => {
    start();
  });
  _controls_gameState__WEBPACK_IMPORTED_MODULE_4__["default"].on('gameOver', () => {
    gameScore = new _model_gameScore__WEBPACK_IMPORTED_MODULE_3__.GameScore(stage, {
      loader: gamePlay.loader,
      score: _controls_gameState__WEBPACK_IMPORTED_MODULE_4__["default"].score
    });
    gameScore.render();
  });
  _controls_gameState__WEBPACK_IMPORTED_MODULE_4__["default"].on('restart', () => {
    // gamePlay.run();
    window.location.reload();
  });
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map