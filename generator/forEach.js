
Array.prototype.forEach = (callback) => {
    const len = this.length;
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function')
    }
    let k = 0;
    while (k < len) {
        if (k in this) {
            callback(this[k], k, this)
        }
        k++;
    }
}

// 问如何跳出forEach 的循环?
try {
    const arr = [1, 2, 3];
    arr.forEach((item, index) => {
        if (item === 2) {
            throw new Error("跳出循环");
        }
        console.log(item);
    });
} catch (e) {
    console.log(e.message);
}

// 所以,我们的结果是什么事情,
// 所以,我们的击鼓
//  
fetch.abort