import { EventEmitter } from "events";

export default class GamePlay extends EventEmitter {
    source = [
        {
            id: ''
        }
    ];
    constructor() {
        super();
    }
}
