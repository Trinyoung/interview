Promise.resolve().then(() => {
    console.log(0);
    // return Promise.resolve(4);
    return 4;
}).then((res) => {
    console.log(typeof res)
    console.log(res)
}).then((res) => {
    console.log('first', '6')
})

Promise.resolve().then(() => {
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