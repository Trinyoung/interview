// MyPromise.js

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
let num = 0;
// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    // 储存状态的变量，初始值是 pending
    this.status = PENDING;

    // resolve和reject为什么要用箭头函数？
    // 如果直接调用的话，普通函数this指向的是window或者undefined
    // 用箭头函数就可以让this指向当前实例对象
    // 成功之后的值
    this.value = null;
    // 失败之后的原因
    this.reason = null;
    this.onFullfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error);
    }


  }

  // 更改成功后的状态
  resolve(value) {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // num ++
      // this.onFullfilledCallback && this.onFullfilledCallback(value)
      while (this.onFullfilledCallbacks.length) {
        this.onFullfilledCallbacks.shift()(value);
      }

    }
  }

  // 更改失败后的状态
  reject(reason) {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      this.onRejectedCallbacks.shift()(reason);
    }
  }

  then(onFulfilled, onRejected) {
    // 判断状态
    // console.log(num ++)
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 调用成功回调，并且把值返回
        queueMicrotask(() => {
          // 获取成功回调函数的执行结果
          try {
            const x = onFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err)
          }

        })
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        this.onFullfilledCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的执行结果
              const x = onFulfilled(this.value);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        });
        this.onRejectedCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 调用失败回调，并且把原因返回
              const x = onRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        });
      }
    })

    return promise2;
  }

  static resolve(parameter) {
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter);
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}
module.exports = MyPromise
