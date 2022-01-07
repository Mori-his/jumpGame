


export function loadFiles(files, callback = () => {}) {
    const isMp3 = /\.mp3$/;
    const queue = new createjs.LoadQueue(true)
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", (event) => {
        callback(event, queue);
    });
    if (Array.isArray(files)) {
        files.forEach(file => {
            queue.loadFile(file, true)
        })
    }
}
