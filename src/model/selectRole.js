import { EventEmitter } from 'events';

export default class SelectRole extends EventEmitter {
    selectRole = null;
    constructor(stage, { loader }) {
        super();
        this.stage = stage;
        this.loader = loader;
        this.container = new createjs.Container();
        this.initSpriteSheet();
        this.initRole();
    }

    initRole() {
        const maskBg = new createjs.Shape();
        maskBg.graphics.beginFill('rgba(0, 0, 0, 0.7)').drawRect(
            0,
            0,
            this.stage.canvas.width,
            this.stage.canvas.height,
        );
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

        this.container.addChild(
            maskBg,
            tips,
            this.confirm,
            this.iceRoleDefault,
            this.snowRoleDefault,
        );
        
        
        this.handleSelectIce = this.handleSelectIce.bind(this);
        this.iceRoleDefault.addEventListener('click', this.handleSelectIce);
        this.iceRoleSelected.addEventListener('click', this.handleSelectIce)
        this.handleSelectSnow = this.handleSelectSnow.bind(this);
        this.snowRoleDefault.addEventListener('click', this.handleSelectSnow)
        this.snowRoleSelected.addEventListener('click', this.handleSelectSnow)

        this.stage.addChild(this.container)
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
        }
        // 如果胖敦敦被选择
        if (this.selectRole === 0) {
            this.container.removeChild(
                this.snowRoleDefault,
                this.iceRoleSelected
            );
            this.container.addChild(
                this.snowRoleSelected,
                this.iceRoleDefault
            );
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
        }
        // 如果雪绒绒被选择
        if (this.selectRole === 1) {
            this.container.removeChild(
                this.iceRoleDefault,
                this.snowRoleSelected
            );
            this.container.addChild(
                this.iceRoleSelected,
                this.snowRoleDefault
            );
            this.selectRole = 0;
        }
    }

    getSprite(type) {
        const sprite = new createjs.Sprite(this.spriteSheet, type);
        sprite.scale = 0.5;
        return sprite;
    }

    initSpriteSheet() {
        const image = this.loader.getResult('selectRole');
        this.spriteSheet = new createjs.SpriteSheet({
            images: [ image ],
            frames: [
                // [0, 0, 120, 126],
                // [120, 0, 120, 126],
                // [242, 0, 119, 130],
                // [361, 0, 122, 132],
                // [0, 132, 168, 62],
                // [168, 153, 209, 21],
                [0, 0, 240, 252],
                [240, 0, 244, 256],
                [484, 0, 238, 260],
                [722, 0, 244, 264],
                [0, 275, 335, 123],
                [335, 317, 418, 40]
            ],
            animations: {
                iceRoleDefault: [0],
                iceRoleSelected: [1],
                snowRoleDefault: [2],
                snowRoleSelected: [3],
                confirm: [4],
                tips: [5],
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




