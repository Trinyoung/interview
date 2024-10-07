const {stat, readFileSync} = require('fs');
const file = readFileSync('./interview.md');
console.log(file, 'file')