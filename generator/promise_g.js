const fs = require('fs');
const readFile = function (fileName) {
    return new Promise(function (resovle, reject) {
        fs.readFile(fileName, function (err, data) {
            if (err) return reject(err);
            resovle(data);
        });
    });
}

const gen = function* () {
    const f1 = yield readFile('./thunk.txt');
    const f2 = yield readFile('../demo.txt');
    console.log(f1.toString(), 'f1');
    console.log(f2.toString(), 'f2');
}
// const g = gen();
// g.next().value.then(function (data) {
//     // console.log(data, '-------');
//     g.next(data).value.then(function (data1) {
//         // console.log(data1)
//         g.next(data1)
//     });
// });

function run(fn) {
    const g = fn();

    function next(err, data) {
        const p = g.next(data);
        if (p.done) return;
        // console.log(data, 'data1---');
        // console.log();
        p.value.then(function (data1) {
            // console.log(data1.toString())
            next(null, data1);
        });
    }
    next();
}
run (gen);