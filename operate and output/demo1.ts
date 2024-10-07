// Object.create 的手动实现
// function create (obj) {
//     function F() {};
//     F.prototype = obj;
//     return new F();
// }

// 1.如果后端传给前端一个很大的数，前端会怎么样，该怎么处理？
function bigIntToString(num: number | bigint) {
    return BigInt(num).toLocaleString()
}

let a = '123456789023456786543234567543232134545654345';
let b = BigInt(a);
console.log(b)
123456789023456786543234567543232134545654345;
123456789023456785347463684883473855718359040n