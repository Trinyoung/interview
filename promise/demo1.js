const MyPromise = require('./index.js');
const promise = new MyPromise(function (resolve, reject)  {
    console.log(0)
    setTimeout(function () {
        resolve('success');
    }, 1000)
    // resolve('success');
    // reject('err')
});

promise.then(value => {
    // console.log('============>')
    console.log('1');
}).then(value => {
    console.log(53)
})

promise.then(value => {
    // console.log('============>')
    console.log('3', value);
})
console.log('我们在这里呀！')
// Promise.resolve().then(() => {
//     console.log(0);
//     return Promise.resolve(4);
// }).then((res) => {
//     console.log(res)
// })

// Promise.resolve().then(() => {
//     console.log(1);
// }).then(() => {
//     console.log(2);
// }).then(() => {
//     console.log(3);
// }).then(() => {
//     console.log(5);
// }).then(() =>{
//     console.log(6);
// })

