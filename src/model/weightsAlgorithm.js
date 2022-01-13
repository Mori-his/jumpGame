

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
        let prevRow = [];
        let circuitBreak = 0;
        this.matrix.forEach((row, index) => {
            let colCount = 0;
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
                    ++colCount
                    circuitBreak = 0;
                }
            });
            if (colCount === 0) {
                circuitBreak++;
            }
            if (circuitBreak > 1) {
                // 如果短路次数超过1则随机补上一个
                const random = this.random(this.colors.length - 1);
                let currColor = this.colors[random];
                row[random].bitmap = currColor;
            }
            if (colCount > 1) {
                // 如果本行的列数超过1 则出现重复叠加次数减少
                prevRow.forEach((col, index) => {
                    if (Boolean(col.bitmap) && Boolean(row[index].bitmap)) {
                        row[index].bitmap = null
                    }
                })
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
