const promise = new Promise(function (resolve, reject) {
    console.log(0)
    resolve(1);
})

promise.then(function () {
    console.log(2)
    return 3;
}).then(function (value) {
    console.log(value)
});

promise.then(function () {
    console.log(4)
})

console.log(5);
// 5, 0 ,1, 2, 3, 4