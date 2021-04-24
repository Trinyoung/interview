const fs = require('fs');

const readFileThunk = function (url) { // thunk函数；
    return function (callback) {
        return fs.readFile(url, callback)
    }
}
function* readFile() {
    const x = yield readFileThunk('./thunk.txt');
    console.log(x);
    const y = yield readFileThunk('./thunk.txt');
    console.log();
    console.log(y);
}

// 执行器函数；
// const rf = readFile();
// rf.next().value(function (err, data) {
//     // console.log(JSON.stringify(data))
//     rf.next(data).value(function (err, data) {
//         rf.next(data)
//     })
// });

function run(fn) {
    var gen = fn();
    function next(err, data) {
        const result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
run(readFile);
console.log(2, '------------')