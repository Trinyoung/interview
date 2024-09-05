Promise.resolve()
  .then(function() {
    console.log("promise0");
  })
  .then(function() {
    console.log("promise5");
  });
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function() {
    console.log("promise2");
  });
  setTimeout(() => {
    console.log("timer6");
  }, 1)
  Promise.resolve().then(function() {
    console.log("promise4");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function() {
    console.log("promise3");
  });
}, 10);
Promise.resolve().then(function() {
  console.log("promise1");
});
console.log("start");

// 输出结果：start promise0, promise1, promise5, timer1, promise2, promise4, timer2, promise3