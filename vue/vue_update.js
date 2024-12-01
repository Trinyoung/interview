// 简化版的响应式系统
class Dep {
    notify() {
        // Vue 实际上不会直接更新，而是将 watcher 加入队列
        queueWatcher(this.subs);
    }
}

// 更新队列处理
const queue = [];
let waiting = false;
let flushing = false;

function queueWatcher(watcher) {
    if (!queue.includes(watcher)) {
        if (!flushing) {
            queue.push(watcher);
        } else {
            // 如果正在刷新，需要按照 id 顺序插入
            let i = queue.length - 1;
            while (i >= 0 && queue[i].id > watcher.id) {
                i--;
            }
            queue.splice(i + 1, 0, watcher);
        }
    }

    if (!waiting) {
        waiting = true;
        nextTick(flushSchedulerQueue);
    }
}

// nextTick 实现机制
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