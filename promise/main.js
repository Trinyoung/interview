// const { reject } = require("core-js/fn/promise");

const PENDING = 'pending';
const FULFILLED = 'fullfilled';
const REJECTED = 'rejected';
class MyPromise {
    status = PENDING;
    fullFillCallbacks = [];
    rejectedCallbacks = [];
    value = null;
    reason = null;
    constructor(executor) {
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (err) {
            this.reject(err);
        }

    }

    resolve(value) {
        console.log(this.status, 'status')
        if (this.status === PENDING) {
            this.status = FULFILLED;
            // return value;
            this.value = value;
            // console.log
            while (this.fullFillCallbacks.length) {
                this.fullFillCallbacks.shift()(value);
            }
        }

    }

    reject(reason) {
        if (this.status === REJECTED) {
            this.status = REJECTED;
            this.reason = reason;
            while (this.rejectedCallbacks.length) {
                this.rejectedCallbacks.shift()(reason);
            }
        }
    }

    // then 方法的链式调用就需要返回一个新的Promise对象，then方法里面的return一个返回值作为下一个then方法的参数，如果是返回一个 Promise 对象，那么就得判断Promise对象，那么就需要判断它的状态，并执行它。
    then(fullfillCallback, rejectCallback) {
        fullfillCallback = typeof fullfillCallback == 'function' ? fullfillCallback : (value) => value;
        rejectCallback = typeof rejectCallback == 'function' ? fullfillCallback : (reason) => { throw new Error(reason) }
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                // 获取成功回调函数的执行结果
                queueMicrotask(() => {
                    try {
                        const x = fullfillCallback(this.value);
                        resolvePromise(x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                });

            } else if (this.status === REJECTED) {
                // ==== 新增 ====
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    try {
                        // 调用失败回调，并且把原因返回
                        const x = rejectCallback(this.reason);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            } else {
                // 这是同步函数，所以将成功函数和失败函数回调存储起来。
                // this.fullFillCallbacks.push(fullfillCallback);
                // this.rejectedCallbacks.push(rejectCallback);
                this.fullFillCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = fullfillCallback(this.value);
                            resolvePromise(x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    })
                });

                this.rejectedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = rejectCallback (this.value);
                            resolvePromise(x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    })
                })
            }
        });
        return promise2;
    }

    static resolve (parameter) { // 返回一个状态被改为 fullfilled 的 MyPromise 对象。
        if (parameter instanceof MyPromise) {
            return parameter;
        }

        return new MyPromise( (resolve) => {
            resolve (parameter);
        });
    }

    static reject (reason) { // 返回一个状态被改为 rejected 的 MyPromise 对象。
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }
    // static re
}

function resolvePromise(x, resolve, reject) {
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
// const p = new MyPromise(function (resolve, reject) {
//     console.log(1);
//     // resolve(2)
//     setTimeout(function () {
//         resolve(2)
//     }, 1000)
// });

// p.then(function (res) {
//     console.log(res);
// }).then(function (res) {
//     console.log(3)
// });
// p.then()
// p.then(function (res) {
//     console.log(4)
// });

MyPromise.resolve().then(() => {
    console.log(0);
    return MyPromise.resolve(4);
}).then((res) => {
    console.log(res)
})

MyPromise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
});
console.log(-1);
