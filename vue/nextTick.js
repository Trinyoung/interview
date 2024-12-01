let callbacks = [];
let pending = false;

// 支持多种异步方式
const timerFunc = () => {
    if (typeof Promise !== 'undefined') {
        return Promise.resolve().then(flushCallbacks);
    }
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(flushCallbacks);
        const textNode = document.createTextNode('1');
        observer.observe(textNode, { characterData: true });
        return () => textNode.data = '2';
    }
    if (typeof setImmediate !== 'undefined') {
        return () => setImmediate(flushCallbacks);
    }
    return () => setTimeout(flushCallbacks, 0);
};

function nextTick(cb) {
    callbacks.push(cb);
    if (!pending) {
        pending = true;
        timerFunc();
    }
}

// 更新队列处理
function flushSchedulerQueue() {
    flushing = true;
    
    // 1. 排序队列
    queue.sort((a, b) => a.id - b.id);
    
    // 2. 遍历队列
    for (let i = 0; i < queue.length; i++) {
        const watcher = queue[i];
        
        // 3. 执行 watcher 的更新
        watcher.run();
        
        // 4. 开发环境下的循环更新检测
        if (process.env.NODE_ENV !== 'production' && has[id] != null) {
            circular[id] = (circular[id] || 0) + 1;
            if (circular[id] > MAX_UPDATE_COUNT) {
                warn('无限更新循环检测...');
                break;
            }
        }
    }
    
    // 重置状态
    resetSchedulerState();
}