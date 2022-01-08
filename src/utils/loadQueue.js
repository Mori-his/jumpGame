


export function loadFiles(files, callback = () => {}, progress = () => {}) {
    const queue = new createjs.LoadQueue(true)
    queue.installPlugin(createjs.Sound);
    queue.addEventListener('complete', (event) => {
        callback(event, queue);
    });
    queue.addEventListener('progress', function(event) {
        progress(event.loaded * 100);
    })
    if (Array.isArray(files)) {
        files.forEach(file => {
            queue.loadFile(file, true)
        })
    } else {
        queue.loadFile(files, true);
    }
    return queue;
}
