class Dep{
    constructor() {
        this.subs = []
    }
    // 添加订阅者
    addSub(watcher){
        this.subs.push(watcher);
 
    }
    // 通知变化
    notify(){
        // 观察者中有个update方法 来更新视图
        this.subs.forEach(w=>w.update());
    }
}
