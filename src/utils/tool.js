
export function scaleTarget(targetRect, sourceRect) {
    return {
        scaleX: sourceRect.width / targetRect.width,
        scaleY: sourceRect.height / targetRect.height,
    }
}

