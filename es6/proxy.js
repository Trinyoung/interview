const target = {};
const handler = {
    get: function(target, propKey, receiver) {
        return "Hello!";
    },
    set: function(target, propKey, value, receiver) {
        target[propKey] = value;
        return true;
    }
};
const obj = new Proxy(target, handler);