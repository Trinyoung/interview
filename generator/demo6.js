function* numbers () {
    yield 1
    yield 2
    return 3
    yield 4
  }
  
  // 扩展运算符
  [...numbers()] // [1, 2]
  
  // Array.from 方法
  Array.from(numbers()) // [1, 2]
  
  // 解构赋值
  let [x, y] = numbers();
  x // 1
  y // 2
  
  // for...of 循环
  for (let n of numbers()) {
    console.log(n)
  }