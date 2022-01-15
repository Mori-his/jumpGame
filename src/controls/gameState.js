import { EventEmitter } from 'events';

class GameState extends EventEmitter {
    playing = false;
    score = 0
    gameOver(score) {
        this.playing = false;
        this.score = score
        this.emit('gameOver');

    }

    restart() {

      this.emit('restart');
    }
}




export default new GameState();
