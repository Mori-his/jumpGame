

export default class WeightsAlgorithm {

    matrix = []

    colors = []

    stepWeight = 5;
    maxWeight = 100;

    constructor(stage, {row, column, loader}) {
        this.stage = stage;
        this.row = row;
        this.column = column;
        this.initColors();
        this.initMatrix();
    }

    initMatrix() {
        this.matrix = [];
        const { row, column, matrix } = this;
        for(let r = 0; r < row; r++) {
            let col = [];
            for(let c = 0; c < column; c++) {
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
        this.colors = [
            { weight: this.maxWeight, rise: false, bitmap: jumpBlue },
            { weight: this.maxWeight, rise: false, bitmap: jumpRed },
            { weight: this.maxWeight, rise: false, bitmap: jumpGreen },
            { weight: this.maxWeight, rise: false, bitmap: jumpYellow },
        ]
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
        this.matrix.forEach((row, index) => {
            row.forEach(column => {
                const random = this.random();
                let currColor = this.colors[random];
                if (currColor) {
                    const currWeight = currColor.weight / this.maxWeight;
                    const index = Math.round(random * currWeight);
                    currColor = this.colors[index];
                    column.bitmap = currColor.bitmap;
                    column.index = index;
                    this.handleWeight(currColor);
                }
            });
            row.forEach(column => {

            })
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
    random() {
        return Math.round(Math.random() * this.colors.length + 2);
    }
}
