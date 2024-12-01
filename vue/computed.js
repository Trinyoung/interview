class ComputedWatcher {
    constructor(vm, getter) {
        this.vm = vm;
        this.getter = getter;    // getter函数
        this.value = undefined;  // 缓存的值
        this.dirty = true;       // 标记是否需要重新计算
        this.dep = new Dep();    // 用于收集依赖这个计算属性的Watcher
        this.deps = [];          // 存储这个计算属性依赖的数据的Dep
        
    }

    // 收集依赖
    depend() {
        if (Dep.target) {
            this.dep.addSub(Dep.target);
        }
    }

    // 计算值
    evaluate() {
        // 设置当前 Watcher 为 Dep.target，用于收集依赖
        Dep.target = this;
        let value;
        try {
            // 执行 getter，这会触发依赖属性的 get，从而收集依赖
            value = this.getter.call(this.vm);
        } finally {
            Dep.target = null;
        }
        this.dirty = false;
        return value;
    }

    // 更新
    update() {
        // 仅标记为脏值，不立即计算
        this.dirty = true;
        // 通知依赖这个计算属性的Watcher更新
        this.dep.notify();
    }

    // 获取值
    get() {
        // 收集依赖这个计算属性的Watcher
        if (Dep.target) {
            this.depend();
        }
        // 如果是脏值，重新计算
        if (this.dirty) {
            this.value = this.evaluate();
        }
        return this.value;
    }
}

// 在Vue实例中初始化computed
function initComputed(vm, computed) {
    Object.keys(computed).forEach(key => {
        // 获取getter函数
        const getter = typeof computed[key] === 'function' 
            ? computed[key] 
            : computed[key].get;

        // 创建计算属性watcher
        const watcher = new ComputedWatcher(vm, getter);

        // 代理到vm实例上
        Object.defineProperty(vm, key, {
            get: function() {
                return watcher.get();
            },
            set: function() {
                console.warn('计算属性不能被赋值');
            }
        });
    });
}