console.log('main starting');
const a = require('./a.js');
const b = require('./b.js');
console.log('in main, a.done = %j, b.done = %j', a.done, b.done);

// main starting;
// '在 b.js 之中，a.done = %j', a.false;
// 'b.js 执行完毕;
// '在 a.js 之中，b.done = %j', b.done'