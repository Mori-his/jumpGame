


function loadFiles(files, callback) {
    const isMp3 = /\.mp3$/;
    const queue = new createjs.LoadQueue()
    queue.installPlugin(createjs.Sound);
    queue.on("complete", callback, this);
    if (Array.isArray(files)) {
        files.forEach(item => {
            if (isMp3.test(item.src)) {
                queue.loadFile(item)
            } else {
                queue.loadManifest(item)
            }
        })

    }
}
