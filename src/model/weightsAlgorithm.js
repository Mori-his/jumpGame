

export default class WeightsAlgorithm {

    matrix = []

    colors = []

    constructor(stage, {row, column, loader}) {
        this.stage = stage;
        this.row = row;
        this.column = column;
        this.loader = loader;
        this.initColors();
        this.initMatrix();
    }

    initMatrix() {
        const { row, column, matrix } = this;
        for(let r = 0; r < row; r++) {
            let col = [];
            for(let c = 0; c < column; c++) {
                col.push({
                    x: 0,
                    y: 0,
                    bitmap: null
                });
            }
            matrix.push(col);
        }
    }


    initColors() {
        const { loader } = this;
        const jumpRed = new createjs.Bitmap(loader.getResult('jump_red'));
        const jumpBlue = new createjs.Bitmap(loader.getResult('jump_blue'));
        const jumpGreen = new createjs.Bitmap(loader.getResult('jump_green'));
        const jumpYellow = new createjs.Bitmap(loader.getResult('jump_yellow'));
        this.colors = [
            { widget: 100, rise: false, bitmap: jumpBlue },
            { widget: 100, rise: false, bitmap: jumpRed },
            { widget: 100, rise: false, bitmap: jumpGreen },
            { widget: 100, rise: false, bitmap: jumpYellow },
        ]
    }


    random() {
        Math.random()
    }


}
