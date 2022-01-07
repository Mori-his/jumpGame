import { loadFiles } from "../utils/loadQueue";

export default class GameStartPanel {
    sources = [
        {
            id: 'mainPng',
            src: require('/src/assets/images/main.png').default,
            type: createjs.Types.IMAGE
        },
    ]
    constructor(stage) {
        this.stage = stage;
        this.loadSource();
    }

    sourceComplete(event, loader) {
        this.loader = loader;
        console.log(loader.getResult('mainPng'))
        const background = new createjs.Bitmap(loader.getResult('mainPng'));
        background.scaleX = 0.5;
        background.scaleY = 0.5;
        background.x = 0;
        background.y = 0;
        this.stage.addChild(background);
        this.stage.update();
    }

    loadSource() {
        loadFiles(this.sources, this.sourceComplete.bind(this));
    }

}




