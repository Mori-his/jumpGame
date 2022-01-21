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
/* harmony import */ var _selectRole__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selectRole */ "./src/model/selectRole.js");
/* harmony import */ var _weightsAlgorithm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./weightsAlgorithm */ "./src/model/weightsAlgorithm.js");






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
    this.weightAlgorithm = new _weightsAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"](this.stage, {
      row: this.row,
      column: this.col
    }); // 选择人物

    this.selectRole(loader);
  }

  selectRole(loader) {
    this.selectRole = new _selectRole__WEBPACK_IMPORTED_MODULE_4__["default"](this.stage, {
      loader
    });
    this.selectRole.once('selectedRole', roleType => {
      this.selectRoleType = roleType;
      this.init();
    });
  }

  init() {
    // 增加背景以及跳台容器
    this.renderBackground(this.loader); // 渲染倒计时

    this.renderDistance(this.loader); // 渲染游戏人物

    this.renderRole(this.loader); // 连击效果

    this.renderBatterEffet(); // 渲染初始化时的新手提示

    if (this.noviceTips) {
      this.renderTips(this.loader);
    } else {
      this.start();
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
    window.localStorage.setItem('noviceTips', false);
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
  id: 'selectRole',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/selectRole/role_group.png */ "./src/assets/images/gamePlay/selectRole/role_group.png")["default"]),
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
  id: 'roleFemaleFastLeft',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/role/role_female_fast_left.png */ "./src/assets/images/gamePlay/role/role_female_fast_left.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'roleFemaleFastRight',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/role/role_female_fast_right.png */ "./src/assets/images/gamePlay/role/role_female_fast_right.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'roleFemaleLeft',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/role/role_female_left.png */ "./src/assets/images/gamePlay/role/role_female_left.png")["default"]),
  type: createjs.Types.IMAGE
}, {
  id: 'roleFemaleRight',
  src: (__webpack_require__(/*! ../../src/assets/images/gamePlay/role/role_female_right.png */ "./src/assets/images/gamePlay/role/role_female_right.png")["default"]),
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

/***/ "./src/model/selectRole.js":
/*!*********************************!*\
  !*** ./src/model/selectRole.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SelectRole)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);

class SelectRole extends events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  selectRole = null;

  constructor(stage, {
    loader
  }) {
    super();
    this.stage = stage;
    this.loader = loader;
    this.container = new createjs.Container();
    this.initSpriteSheet();
    this.initRole();
  }

  initRole() {
    const maskBg = new createjs.Shape();
    maskBg.graphics.beginFill('rgba(0, 0, 0, 0.7)').drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
    this.iceRoleDefault = this.getSprite('iceRoleDefault');
    this.iceRoleSelected = this.getSprite('iceRoleSelected');
    this.iceRoleDefault.x = (this.stage.canvas.width - 120 * 2) / 2 - 20;
    this.iceRoleDefault.y = (this.stage.canvas.height - 126) / 2;
    this.iceRoleSelected.x = (this.stage.canvas.width - 120 * 2) / 2 - 20;
    this.iceRoleSelected.y = (this.stage.canvas.height - 126) / 2;
    this.snowRoleDefault = this.getSprite('snowRoleDefault');
    this.snowRoleSelected = this.getSprite('snowRoleSelected');
    this.snowRoleDefault.x = this.stage.canvas.width / 2 + 20;
    this.snowRoleDefault.y = (this.stage.canvas.height - 126) / 2;
    this.snowRoleSelected.x = this.stage.canvas.width / 2 + 20;
    this.snowRoleSelected.y = (this.stage.canvas.height - 126) / 2;
    const tips = this.getSprite('tips');
    tips.x = (this.stage.canvas.width - 209) / 2;
    tips.y = (this.stage.canvas.height - 21) / 2 - 150;
    this.confirm = this.getSprite('confirm');
    this.confirm.x = (this.stage.canvas.width - 168) / 2;
    this.confirm.y = this.stage.canvas.height - 162;
    this.handleConfirm = this.handleConfirm.bind(this);
    this.confirm.addEventListener('click', this.handleConfirm);
    this.container.addChild(maskBg, tips, this.confirm, this.iceRoleDefault, this.snowRoleDefault);
    this.handleSelectIce = this.handleSelectIce.bind(this);
    this.iceRoleDefault.addEventListener('click', this.handleSelectIce);
    this.iceRoleSelected.addEventListener('click', this.handleSelectIce);
    this.handleSelectSnow = this.handleSelectSnow.bind(this);
    this.snowRoleDefault.addEventListener('click', this.handleSelectSnow);
    this.snowRoleSelected.addEventListener('click', this.handleSelectSnow);
    this.stage.addChild(this.container);
    this.stage.update();
  }

  handleConfirm() {
    if (this.selectRole !== null) {
      this.emit('selectedRole', this.selectRole);
      this.destory();
    }
  }

  handleSelectSnow() {
    if (this.selectRole === 1) {
      this.container.removeChild(this.snowRoleSelected);
      this.container.addChild(this.snowRoleDefault);
      this.selectRole = null;
      return;
    }

    if (this.selectRole === null) {
      this.container.removeChild(this.snowRoleDefault);
      this.container.addChild(this.snowRoleSelected);
      this.selectRole = 1;
      return;
    } // 如果胖敦敦被选择


    if (this.selectRole === 0) {
      this.container.removeChild(this.snowRoleDefault, this.iceRoleSelected);
      this.container.addChild(this.snowRoleSelected, this.iceRoleDefault);
      this.selectRole = 1;
    }
  }

  handleSelectIce() {
    if (this.selectRole === 0) {
      this.container.removeChild(this.iceRoleSelected);
      this.container.addChild(this.iceRoleDefault);
      this.selectRole = null;
      return;
    }

    if (this.selectRole === null) {
      this.container.removeChild(this.iceRoleDefault);
      this.container.addChild(this.iceRoleSelected);
      this.selectRole = 0;
      return;
    } // 如果雪绒绒被选择


    if (this.selectRole === 1) {
      this.container.removeChild(this.iceRoleDefault, this.snowRoleSelected);
      this.container.addChild(this.iceRoleSelected, this.snowRoleDefault);
      this.selectRole = 0;
    }
  }

  getSprite(type) {
    return new createjs.Sprite(this.spriteSheet, type);
  }

  initSpriteSheet() {
    const image = this.loader.getResult('selectRole');
    this.spriteSheet = new createjs.SpriteSheet({
      images: [image],
      frames: [[0, 0, 120, 126], [120, 0, 120, 126], [242, 0, 119, 130], [361, 0, 122, 132], [0, 132, 168, 62], [168, 153, 209, 21]],
      animations: {
        iceRoleDefault: [0],
        iceRoleSelected: [1],
        snowRoleDefault: [2],
        snowRoleSelected: [3],
        confirm: [4],
        tips: [5]
      }
    });
  }

  destory() {
    this.iceRoleDefault.removeAllEventListeners('click');
    this.iceRoleSelected.removeAllEventListeners('click');
    this.snowRoleDefault.removeAllEventListeners('click');
    this.snowRoleSelected.removeAllEventListeners('click');
    this.confirm.removeAllEventListeners('click');
    this.removeAllListeners('selectedRole');
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAllBMVEUAAAACSYggX5YaW5QeXpUASImnwNaQr8uHqccVV5EASokAS4hwmbwtaJw7cqMjYZhQgq0xa54qZZohX5YgXpUlY5geXpUgX5cITYsgYJcSVZALT40ASIYASIkASIcATY4ASZJokreat9BIfKlXhq8XWJH8/v65zd/H2ObC1OMAR4bZ5O3T3+u1ytz3+vzn7vTd5/ChvNNrhtqJAAAAJnRSTlMAXqbgmDv+9/e9KCPy8ujm5eTj08jCq5+ZkH1zc1VDFQ728/Pqs4XHlfQAAACYSURBVAjXJYpVFsMwEMTGYWgbZiyZwve/XONUP/u0I5wQV9ddgotSTpRO9/L6f+gtkE96V1s6O+4wfK05BcyQxiMwxjQ0QewpU3U22QS1JTQlmrBqFGKplFSLKGAszFBisPM2B/9n/GhAnC1RkmwOgR+tDw/wHmvkAznjetfJmeUATLmz903sganqXn9xbsseF16raa0P4Af0HwyRI4TsFQAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAV1BMVEUAAAAhYJaIqscASIdGeqggX5YASIcSXJMrZpvC0+K0ydt6n8ANUYwYWJIfXpUkYZgVVpEASYYeXZQHTYoWV5IATIkASIkASYrs8vb5+/3N3Oi3zN2Fp8ZBZysYAAAAGHRSTlMA1PZZ7apiF/z6+u/s3su6q4WBdFI2JyMcaQe4AAAAQElEQVQI12MAAXYBfiEGKBBl5JLihTDZ+VikJCUYIRxWaUkWTjiHm1GQCcYRERZnBnFggG4cDhkeBjhgYxMDUQCHMAMiLji3MwAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAulBMVEUAAAAASYgAUZsQVI8ASYgAS4opZZoCSYm3zd4jYZcAVY2Hqcdpk7l5oMAdXJVBdqVNf6wfXpYhYJcSVZEQVI8DS4kASIsATY+wxtoxa548c6MbW5MPUo6OrsqApMOFqMZvmLwwap4NUIwxbJ5ThK5KfapijrYbW5MES4hAdqUWWJENUY0VVpAZWpIdXZUhYJYPUo4aXJMQVI8ASYiYtc+mv9X6/P72+fzi6/L+///o7/XO3OgAR4bv9Pgt5jrkAAAANHRSTlMAZAd7QCDdUv7iDfv19PLw5NnNmIhZLhn+/v37+Pbz8e7u7u3s6uno5OPg08/KwLKcgG1JJOUCZwAAAJJJREFUCNc9i9cWgyAQRFdE7Mae3nvvgCX//1sBSbwve3fODAjwNbLj1AFJElQfxt1DV7jZYRPbrnnvhMCJSnfniIiGORj7IpAFUk4zwKPZQjja0g0GwE9DPDePEnllfl8Vnq7cuPjMP6LGM2LxdaL8MecWMVUHL9n4/N/GlVWnugRBHhb03TDQwBy+fvQ1AK0FvtTwDm88Znn9AAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAA2FBMVEUAAAAASYgAYJ8BSYgDSogeXZUhX5YiYJccXJURVY8ASYeUssycuNELUIxzm70fXpaMrclgjrR/pMNFeahtl7ssZ5siYJgWWJIVV5EUVpEASIkASooAS4cAUYsAVY6NrclAdaV8ocImY5llkbZSg60HTIoOUo06cqMjYpc5caJYh7BEeKcoZJkHTIobW5QqZpoNUY0rZ5oXWZENUYwhYJYXWJIxbJ4kYZgAR4gASIcATI76/P39/v/B0+KmwNb0+Prp8PXj6/Lf6fHc5u/G1uQAR4bK2ea6zt81FCcdAAAAO3RSTlMAOQZY++ni0rZ7X/79+fb18/Lw7Ovmp5iOgkgsIhYN/Pz69/X09PPw7ufm4eHg3drT0M/KwqimgW9RG8/Xgh8AAACmSURBVAjXJY1VFsIwFAVfQh2vCy3u7pK6wP53RALzdedjzgVK7SIIotVjEx/aRULSBu9RsVukZQhVnu98CDbhwMHwnJMVAtTsNzEA7FO1RnOFpYhLDASM1+nYjvQz/FCGGZlU/l+8Kc+9OxxNMcuxu8i0B8gz/g6U26e0QOkUIhMxih1A61CVEJJGoU5/7HHY6HbrpC6x+LqMozLWtgEwkGyaskvHF8qnEHsqT8FBAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAk1BMVEUAAAABSIcdXJSIqsdNgKwAS4uEp8YLT4yWtM8ASIcASocAUpnV4uwCSIi4zd6DpsQ1baBJfKk1bqAlYpkcXJQcXJQYWpMES4kASIrT3+ttlrqzyNugu9J9osIQU45gjbQWV5FBd6UmYpgrZ5sfXZYiYZcVV5EQVI4ASocASYoAUI/////f6PDa5e76/P31+PvD1OO/ExTvAAAAK3RSTlMAWOX25iz19/1jOQj9/fv06+jk2cOrl2kz+vj39vPw7uro5+HQu5JzSCMQj5hW7wAAAHlJREFUCNc9zFcOg1AMRNFxgNfonfReDUn2v7oIYXK/5siSMRXW1wbzrky0m3HbMi9kUz6s3oLg3J+Ocnldvn7rC2qTNoHgvk+qUOCKoXxCUPZZS2QzPlCH4rNRSqVLXisN7Y2piBNPw9GYzTkmhyl5INAmxr+H7YAfrv8IgeLNE8wAAAAASUVORK5CYII=");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAA0lBMVEUAAAAjYpgESooAXplei7QfXpYASIkASYkhYJccXJUASYgASIi5zd4BSIcRVI57ocJok7gKT4xYiLFDeKY3b6IRU48jYZchYJcYWZIOUo4UVpIRVI8ASYhVhq+eudFLfqs3b6GOrsqyyNtLfapYhrF9osJIe6g8c6MVV5FokrguaJxNgKsmYpgsaJwNUY04caEtaJwHTYonZJkHTokDS4kASIYASosAS4fT4Ov1+PvN2+i80OD////4+vzw9fnq8Pbe6PCtxNn6/P7m7fTB0+KkvtQ1H+RFAAAAOHRSTlMAukEH59o5LOSdWyH+/Pj29fTn5eXiy7GslIN6NP78+/v58/Lx7u7u7uro5N/W0Me6tZtzY0obEebTaygAAACgSURBVAjXLc7VGoJAAEThcdd1AVtpsLtb6TDe/5UE9L+bm/kOQEp/IgDNd36WFFCTcaeca2eDRWtSyVUBKgQCBUXhLrvMVLdMrwLgm7jeTKK4JtgAWQW+zFjj5dUpSKOz4wBZPGcSwG2OzMH7WHhIUnF1rr1FGMPmERnFGV1xK7uTEydKK+wSUH0Q9uat1J1ayOy7qef32wYKxNTESx7wBSWcD/HJKj2tAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAA2FBMVEUAAAAASYgCSokATIoAU5akvtSSsc0aW5MjYZcdXZUcXJUZWpMMUYwASYiXtM9Ie6mHqcdtl7pgjbQ4cKF7ocEwap5GeqgsZ5wfXpUhX5cKT4shYJYRVY8rZpwYWJMES4kASYcASooASYoATJGMrcmxx9uAo8QrZpseXZUoZZk8c6NPgK0KT4w1bqAOUo0qZpsUVpAiX5ctaJw3b6EnY5koZZoUVpEASIbI2OXD1OMAR4b9/v/4+/3x9fnn7vSrw9jr8fbd5+/M2+e8z+C0ydywxtrg6fHU4OuFZKXYAAAAOHRSTlMAOFEaCP375+Lbn5R2Jf359vPw8O/r4+PLwbeurJeMaVtAKxL49fX17unm5eLe3dnV08u+sYaCX0LIcsgAAACrSURBVAjXHcxFEsJAAETRnhAX3C2GuxP3wP1vxIS3+1VdDYpMJfGq1FBhvNyPIt6rihyTlSB4kTNkATnmZzaYTrqzUBsEg2rwHF40MF3noU6kkWID0OvFqe2EX07SgHnpLFuiuE5cj4Xs+o0xSw+C7hsqF25A3d34BaOZ3kDNSlcG6Yc9loaQ1XXgkPMjYo0bft8EyPYTt/eLoDUHZZ6bRcb1pvjTDGWiEgA/u+8SzNbEbFgAAAAASUVORK5CYII=");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAgVBMVEUAAAAkYphslroASokASYcAXaKKq8hVhrAqZpsMUY0ES4kASYkAT46mv9U6cqMfX5YfXpYdXJQdXZUcXJUASIcAT42txNk4cKEZWpNWhrBhjbRGeqcaWpQYWZIASYwATI7T4Ovi6/L9/v/6/P62y933+vzc5u/O3OjD1OOVs80AR4bqrTiiAAAAIHRSTlMAue1FTAP35+NxZz8W+erW0sS2pTUO/vr39evmm40qG22hWhEAAABqSURBVAjXRY1JFkAwEAWbBBExz7OYuf8BPaSp1a9FvQ8i1BRRCrQcFF4CpNAf3NFyABxyw3XpG6AIN9PGndQT61GabI5xC7ZYBMU2ZYC54cs/p9XEBEq0/3nn3e+K1l2/PD2PnANCOX3HBeoABmrW+ItFAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAsVBMVEUAAAATVpEASYgASYhzm70jYJgASo8kYpgUVpEgX5chX5YOU48RVI8ASYkAWJOkvtSxx9ueutKCpcUgXpY1bqFlkbdCd6Z0nL5HeqkfXpY8cqQjYZgtaJwhX5crZpsAR4gAR4oASooAVY68z+BHeqhPgawLT4w9c6Rul7swap0qZZsMT4wVWJEXWZEETYoAR4bk7PPF1eTc5+/z9/rN3OijvdTg6fH3+vzs8vfR3uqpwdfKEe0+AAAAL3RSTlMAgUsh+rgX6NvQyIZ5Kgj7+vj29vHt6ufk4drZy6mMVzIwDf799/fx7OXWx6lkRthQSpwAAACmSURBVAjXNczFAsIwFETRSV0objUquL4k9f7/hxEWnN3M4gKYMi8MPVZC0cmQbSuXjqV+by6vj5j40Zki2FekAdq62gfQdjKBksidhiKqVjmQUxUVwHMjyHXvYv0CYNGi47wzSAdKWtRn217VcwdgBqePql3apQ9zaCZQDs1gwqz/ozbhz7j91vUJ9TNfxUR/2m4NLmILCNzbKMS4UemfjKUpywB8AfYvEVvARy5bAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAz1BMVEUAAACWtM4hYJcfXpUXWJIOUo8HTYsASYeeutIHTIouaZ0kYpgBSIkATYsATYwAVZ4GTIlfjLSJqshlkrdWhrBymr1Lfapmkbdslrpdi7NBdqYfXpUZWZMWWJIFTIoASIcASIgASIYAS4kAUY0AVZKlvtV+o8I6caINUY0GTIl0m74vap0fXpYOUo5Vha86caIKT4suaJweXZUITYscW5QbXJQiYJjB0+PO3Omuxdr////8/f7x9vnG1+UAR4bt8/fs8vbZ5O3f6PC5zd6zydvXWFI/AAAAN3RSTlMA/N2siHxxTv7k48RkHhcH/fr5+fLt7evp5+fOpplfVUQ5LxMK/fz8+fnz7+vq6N3Tyb65uJ6U/JWIgAAAAKpJREFUCNcVy9USgmAYhOGlBRTsprE7fzrU+78mP56jd2ZnAZiSzvOCjUZQ7OuszM8iyHNVjfnjJhtKgDNNuzIgDT4nE3Irv4No5VTBi/3eILeaa9MS6dThNotFuPNkqHquuk5yAbj2E242aXUZLTCXM471L8KXPjAMR7ZsT49GCvydtgDgzys+hKGlvUdHKRgnAVgO0t5hEsWLDog6jiM2KqgbiihY7YDiD1hFEaFM9n9qAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "dac5777ed33d3de39dc737ee1b13caa1.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "7cefca430551caf56e256d470cff4794.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9d63c3a09c561f11ee8d3c578dad5a24.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAMAAABySOkBAAAAY1BMVEUAAAAASH4ARoUARoYAR4UARIcARoYARoUARoYAR4UAR4YAR4UARYUAR4UARoYARoUARoUARoQARoYAR4YAR4YARoYARoUARocAR4UARoUARoUARIQAQYMARoMARIcAR4QAR4YamMgIAAAAIHRSTlMACNb6xh7gmWAoz7RQ7IxxRBrxwrumhnxsNawUDjoxaPXBMpQAAADuSURBVCjPhZHZloMwDENjwk4hZZuytB39/1dOMnZa96FwXySik+MImxOyKfU4swQZMxPpcwRsgX9SkvN7AiYX/ZFgi9+7JLYyAbLAM/P4u0ES4MoTAGsUA8A3ViBX53cAPP0CjCqogJbdAswquAI1u07eJ5RAw24GFhXcgILdCFxUUAA3djmwqmACyle/XQWvftRKDaHG0MszhkoHq40Tu4R0ULa7icWdLm5RnPTbvvVLD/o9VdDofr2u8W1/bdzf43N/dL4/d7C/jjzeBnn3c2AKmsQ5mVaDiTq/fzMCQ8PnDZnIbxJ40BRkI3PMH6DvHHa1K2cAAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAMAAABySOkBAAAAWlBMVEUAAAAAOnEARoUARIcAR4UARoUAR4YARoYARoYAR4YARoYARoYARoUARYQAR4UARoYARoYARoYARoYARoUARoYARoYAR4QARIgASIEAR4YAR4UARYYAQIoAR4ZPjw3jAAAAHXRSTlMABdYexV7r4LSMgVIrEPXRv5Z1RvjJPzQjqJ9nGA6/vgUAAACnSURBVCjPhZFZCsMwDAWzb7azp+k2979mbfJRU0t0fgQaJHi87B/3ufLUyf7dEhjtr9i4mJOTnovkWV56vB0yiQVeouhgE8UEVhQNOGmfwygeWChEsUEnihqeohi0fCsYUeTFkomUjZHFQZsr+Xa5XWhFcYNKy/fQYvRaf6vWn9H6O7X+yiSbxwFhxntDROu+yXYiohbtSKCZCcRl1YVnOt0R5hVS5wNN+A83Cfk+wAAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAMAAACdioI/AAAAY1BMVEUAAAAAPHAARoYAR4UARIcARoUAR4YARoYARoYARoUAR4YARoYARoYARoYARYYARoYARYQARoQAQ4IARoYARoYAR4YARoYARoUARoUAR4UARoQARoUARoUAQ4UARoYARIQAR4Y3gvI8AAAAIHRSTlMABPvGHdbo3Ipx4s60kVJENSoO9++7qoBpYiChmxXzPATlGTUAAADVSURBVCjPhdFJjoMwFEVRN6QIfd9WUnX3v8rwseIw+FLu5A2OQGCbb+2TP8rM6qX9A88UyVWceRulcZylhBYTuyPdn3kQ10WxiWRML5NCY9RG6FToAatKB6NRa6DQZYNSlwUeujxg0WWCTZfb5Uft789RuneprOMvicBZ8T61+nOcIT8EWN9Qg5N8v52bXW/gbtRmyHTxUOuSQ6uCdZCokoCzqrSQG7UavC4ZzLpUUNkj+Rjp+owkPAEMbRRbEApL2kdqB6SxDFJe3rfepH9byszWfOsFcN4XrlgDjG8AAAAASUVORK5CYII=");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAMAAABySOkBAAAAV1BMVEUAAAAAN3EARIcAR4UARoYARoYARoUARoYARoYARoUAR4YARoUARoUARoAARocARoYARoUARocARoYAR4YARoYARoYAR4UARoYARYYAR4YARIgARoYAR4aaOk29AAAAHHRSTlMABB7FtvLY0GFD6d8nCxael3sqq49/dVpOPQ+D1pPl/QAAALFJREFUKM+lkdsSgjAMRFNo5X4XBNz//05bQ6eKUcbhvGQmZ/KwG/pNrWPLRGnsiMI+wZMrj1h5sYApwNzJM/LB6k3vhYocRKsb1mYkYYBS2lcAKkmUgCGJDEhEkQJaFB3QiqIFOlFoIBVF8pmvLHILYOr3feSbmncHvYElHARuYJr/8o3f8jVn8p3/X378P+XY5mu+mXtQGsxEzLJ1l4AZdqWa7UBXodSLI1PajUHRAQ84gxPdBrb6xgAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAMAAABySOkBAAAAUVBMVEUAAAAARoYAR4YAQoAARoYARoYARoUARoQAR4YAR4YAR4YARoUARoUARoUARoYAQIAARoYARoUARoYARoYAR4UARIgARYoAQ4AAR4UARoYAR4YJAr7oAAAAGnRSTlMA+uEKltWyI+nOXfB6QEUEZSm4n4JQGBG8dG8U9eIAAAC9SURBVCjPrZLbDoIwEAUBKeUiIDfR+f8PFXIgkC4xMXFeGLqHkt02+soteG03aV+TRLTZe7OUfD4VRmIvy6E7FQpotCWgvwQ5D5WWglwNTmt7LpeVkMmC3B1S2Z7rZSncZUEug1IW5AqoZUEuB2/6W0kgWXDeu/UZUz1VaBBFgpiOXVWoWNEHGoKLF9xcxiswRFc8NAfLqP4sg/qz9OrP4jQHS3Wegz0/S6fzszRQ/NZfDY/okvTo29zof/MBZV8OJBZ3GuUAAAAASUVORK5CYII=");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAMAAABySOkBAAAAXVBMVEUAAAAAN3AAR4YAQ4cARoUAR4YAR4UARoYAR4YAR4YARoYAQ4cARYQARoYARoUAR4YAR4YARoUAR4YARoUARoYARoYARoUARoYARoYARYQARoUARoYARoYASIYAR4blsAA1AAAAHnRSTlMABegd1t7FzL6SaxUQ902zraOch3ZbOyTyQDEsY1KZGKQ+AAAA0klEQVQoz4WSS3LDIBAFB2Qi9I0tyZI/Sd//mAEzkTbjcm9e8XoBM4V8oIpfiUXaHLHa++7Ei6ZEdNq7mkLQ6FRM2s+dz+E3UdJxrRIifY5eFAc4MdjAi8UdalNc4WyKBRpTNLCY4huupqjhbgoPmykC+ESoniHn8ZCRQu1L/h63qxhK+n1ZfXj1fUvBnirZiylmmE1xgdYUEcZ3Uz1MMUBn9R0MYvGAYIoR4n5wGc3/+Y4lTi5S+NF+HXSH2k+iPG9kbrrjszu+zymzuphD+/f8ARflFzCt1V5DAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAMAAACdioI/AAAAV1BMVEUAAAAARoYARIYAR4YAR4UARoUAR4YARoYAR4YARoYAR4QARIUARoYARoUARoUARoUAR4UARoYARoYAQoMARoYARoYAR4UARoYAR4YAR4UAR4YARoYAR4aXohAlAAAAHHRSTlMA+x3pxdffjmujNhC9hnFTwTAWCdCps5dhTeRM8AZ3UwAAANVJREFUKM+FkdsOgyAQREUUr7VW662d///OgiuOSTfxvAzJGYWF5Ja0zTxl0oVo04twCJgFO/0pmhyCO2KIZj7EY7AhLP9mgFfq8V+HaLgLYBKVGnC6eQK9bkqg0k0BPHQzAaVuemDTjfPj6MYAjSpGC1hPPtQuZEG1Qsis5JOnjsZIfhpegQlkY7cnUKiD8kY46H8xA74XU8UiB2VxUwdlkS/K4nC+aL4vWOQ4rf70Hc/PojYoi34pFGMPYY2tN4SYC/eUK7aziOl6h7nnXY9tyCq54wdM+BfZ0VYjqgAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAMAAACdioI/AAAAVFBMVEUAAAAARocARoYARoUAPoIAR4YAR4YARoYARogARYUARoYARoYARoYARoUAPoMARoYARoYARoYARocARoUAR4cAR4cARoUARoUASIYARYUARYoAR4ZqBr6QAAAAG3RSTlMAf6xyCevkQSsZwZVaSxGhhWHXyLaNUzjdYCUyXPSkAAAAq0lEQVQoz5XSWw6CMBRF0Yt9ACJvBHXPf55KCl+exrh+INkh7S21H9pi58zK9OLP8CS5ryTNEUq+lEe6kAz9+bEdfH/ZOfPN5zExm1QHel2uUMhQAKMKJUAlQhcBZ8ICLCo4INZqw2l8YQMGU25wNakg1LpUbWWKrzuTusCoSwM3vQaw5g6fNjMK0at9RTLLDGTGf+n/dVyrxpQJgj6AB7n5I7Npgc0019of3ld+DwVCUuTMAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAMAAABySOkBAAAAZlBMVEUAAAAARoYAPnEARoUAR4UARoYARIcAR4UAR4YARoYARoYARoQARoYARoUARoUARoUARYQARoYAR4UARoYARoYARYQAQ4YAQIMARoYARoUARoYARoYARoUAR4YARoUARocASIYAR4YAvYkqAAAAIXRSTlMA+gXVxOAetumMYimnnHBEGvHsyk84Ew2FaVYyrZSBe3LW3TuvAAAA80lEQVQoz52RS3KDMBBEkUAQjMH8CWAnefe/ZBCDQIuoUuW36WEafVoT/UOaWKpo3jU9+7XBol7sJProTzGCQfg8jKf7Hg9HFXtfK1jTjSgarRh4yAmgIo8GZMUKxutPgJzeQ+IZBbRSVXD3jAfEUuVyP8cNMqnuMHvGF5RSJdB7RgnfUhlYPSOD25lv9IzY5dMtfGyYtDBWFU0tvywInXspd2LuDCXaHhv3oCzddNsVynNBHspXhfItoXxDKF/t5/Pnp/+a3xCa3/LO/HK9sZVWrnwVwktnCD9i6A4hFrk2HhSW5liQXXefY8ugMytP6Yf5BeFPIOHAIPnfAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAiCAMAAACdioI/AAAAUVBMVEUAAAAARoYAOHEAR4YAR4UARoYARoUARoUARoUARIcAQoEARoYARoYARoYARoYARYYARoUAR4YARoYAR4YARYUAR4YARoYARoYAQooAR4YAR4aA7L3dAAAAGnRSTlMAtQXqxfFBJtYeCt7PeV0Rl9KeY02rkYIZ4hZbsSwAAADYSURBVCjPhZHpEoMgEIMXFGzrVe1l8/4PWrakorOd8fsTZhJgDzlicXWil1utnIsxTvjyzFJ7IZcamZb6EjKDV8af1dCpgHhOpGdVkh35GICLFMJ6pwGCKCYYgU4UExwAxyODE489cFW1wSvQq9qgAwZVG+xYvw1WrN8G30CVaJumVQXCQueOTNfycC8v0wlZw7g6ecTTOCAzy19ubNTyYqOWmY0WTKOGaT8Rs1GDWf1+o5UY7Oq9QmWj24nOnuMr7cTAgdJ4lD+zE3jFbSobTkr0TuXh5YgPtKwYMF1uUUsAAAAASUVORK5CYII=");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "a5b7f6d9ddad0a7961e5a5e9e79a607c.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAMAAACkwzTUAAAAh1BMVEUAAACyyNCxyNG0yNGxyNCzydG2y9SyyNDj//+yyNGzydK/0dW+2tqyyNCxyNCxyNCxyNCyyNCyyNCzyNGzydGyyNCyx8+xyNCyyNCyyNCyyNCzydCyyNCyyNCzydGzydGzydC1yNS3y9G2zNWyyNCzx9CxyNGyyNGyydC0yNC1ytG0z9Sxx8//yhnSAAAALHRSTlMAxJpO8UYacAOQNw4J7OTVvbeobmNe/Pn33smVjYh/VEspJh6yfHl1Zz4yE5W7TgQAAAD4SURBVCjPdZHZkoIwEEUJqygIsigIbuMyLuf/v2+w01C8TD90nzpV6eRWHFsrz/POi490ESL3AL30xygXOQCZ9O1b7YPGGHP73I1JIVdbYJSuPmyUDYXSBnCV1xwsVABHvWxLKRD6rKGyNgRvPP+EwNolLL8zgP4MF2tPEH5nSZtUsLK2ZCcxe17OEX8ge8mvzMuw56d5jk9fh0qDbVdKObGTZIUGOsxCdHTC6TzEC2R3MoW4Qt2ShrJ2HmIPtXAwDwE3y/UUIgJ8fdt9ChEDtbJLplRAGkWBc4qiKJt+YgnALpbhvx2tTmwO0ART9iR2XdeTLvK/+gN7aR67SwQ06AAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAMAAACkwzTUAAAAY1BMVEUAAACyyNC0yNGxyNGyyNCzy9KyyNCyydG60NOxx9CyyNCyyNCyydCyydG0y9G40texyNCyyNCyydG809OxyM+yx9CxyM+yx8+yx8+xx9CzydGzys+xyc+xy8+2zNO5ytOxx8+SjcqCAAAAIHRSTlMAcU6awzH4axX13p+KRysQ6M+DC+zX1crAl2RbVTsjHeM83hUAAACNSURBVCjPbc9JEoMgFARQJkFQJGrmse9/ypCUpRZ0L/7iLX5XiyVJKRVFkfmCHFfoC7/YT8HSGHNEJ+pcqQZMRC3uNbZArLUBhloVkGp18KSsx5noYJ9Mw0x0hCTq4egIRUc0dETLRlhSNiEQ7WDKn1LKE8Z8d4UPrDlsjT1yvPnrW2ystY7plu/ygeYLjgIJxGuKaPgAAAAASUVORK5CYII=");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAMAAACkwzTUAAAAbFBMVEUAAAC0yNGyyNCxyNCxyNGyyM+0yNCyyNCyyNG0ytHT8fGyyNCxyNCyydGzytO1ytKxyNCzyNCyyNGzyNC0ytK3y9S21NSyx9Cyx8+yyNCyyNCyydGyyNC6y9e/2dmyx9CyyM+zx8+zx8+xx89j42qwAAAAI3RSTlMATcSvmm9i+o5GBPDjVDkwuZN7cisdEffq1r+GgA4KzaZlQEe4bl4AAACzSURBVCjPbZFXDsMgEAU34IIL7nbcU9797xjAsZGymY/5GAmk3aWD4WZID9PJLmBQD+vmqgUsk3NcXrkVQsihMR4xE6dCRZwJAXEyrDxuQMRrByS8JkDH6wvYrndRFGkqjSWyM5YZDIszwm/sR1iE8+LHyaWUKyljv5scihhpjJbXHtC8FkDBqwZ6XlvEKa8KOXGeyMMwTEhb/5wyrq3v/pS1q7Orbz+GCoLgttfG/oc/fAA4BxDPIITpRQAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAMAAACkwzTUAAAAY1BMVEUAAACyyNC0yNGxyNGyyNCzydGyyNC0ydOzydG+0NeyyNCzyNCzydGyyNCyyNCxx9C0ytO/29u///+yyNCzydGxydCzydG20deyx8+xyNCyx9CxyM+yx8+zx9CxyNCyydGxx89kCreiAAAAIHRSTlMAwk6acGLxKkoOtolF9tOuMwkEkX93aRPq2cmrm5N9WZ1zgBIAAACeSURBVCjPrdHJDoMgFIVhkEGcAat27nn/p+yFRBrFNF30W5yYP3FxA4uqgviwxrOV4yCPa9gpVYvggsimLDnn9TLRnsFZrkZ9UHvcD6rGKY8OUHktgTavLVDmVQHV7m+l1A16FzWCeVvnGPXCtpphGDo0vx5R/feI5ElH5AT69G2klIYVtP3nJV4IxridTTch4DEatvKNEKJwIy3FL95u1Q2cS9gKrAAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAaCAMAAABvn+dxAAAAaVBMVEUAAAC0ydKxx9CxyNCyyNCxyNCzyNG8z9myyNCyyNCyyNCyx9CyyNCyydGyyNCzydGzydG0ydGxyM+xyNC0ydKzytW4y9i/4OCyyM+yx9Cxx9CyyNCyyNCxyNCyydCyx8+yyNGz0NCxx89xlUeGAAAAInRSTlMAKq7xgFxDDdPMt7OahmZiXknspjsmEwj17em9r52Ie2obKx1eIAAAAKFJREFUKM+VkNkOgjAQALe0FREBkcP7mv//SCWFfVlj4jw0k0ma3az8S9erHi5utppCa8Vmti1rraXWDaXWgttsa7Za94TZPA8dBnWyHHZLHaBN5mC11BU4tWGpO8iTNVDH2IqLMXZ4SYxnJsKeiad+Y6Jgwo+yELIsq+T+eY9UYvEEG3NoTEyrG1pwtjaQ2xrwpqX7W66UYulPTr7wkh+8AWodC+Sjno7FAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAaCAMAAABvn+dxAAAAdVBMVEUAAACyyNCyyNCxyNCxyNG0yNC0x9GzydGyyNCyyM+yyNGyyNC5z9jr//+xyNCyydG30Nq51OWxyNCyyM+yx9CyyNCyyNCzx9CyyNGzydGzytC0ydCyytK2y9C2yNW2y9KyyM+xyNCzx8+yyNCzydGyyNGxx8/4n+kSAAAAJnRSTlMAcMKvmmJOS/nwkYQOA7ZTFAnk1szHqYl4aVpGQDAqH/XZoI1/OJCXFHUAAAC1SURBVCjPbdBJDoQgFEVRGlHstey1tPq3/yUWYNDB9w4eyRkQAtvLwjCM8souO6oFTJ/WLveYF7C93BZeObQQQmZfs33tNUDLaAXkhTZILjTGSDEDZqobcKe6AA+qCpiUKtmqlIoOrWLYUnecrJx2bm/ZwamUMmWJWY2R0TQ4xQooqa7Aj2p0+fQJOqea4sZob3TnbZzziJVmG/QeZ5h0Alu8eR2cCrvP80vzIQiCsE7MLrv8Ab4oEckwH9noAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAaCAMAAABvn+dxAAAAe1BMVEUAAACyyNC0yNGyyNCxyNCxyNGyyM+0yNCzyNG2y9LP9PSxyNCzyNCyytC0ydK3z9a+1Nr///+yyNCyyNCyyNCyyNCyyM+zyNGyyNGzx9CzytGyx9CyyNGyyNCzyNGyydCzydK0yNG/z8+xyNCxx8+yyNCyydCzzNKxx88IMMm/AAAAKHRSTlMAw073r5pwYkodBPGUVTIVCwHk4drHpop6ckKpj4Ftazk3EM+7qIgojPQ2FwAAAMxJREFUKM9tkVcOgzAQRN2AQOglkAIE0ub+J4xtWIjkzMfz6kkra2y2ZBZCHIrMkG3JG+i0D8MzyYjDpLZUZDtIzrmae81rTvYKztxwnP7YCq0rI4nBtSEgXDsBqWsTIHPtAARBIFiquRcOjzDp7UGabGNZUrcnKqVUV8SaEt1qS7xprZD0ZhEwks2AxC2RAtMy3X9KCCB0S4xAtExnyIJsi3KdbqgZ5YRmmyrf9y8s0azxYnSbiYztcfzQWmwtt7zsf3HzPO+Qx5qr/AJX7RZ18BLdbAAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAMAAACAXYxPAAAAbFBMVEUAAACxx9CyyNCyyNDQ8P+yyNC1ytKyyNCyyNCyyNCyydCzydK2ztKyx9CyyNCyyM+yx9Czx8+yyNCyyNCzyNCzydCzyNGzytC0zNK809OyyNCxyNCxyNCyyNCxyNC0x9GzydKyydG2yNuxx88tiHSwAAAAI3RSTlMAgd76BMEy8di3W0MW7ubGsqCJfG9oVUkqC62nnZFzTjkhDjOuW/MAAACPSURBVCjPZc9HEoQwDABBgck5w+Yw///jYjit1Ae7ag4qSbwy2C2S+G+W0+LwxhpvOmPHIeNwO+M3DndBdN1f4ki0gcG0EmbdqgZWHXNo9cgJ0o9qiYNClB560WKyi4mhS8R4bya9Rnvf5hAjx5m2Qq1blEGg4xMavWOVYg98QCtaB4ndh7sYcVrZWJTy5wcGcgst+jc19wAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAaCAMAAABvn+dxAAAAdVBMVEUAAAC0yNGyyNCxyNCxyNGyyNC0yNCyyNGzydG/6+uyyNCyyNGyydG2zNO8ztqyyNCxyNCxyNCyyNCxyNC1ydS70tKyyNCyyNCyyNCyyNGzydCzydK1yNKyx8+yyNCxyNGzyNG1ytCyyNCyx9Czyc+50dGxx8+M31o4AAAAJnRSTlMATsSvmnBij0cG+35UHA3y8OPVvSoQ9rinhmU5NerHeW0x482WFleKKhcAAADYSURBVCjPbZHJGsIgEINH1m7azVZt6655/0eUwsDF5hDCf4DJNxQ07Jxy75R0uMHJvle/R5j3WNV5Lxamd4xCCDmUzq/omZ4hKOqEEyeBc6IdFKcWl0RrlPxZgUeaBjAh7YE05RHIQlqAJdIMOIZUAd9IJ+AQ0gOYjKnoaYyRqInfbbDqEo4p0qu/3rw3A9MerZSyJOt8TKO/YDdL6M0S1X+JGZg3S+wjNamERpFHWqLhZNFSlEKXNtFqrTOqnHdpE3NYovVH/STWx1O/5zGjqNwqpXbeGf4AL8QYNMKaNjMAAAAASUVORK5CYII=");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAMAAACAXYxPAAAAclBMVEUAAAC0yNG0yNGyyNCxyNGxx9CyyNCyyM+7ztizydG2ydSyyNCyyNCyyNCyyNCzydHV//+xyNCzyNCzyM+zydGyydGyydGyydG/29uyx8+yyNCyx9C0ydG0ytK20deyx9CyyNCyyM+1ydOxzdW2ztuxx8/IJO82AAAAJXRSTlMAYk/Cmq62cA1HKfby0olKA++ShX54a1wJ6tacQi8TycewNCQVO7rYNgAAAMdJREFUKM9l0EeuwzAQA1DKklvca3p+SXj/K0YaexzAeQtiwBUxEFnktSGbFquTpdf/hJywaP8YXCj+IWYW1trkMfk800JcWUElTD6HqniFuNBBdRwhSk7bDtIsI8mjlgcy1+Om5Y08yJGTTy2PZCaHIWdjItyNMTFLiNeZwdAxmLEwDH4lywdWQxzHNWqfBQd8KTliL9Ptatu+l8v2HSPbd0Z2+OI+727SNG0Q+ayYbE8IesnijkXNwErXYNXWzrno1PtcR74BawkUoocrHGYAAAAASUVORK5CYII=");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "67cfd5157d1af56c65b9fb6fbe84b52f.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "4d26f41c9d48037f00a057dac3eb2dfb.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "c29b9ecda6e028e5becf99b62094c725.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "e18c595d042327e00f3f0bc4374a2762.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "14849ba550932e4088d9bd95ad2d49a0.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "42518907141f68fff301c1b9091974ed.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "d599a74828e49631665b39f68763c622.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "1b8d63ca680ec0155b17a1aee4a0397f.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "2c7046ab0a66487895dedb402f992ab8.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "7499563ea92f40df9cdd58e3269853d2.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXMAAAAaBAMAAAC3GKGHAAAAMFBMVEUAAAA1QcA2QsA1Qb82Q8A3QcM4QsQ2QcA8S8M2QcAMI5g1Qb8ZLaUrObUvPboTJ5588xeqAAAACnRSTlMAvdmUdjMm8xHywRWhewAAALNJREFUWMPV2D0OAVEUxfEjIlGKKCQavUav0WvYwRQ6jWhnE9ZxCZmI6jALIOjZCY15YhP/3wpece67H0rm7dwgq06mv5lpiql+6uY5KGn2DNRVpWafH0Gyv9mFKiOXl4C520OpYT8D5+VjyksZPDsX0sKn4NnamSbEvKTEjNUzrkiTq1sa+B1AH/eVO4g2XnKfviYHBlym4M8R3JLAgwB4/AIPveRVA7zggddq8jGDekL6Asl8tBXS9WOwAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/assets/images/gamePlay/role/role_female_fast_left.png":
/*!*******************************************************************!*\
  !*** ./src/assets/images/gamePlay/role/role_female_fast_left.png ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "ee8139f523058d354450705f0e16cd97.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/role/role_female_fast_right.png":
/*!********************************************************************!*\
  !*** ./src/assets/images/gamePlay/role/role_female_fast_right.png ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "5d7c8b67c2b29e7ca8421af7c09f07c9.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/role/role_female_left.png":
/*!**************************************************************!*\
  !*** ./src/assets/images/gamePlay/role/role_female_left.png ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "b77c1d974da2e31e295e249b91a99d89.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/role/role_female_right.png":
/*!***************************************************************!*\
  !*** ./src/assets/images/gamePlay/role/role_female_right.png ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "f2ae25e233f9de6a7f6cce057d438cf4.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "61c46b9b14830aa2a870001940db284a.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "eda206315525eaa111c844090933b064.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "ed58f3695f21133e79132efb5a0a3727.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "b86e6c08bb1f2ddf1a104d3291750a27.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "5026c03882db9162d018605e393adaeb.png");

/***/ }),

/***/ "./src/assets/images/gamePlay/selectRole/role_group.png":
/*!**************************************************************!*\
  !*** ./src/assets/images/gamePlay/selectRole/role_group.png ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9b13bfb3f55b027c1f36d833c5f11184.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "d6ce111d084e42a25420b00a566c5740.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAaVBMVEUAAAAAR4YASIcAR4cASIYAR4cASIkASIgASIcAR4oAT40AR4b////09/ojYJYHTIlHeqcuaJzX4uyqwdY4b6EXV5AQUo5cibI+c6Pn7vPP3OjD1OKduNCHqMZqk7hPgKvc5e65zN18oMAwNxw5AAAAC3RSTlMA99fE5pNjWFEyHSWj9R0AAAD4SURBVDjLhZPZEoMwCEWzmFoF97X78v8f2SRNdbAqd3ww4cwELiAmpbHRKpIyUtrEqVjqqIFIH0k4UfAnlczxg4QVycMUhw0FIpFbgPy+omBTyucPO3K16D1AW3/IRdmMlEhFTOKIJwrEwoS/ouu6KkPEigDml8IbfxocXQK0vU8iFNnjpJuNv3AYs3PvC408kM/AFcA9Zb/SBiIhl0Bjj61L5uHNXAdGBwwe4J9QASBJNvhos0vhkgxlFtkE3N2xBaiKb5kmeHip6/rpgJIaRazuawt01GrarPyE52WzhCbEPaftZgeGGzl2aLmx5xeHXz1+edn1/wDMDSbAw+QoQAAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAflBMVEUAAAAAR4YASIcAR4cASIYAR4cASIkASIgASIcAR4oAT40AR4b///9rk7lFeacWV5AlYZcHTIn6+/3m7PPX4uw5b6EQUo709/qpwdZ+osJZh7ArZpsgXpXx9Pjd5u7F1ePC0uK6zd6duNCOrcl1m71dirJQgKtMfqrR3enK2OVpz51DAAAAC3RSTlMA99fE5pNjWFEyHSWj9R0AAAEPSURBVDjLhZPZdoMwDES9QEgYGcoeAtmapGn//wdLQccnphDfFx40WNJIEpY4CrUKpAyUDqNYzNlqOOitE94p/EPthGUjsYDc2DhWYMVOYgU5ZVFYRY314w1/vWi8QQ/+4JXnvoJDLCK8kORUwCESISayNE27IxF1GDgc+aWQS0CbE/MYwkjoykVwkzVZWlRkUOQ1NxqM3w+yfCKlM270NQYCIeeCPVA0eJCZzFwUXClLqGXBQgqcGjzJcAo1F9xQ0w/uXIPiNrPGCgwquuNCKbcZsofnsixPNJAgM+jowkY5Vtcl0fTnIU/YandYfUHf7Lwdljvu3vTuuL0L41s579L61t5/OP7T8x+v9/x/AeFQKFq3wb5HAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAMAAABggeDtAAAAkFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+WABnwAAAAL3RSTlMAlP3UG/na7dAF881Qj28XFBH24bijhyUOA8nBu66nl4FUNC0L58Z5aWNgRykJKOYImc4AAAFgSURBVEjH7dbJVsJAFATQl8lOZ1ISEgjzLAj4/v/vPCLJEwWkK7jwHGtDbW41WXXTb+SpcFLVjlA+W/IhQw3xR8XHjCEfcxW7g/iM6ySIt8XHiGeJ9e//vNfuooF385Tt1Rb1c3X4tdeYH/vH4nWIaD7dtsy8X7eCZuH7jrU38V7dhrP0owxKAy9ph1V7gfyDLBGR3nVKM+/JEnWtgFlNtIln8V3/+Ec05q2qJZDPgqo5kPekAf4kd/PuOi6me9Tr4vBNywj0o+q6SiA/lfvuGfEDlkwAH/CnxJiXjEtTv+KT5KZ+w0jEl4Nmnro91DccoCqtHuZlIMQ9PkANB04fvb4pt6nZgKJmAw59HXCM/PD709toICF4QF7n+EBfFDQQ0dm4DwbH4wPpjtABecbgAxO6Fte5wOSiuZ7F6BpXEf2YKLt4eO7SDdGb8JwO8jndmtdk5CuvPjfI+nG0oLvmDXEDe7NP/BopAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "869b8afc640a30a721d479510679010b.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAYAgMAAADolGnIAAAADFBMVEUAAAD///////////84wDuoAAAAA3RSTlMAvz8vTVuUAAAAVUlEQVQoz5WSwQkAIRADxWZs4zq71izJDhSS50QW8xwmIrvblP61mDEj7n/mY8+sm1MXp25O3Zy6OXVz6syS/sCv76jw8E8VijmgUMyZhXKP9d7znRydYooxQbugQwAAAABJRU5ErkJggg==");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAvCAMAAACxB+guAAABOFBMVEUAAABsPBRuPRRwOhV0Ohbmsh7/z0H/z0H/zkH/zkH/v0L/zkH/z0D/zkD/z0D/00HdfjnxUFb/z0FuPBP/z0H/zkH/zkL/zkH/z0D/z0FuPBP/zkD/0EL/zkH/y0FwQBDXajRtPRTxUFb/zUHyT1b/zkFuPRT5mknxUFb/0EH/zkHyVlX/z0DzVlb6lEvyVVX/z0H/zkFuPRP/z0FuPRT0XFP0X1T/zkFsPhFqQBVzQA3/aUvl9O/xS1f/zkHOUzFuPRS+bWPyTlaIZkPffjbXajT6nknV3dWTfGW0aWCTYh2SYR6DWzCHWyTh7ujd6OK0aV/4xz7xwDufSTrpuDnisDbhsDXEkiqodiLP1MvP1MrFxbq6taevpZWjlIKJbVSKblOJa06EYT7VeTvjsTbQni+2hCWcax2iwf9cAAAAPHRSTlMAQM4wIgPd+aJDCfLIkisY+/Xl1tOwaWZcVlBPNiETEP788uzp5+fl3ry7t66YjIqJhnl1ZFlDPy0YFBGrZeuKAAABYklEQVQ4y+3S11ICMQCF4WNh6WLvvffexSM2dAUsgIK96/u/gWFl2GTJCg/gd5OZ5J9zFdgGamyb0Nkaj0mWodEdk9VCY6BFKoZWoeOpF0TXLY5tuKuNxeog/CfVJ13NLMgnElkWBMMeqPq8dOqAysd04lCSzNFQZxrIs9uo7CXLTsjaeHMaVdx9sxWSXjJxElW9ptkD25RzRLjPM2QXfvJMjDi8XdFfSkK8FiNOD1+cRlGPNCJLkr2weFqlEdljjrOwdMojsvMU2WCNGPwQIzpPn/RBaLdGtC5S9PYBgWbyMOri+YphYIVk6kJfnCdJbwQT8Xi8MXNpmua+yjQvM+/icR5NuxUMY65S0oSd0QrJArD2dzEZADBz8MvxVrxdhxAJ0nK8JzuiJQxLu3tiBGDxhFwTf+n/e10SH0qW9MlYv50EDG3SBYlfl7RB4StPghEo+kfKkg44bBiDStK4iOr9AGCm2D7UDkLbAAAAAElFTkSuQmCC");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "95d58baba95037d990684b5ca16ffa2b.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "08138f1b1b6c1e81fd39bd6e103a1d17.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAnCAMAAAC/iHE6AAAAh1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9qkf8RAAAALHRSTlMA+JZwXHvjqgmghUmOIBsQ7tvVzLWwdW1mLALfBaF/X0TrzsjAuGRZT00wJa7s1G4AAAFfSURBVDjLfNHZkoIwFEXRE5LIDCIiiO086/n/7+uQ0EWLVay8ZNhPNxhpZSEK2WKax46HSSmdFFOedJ6YsqazxqQlO0tMy0NBEeb49oPefrYHPHrdTn2+xiWFnwFBHGhS2kqS2pyBzBcsYxOxs8kRMTEFd6ba0ZQJI+QbdmKcaK3QsIBJOTfLBCjYYEXrBEErREq+0d+vgDeZYUtLYEHrnJpdDaAh2QCouUB6prXAnY5IQjemLbducGEi6NwBNSMvj6stA6iSZKkQ2OL6uJD9ULIcwMHE1D4dX9M8HwDk2fB9tX/kt6Nf//tQTWNeyYiDSFZzGhp/1KySrxa4cXAD2pesNgpjmgONMfU7aUJmEXYXSX4kHF7EhT1x8UhcmkCkLz6M9MXLwAm1h7i0ikj3cnjSPSIPySjI4MpDqPmRBXt+xAQc4LzNwUB5OYEoc4gsvygvC4GhBAI8aKLEldEAVsRgQEgSPLQAAAAASUVORK5CYII=");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "8907a1f805360c489fc021f9950cb31f.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "28f02168c2fe00d670d2cb89af41eba4.jpg");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9fb061564908e78afee561620d5f4780.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "f33716d887575d4ef1ea777a6b069ae1.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "d25132db7930557c1cdc1ba8d744a01d.png");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAMAAAAYAM5SAAABhlBMVEUAAAD90QP+6j36uwz90AP6twj94yv7uQv+4jT+6j7/5CD9rQr+6j/5ugz/lAP7swv7yRr9xAP95Tj+5zX7whT9zQP95zv70yb7zR/92RX8vgP9wgL96j780QP+6T7/yAD/4yn/zgD/6j7/6jv/2wD+3TX+yyn+vB/90wb8wgP8wQPzcj/9twP6wRT93yT82Cz7zSD8yQP96Dv82zD93h/7xhj80gP81Q392Cv92hX6vxD9sgP+pgP7zSD96Tv1eTr6rhT/kwP93B796z7+6z/yb0H80gP9yAP/kgTzbkH70gT+6j780gT8wgPzb0H+6j//kwP+6z//nwPzbkHybkL96j/8wAL96T78wgL96z/70gT9wgLzb0H70gT96z/96T7/lAL90wL/kgL/6z/0cEL/7ED80wP/kQP81AP/4zD5wgD/sAD3bjv/wwD80gT9wQP5tAb/kwTzb0L/7mP+30/8xhz6wBn9sRb/pxT5uAz924D91mr8yzP8yCb+qRv+nw/6qwb+kwSmbc3OAAAAbnRSTlMA+fPw8Pn08/LoA/r5+Pj29fX09PT08/Pz8/Lb17ZFNSkmJR4O/fz8+vr5+Pj39vX19fT09PT08/Ly8vHx7+7u7uzp4eDe3dvY19HOyMi/urazsqmin5qYko2NgoF+fXRwaWdmXVxWUU1KLi0eHkfLRckAAAE0SURBVCjPndLXVsJAEIDhAEISkI4gVcDee++99957181Eut03d8ImOaJ4of/lfmcudmeZPxU9LP1FwryDD+eVqxEOXLPGPLJPDMUAntMfUBYkxFkPYA58l5IJQohWBwCtoRwwHmuIQrbNrxNbk4SoxI4q55FdvyAUURqwvmcAHNEs3MwLiWdBKKDkTKfjAF3nWfInHp9eVDKkXmMZaNqW5FagydRQ+RZLQvsyyolFJg2l7goxnoSeANKU6MuZ6iz/SAGwPJJFrKPUTGgtVgDQFyINi72U7DIZbIBJtCSaKFVrKHkbpSkt0qXYRwnvTHPrAXRjDHa0IpNdHmvDtbgWUbANPK/xsaah4EwHUhVnBs8BQ7sfrH3AxvH5Ixc7c16u363+j9XphbW9sztlo9frIeaffQK3Pnpn5c2xYwAAAABJRU5ErkJggg==");

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
      gamePlay.once('play', () => {
        gameStartPanel.destory();
        gamePlay.run();
      });
    });
    gameLoading.once('play', () => {
      gameLoading.destory();
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