// let state;
// let queue = [];
// function useState(initialVal) {
//     state = state || initialVal;
//     function setState(val) {
//         state = val;
//         render();
//     }
//     return [state, setState]
// }

let state = [];
let setters = [];
let firstRun = true;
let cursor = 0;

function createSetter(cursor) {
  return function setterFunction(newVal) {
    state[cursor] = newVal;
  };
}

// 这是我们的 useState 函数
export function useState(initVal) {
  if (firstRun) {
    state.push(initVal);
    setters.push(createSetter(cursor));
    firstRun = false;
  }

  const setter = setters[cursor];
  const value = state[cursor];

  cursor++;
  return [value, setter];
}

// 这个函数用来重置我们的游标等状态
export function resetCursor() {
  cursor = 0;
  firstRun = true;
}