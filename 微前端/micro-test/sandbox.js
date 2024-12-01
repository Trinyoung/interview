
const obj = {
    a: 'lqy',
    age:32
};

const func = new Function('window', `with(window) {
    console.log(obj.a)
    obj.age = '24'
}`)
const fakeObj = {
    a: 'lq',
    age: '23'
}
console.log(fakeObj, 1)
func(fakeObj)
console.log(fakeObj, 2)