


export function loadFiles(files, callback = () => {}, progress = () => {}) {
    const queue = new createjs.LoadQueue(true)
    queue.installPlugin(createjs.Sound);
    queue.addEventListener('complete', (event) => {
        callback(event, queue);
    });
    let loadedCount = 1;
    queue.addEventListener('progress', function() {
        // TODO
        // 进度条计算
        progress(loadedCount * 10);
        console.log(loadedCount, files.length)
        ++loadedCount;
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
