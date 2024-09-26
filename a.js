const prop = {
    name: 'lqy'
}

let value = prop.name; // 使用闭包来存储值

Object.defineProperty(prop, 'name', {
    get: function() {
        console.log('Getting value:', value);
        return value;
    },
    set: function(newVal) {
        console.log('Setting value:', newVal);
        value = newVal; // 更新闭包中的值
    }
});

// console.log(prop.name, value, 'prop is bbb1');
prop.name = 'Trinyoung';
// console.log(prop.name, value, 'prop is bbb');