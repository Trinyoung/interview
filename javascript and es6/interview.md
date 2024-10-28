## 说一下javascript 的 eval？
`eval()` 是 JavaScript 中的一个内置函数，它可以执行以字符串形式传入的 JavaScript 代码。虽然 `eval()` 是一个强大的功能，但它也常常被认为是危险的，因为它可能导致安全问题和性能下降。让我们详细探讨一下 `eval()`：

1. 基本用法：

```javascript
eval('console.log("Hello, World!");'); // 输出: Hello, World!

let x = 10;
eval('x = 20;');
console.log(x); // 输出: 20
```

2. 特性：

   - 可以执行任意 JavaScript 代码。
   - 在当前作用域中执行代码。
   - 可以访问和修改当前作用域中的变量。

3. 安全风险：

   - 执行不受信任的代码可能导致安全漏洞。
   - 可能被用于注入恶意代码。

4. 性能问题：

   - JavaScript 引擎无法优化 `eval()` 中的代码。
   - 使用 `eval()` 可能会显著降低代码执行速度。

5. 作用域问题：

   - 在严格模式下，`eval()` 有自己的作用域。
   - 在非严格模式下，`eval()` 可以在当前作用域中创建变量。

6. 替代方案：

   - 使用 `Function` 构造函数（仍有安全风险，但作用域隔离）。
   - JSON.parse() 用于解析 JSON 字符串。
   - 使用更安全的模板引擎或表达式解析器。

7. 在严格模式下的行为：

```javascript
'use strict';
eval('var x = 10;');
console.log(x); // 抛出 ReferenceError，x 未定义
```

8. 间接调用 `eval()`：

```javascript
const indirectEval = eval;
indirectEval('var y = 20;');
console.log(y); // 抛出 ReferenceError，即使在非严格模式下
```

9. 使用 `eval()` 的一些场景（尽管不推荐）：

   - 动态生成代码（如复杂的数学表达式求值）。
   - 在某些特定的开发工具或调试场景中。

10. 安全使用 `eval()` 的建议：

    - 永远不要将用户输入直接传递给 `eval()`。
    - 如果必须使用，确保对输入进行严格的验证和清理。
    - 考虑使用更安全的替代方案。

11. `eval()` 在现代 JavaScript 中的地位：

    - 被认为是一种反模式。
    - 大多数情况下应该避免使用。
    - 在某些框架和库中仍然被使用，但通常有严格的安全措施。

总结：
虽然 `eval()` 是一个强大的功能，但由于其安全风险和性能问题，在现代 JavaScript 开发中通常被认为是应该避免使用的。大多数情况下，都有更好、更安全的替代方案。如果确实需要使用 `eval()`，应该非常谨慎，确保代码的安全性，并考虑其对性能的影响。

## javascript 有多少种数据类型，分别为什么？
有8种数据类型，分别为 Number， String， undefined, null, Object, BigInt， Symbol, Boolean；
这其中Symbol 数据类型用于表示数据的唯一性；
BigInt 用于表示大整数，因为在javascript 中，当数值大于 2 ** 53 或者小于 -2 ** 53时，数据将会失去精度。在面临一些大型的数据统计时会出现数据偏差，而使用了它，就会精确计算；
大数字计算时，可以使用BigInt数字类型；

## 如果后端传给前端一个很大的数，前端会怎么样，该怎么处理？
要求后端将数字处理成字符串，如果是整数的字符串串，可以通过BigInt来处理它的计算。通过对bigInt数字类型toString() 就可以展示原来的数据格式。
如果是一个浮点数，可以使用第三方库 decimal.js 来处理。如果不想要引入第三方的资源那么还是要求转换成字符串，通过 “.” 进行分割字符串。然后分开计算。浮点数的保证精度是15～17位，通常到这里的时候，就不要求数字的精确度了。但是如果说，我想知道PI的值 20位显示。那么还可以通过记录小数点后的长度，将原有的数字转换成一个整数，使用bigInt来计算。最后再移动小数点的位置即可。

## 说一下，window.onXX 事件处理和window.addEventListener('xxx')的事件处理有何区别？
在 JavaScript 中，`window.onXX` 和 `window.addEventListener('xxx', ...)` 都可以用于事件处理，但它们在行为和适用性上有一些显著的区别：

### 1. 事件绑定的数量

- **`window.onXX`**: 只能绑定一个事件处理函数，因为 `onXX` 是一个属性，当赋值新的事件处理函数时，旧的会被覆盖。
  ```javascript
  window.onload = function() {
      console.log('First handler');
  };
  window.onload = function() {
      console.log('Second handler');
  };
  // Only 'Second handler' will be logged
  ```

- **`window.addEventListener('xxx', ...)`**: 可以绑定多个事件处理函数，它们会按绑定顺序依次执行。不会互相覆盖。
  ```javascript
  window.addEventListener('load', function() {
      console.log('First handler');
  });
  window.addEventListener('load', function() {
      console.log('Second handler');
  });
  // Both 'First handler' and 'Second handler' will be logged
  ```

### 2. 事件移除

- **`window.onXX`**: 不能单独移除某个特定的事件处理函数，因为它仅支持覆盖或取消绑定整个事件处理函数。
  ```javascript
  window.onresize = null;  // Clears the resize event handler completely
  ```

- **`window.addEventListener('xxx', ...)`**: 可以通过 `removeEventListener` 方法移除特定的事件处理函数，前提是你传递给 `removeEventListener` 的函数引用和绑定时是同一个。
  ```javascript
  function onResize() {
      console.log('Window resized');
  }
  window.addEventListener('resize', onResize);
  window.removeEventListener('resize', onResize);  // Only this specific function is removed
  ```

### 3. 事件捕获和冒泡

- **`window.onXX`**: 只能在事件冒泡阶段触发，无法控制事件处理阶段（捕获或冒泡）。
  ```javascript
  window.onclick = function() {
      console.log('Clicked in the bubbling phase');
  };
  ```

- **`window.addEventListener('xxx', ..., useCapture)`**: 支持事件捕获和冒泡，第三个参数 `useCapture` 可以指定事件处理的阶段。设为 `true` 则在捕获阶段触发，默认为 `false` 时在冒泡阶段触发。
  ```javascript
  window.addEventListener('click', function() {
      console.log('Clicked in the capturing phase');
  }, true);
  ```

### 4. 兼容性

- **`window.onXX`**: 传统方法，兼容性好，适用于大部分现代和旧版浏览器。
- **`window.addEventListener('xxx')`**: `addEventListener` 是标准的事件绑定方法，但在早期版本的 Internet Explorer（IE 8 及以下）中不支持。对于旧浏览器的兼容性考虑，早期会使用 `attachEvent`（IE 独有的绑定方式）或用第三方库来处理。

### 5. 用途和适用场景

- **`window.onXX`**: 适用于简单场景，只需绑定一个事件处理器的情况，比如页面加载完成后的初始化。
- **`window.addEventListener('xxx')`**: 更灵活，适用于需要绑定多个事件处理器、使用事件捕获机制或跨浏览器兼容的复杂场景。

### 总结

- **单一绑定**：`onXX` 只能绑定一个处理函数，`addEventListener` 可以绑定多个。
- **事件阶段控制**：`onXX` 只能在冒泡阶段触发，`addEventListener` 可以选择捕获或冒泡阶段。
- **移除事件**：`addEventListener` 支持 `removeEventListener` 移除特定处理器，`onXX` 则只能通过覆盖或取消整个处理器。
- **兼容性**：`onXX` 兼容性较好，`addEventListener` 在较旧浏览器上可能不支持。