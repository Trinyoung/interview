// 使用 Object.defineProperty
let obj = { a: 1 };
Object.defineProperty(obj, 'a', {
  get() {
    console.log('Getting a');
    return this._a;
  },
  set(newVal) {
    console.log('Setting a');
    this._a = newVal;
  }
});
Object.defineProperty(obj, 'name', {
    get() {
        console.log('Getting name');
        return this.name;
      },
      set(newVal) {
        console.log('Setting name');
        this.name = newVal;
      }
})
// obj.a = 2;
obj.name = 'lqy'
console.log(obj.name, 'dddd')
// 使用 Proxy
let obj2 = { a: 1 };
let proxy = new Proxy(obj2, {
  get(target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  },
  set(target, property, value) {
    console.log(`Setting ${property}`);
    target[property] = value;
    return true;
  }
});
proxy.name = 'lqy';
console.log(obj2 === proxy, obj2.name, proxy.name, 'obj2 ------');
delete proxy.name
