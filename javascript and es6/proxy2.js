const obj2 = {
    name: 'lqy'
};
const proxy = new Proxy(obj2, {
    get(target, prop) {
        console.log(target === obj2, 'is true')
        return target[prop]
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    }
});
proxy.name = 'lqy2';
console.log(proxy.name, 'name')
console.log(proxy, obj2)