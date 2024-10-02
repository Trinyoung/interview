## 什么是CDN？它的作用是什么，以及它的原理是什么？
**CDN**（Content Delivery Network，内容分发网络）是一种通过在全球范围内分布服务器，将内容缓存到离用户最近的节点上，从而加速网站内容加载速度的技术。CDN 可以帮助降低网络延迟，提高网站访问速度，提升用户体验。

### CDN 的主要功能和优势
1. **加速访问**：通过将内容缓存到离用户最近的服务器节点，减少了数据传输的距离和时间，显著提高了网站加载速度。
2. **减轻源服务器压力**：将请求分散到各个 CDN 节点，避免对源站造成过多的访问压力，降低服务器负载。
3. **抗攻击能力**：CDN 能够分散流量，提供更好的 DDoS 防护，提升网站的安全性和稳定性。
4. **高可用性**：当某个节点出现故障时，CDN 可以自动切换到其他节点，确保服务的持续性。

CDN 常用于加载静态资源（如图片、CSS、JavaScript 文件）、视频流、网页等内容，尤其适用于高流量或全球用户的网站。

### CDN的原理
用户使用 CDN 缓存资源的过程通常如下：

1. **首次请求**：
   - 用户在浏览器中请求访问一个网站，浏览器向 CDN 请求相应的资源。
   - 如果 CDN 的节点中没有缓存该资源，CDN 会将请求转发到源站服务器（即网站的原始服务器）。

2. **源站服务器响应**：
   - 源站服务器接收到请求后，将资源返回给 CDN 节点，CDN 节点会将该资源缓存下来。
   - 同时，CDN 将资源返回给用户的浏览器，用户获得所需的内容。

3. **后续请求**：
   - 当其他用户或同一用户再次请求相同资源时，CDN 检查节点缓存是否已有该资源。
   - 如果资源已被缓存，CDN 直接从最近的节点将资源返回给用户，无需再次请求源站服务器。

这种缓存机制大大缩短了用户请求的响应时间，并减轻了源站服务器的压力。CDN 通常会设定缓存时间，资源会在缓存到期后重新向源站请求更新，以确保用户获取最新内容。

## 什么是懒加载，什么是预加载，两者有何区别？使用的场景分别是什么？
**懒加载**和**预加载**是两种优化网页性能和用户体验的资源加载方式，它们的定义、使用场景和区别如下：

### **懒加载（Lazy Loading）**
**定义**：
懒加载是一种在用户需要时才加载资源的策略，通常用于加载图像、视频、脚本等资源。当用户滚动到页面的某个位置或触发特定事件时，才会加载这些资源。

**使用场景**：
- **长页面**：在长页面中，只有当用户滚动到图片或视频的位置时，才进行加载，避免一次性加载所有资源，减少页面初始加载时间。
- **单页应用**：在大型单页应用中，将不常用的组件或模块懒加载，避免初次加载时引入所有代码。

**优点**：
- 减少页面的首次加载时间，提高页面性能。
- 降低服务器压力和带宽消耗。
**懒加载实现原理**：
**懒加载（Lazy Loading）**的实现原理主要是通过延迟加载资源，直到用户真正需要时才进行加载，以下是其实现原理的详细说明：

### **1. 懒加载的核心原理**
懒加载的核心是**延迟加载**。当用户打开页面时，只有页面的关键部分会被加载，其他资源（如图片、视频、模块等）会在用户滚动到它们或触发特定事件时才加载。这一策略可以有效减少页面初次加载时间，提高页面性能。

### **2. 实现懒加载的常用技术**
- **Intersection Observer API**：
  - `Intersection Observer` 是浏览器提供的一个用于检测元素是否进入视口的 API，可以用来实现懒加载。
  - 通过监听元素是否出现在视口中，当元素进入视口时，触发回调函数进行资源加载。
  - 代码示例：
    ```javascript
    const lazyImages = document.querySelectorAll('.lazy');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => observer.observe(img));
    ```
  - 这里，当图片进入视口时，`src` 被设置为 `data-src` 的值，完成图片加载。

- **滚动事件监听**：
  - 通过监听 `scroll` 事件，判断页面的滚动位置，检测资源是否进入视口。
  - 一旦检测到资源进入视口，就将其加载。
  - 代码示例：
    ```javascript
    window.addEventListener('scroll', () => {
      const lazyImages = document.querySelectorAll('.lazy');
      lazyImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          img.src = img.dataset.src;
        }
      });
    });
    ```
  - 这种方式简单易用，但对于大量元素会频繁触发 `scroll` 事件，导致性能问题。

- **图片 `loading="lazy"` 属性**（HTML5）：
  - HTML5 提供了 `loading="lazy"` 属性，可以让浏览器自动实现懒加载。
  - 只需在 `<img>` 标签上加上 `loading="lazy"`，无需额外 JavaScript。
    ```html
    <img src="placeholder.jpg" data-src="actual-image.jpg" class="lazy" loading="lazy">
    ```
  
### **3. 使用场景**
- 图片懒加载：在长页面或瀑布流页面中，只有当图片进入视口时才加载。
- 组件懒加载：单页应用中，当某个组件被需要时才异步加载，减少初次加载的体积。
- 第三方库懒加载：在用户需要时才引入第三方库，减少不必要的资源加载。

### **优缺点**
- **优点**：减轻页面初次加载压力，减少不必要的网络请求，提高页面性能。
- **缺点**：可能会导致页面滚动到某个位置时出现加载延迟，影响用户体验。

通过懒加载，可以有效地优化页面性能，尤其是在图文丰富、模块众多的应用中显得尤为重要。

### **预加载（Preloading）**
**定义**：
预加载是一种提前加载资源的策略，在浏览器加载页面的同时或页面渲染前，先行加载用户可能会访问的资源。预加载确保这些资源在用户需要时已经准备好。

**使用场景**：
- **关键资源**：例如字体、样式表、脚本等，确保在用户需要时快速呈现。
- **预先加载页面**：对于多页面应用，当用户在首页时，可以预先加载下一页面的资源，提高跳转速度。

**优点**：
- 缩短用户等待时间，提升体验，尤其适用于访问量大的关键资源。

### **两者的区别**
- **加载时机**：
  - **懒加载**：只有在用户需要时才加载资源，节省不必要的资源消耗。
  - **预加载**：提前加载资源，确保在用户需要时资源已经准备好。
- **使用场景**：
  - **懒加载**更适合优化长页面或减少不必要资源的加载。
  - **预加载**更适合提前准备关键资源或加速页面跳转。

**总结**：懒加载侧重于节省资源，预加载侧重于提高响应速度。这两种技术可以根据实际情况结合使用，以优化网站性能和用户体验。



## 说明一下什么是回流和重绘？
当渲染树中部分或者全部元素的尺寸、结构或者属性发生变化时，浏览器会重新渲染部分或者全部文档的过程就称为回流。

### 下列操作会导致回流
● 页面的首次渲染
● 浏览器的窗口大小发生变化
● 元素的内容发生变化
● 元素的尺寸或者位置发生变化
● 元素的字体大小发生变化
● 激活CSS伪类
● 查询某些属性或者调用某些方法
● 添加或者删除可见的DOM元素

### 如何避免回流和重绘？
- 避免频繁的 DOM 操作：将多次 DOM 操作合并为一次，使用 DocumentFragment 或批量操作。
- 使用 CSS 类替代行内样式：一次性改变类名而不是多次修改样式。
- 缓存布局信息：避免在一个操作中多次访问 offsetWidth、offsetHeight 等布局信息。
- 使用 requestAnimationFrame：在动画效果中，将 DOM 操作放在 requestAnimationFrame 中执行，减少回流次数。
- 使用 visibility 代替 display：display: none 会触发回流，而 visibility: hidden 只触发重绘。
了解这些细节并在开发中避免不必要的回流和重绘，可以大大提高页面性能。

### 如何优化动画的性能？
对于如何优化动画，我们知道，一般情况下，动画需要频繁的操作DOM，就就会导致页面的性能问题，我们可以将动画的position属性设置为absolute或者fixed，将动画脱离文档流，这样他的回流就不会影响到页面了。

## 什么是documentFragment?
### **什么是 `DocumentFragment`？**
`DocumentFragment` 是一种用于存储一系列节点的轻量级容器对象，它属于 DOM API 中的一部分，具有与 DOM 元素类似的接口，但与普通 DOM 不同的是，它本身不是页面 DOM 树的一部分。

### **`DocumentFragment` 的特点**
- **不属于 DOM 树**：`DocumentFragment` 是存在于内存中的节点，不会直接出现在页面的 DOM 树中。操作它不会导致页面的重绘或回流。
- **性能优化**：由于它不在 DOM 树上，因此对它的操作不会触发浏览器的重绘和回流，能显著提高对大量 DOM 元素的操作性能。

### **使用 `DocumentFragment` 与直接操作 DOM 的区别**
1. **性能方面**：
   - **直接操作 DOM**：每次对 DOM 的修改都会导致页面的重绘或回流，操作次数多时会导致性能问题，尤其在处理大量元素时。
   - **使用 `DocumentFragment`**：所有的节点操作都是在内存中完成的，操作结束后可以一次性将 `DocumentFragment` 插入到 DOM 中，只会触发一次重绘或回流，大大提高性能。

2. **使用场景**：
   - 当需要一次性添加、移动、复制或删除多个 DOM 元素时，可以先将这些元素添加到 `DocumentFragment`，然后再把 `DocumentFragment` 插入到页面中。

### **示例代码**
```javascript
// 创建一个 DocumentFragment 对象
const fragment = document.createDocumentFragment();

// 往 fragment 中添加多个元素
for (let i = 0; i < 100; i++) {
  const newElement = document.createElement('div');
  newElement.textContent = `Item ${i}`;
  fragment.appendChild(newElement);
}

// 将 fragment 插入到目标 DOM 节点中
document.getElementById('container').appendChild(fragment);
```

在上面的示例中，虽然添加了 100 个元素，但对实际的 DOM 操作只有最后一次将 `fragment` 插入到 `#container` 时才发生。这样能极大地减少 DOM 操作，提升性能。

### **总结**
- **`DocumentFragment`** 是一种用于批量操作 DOM 的轻量级对象。
- 与直接操作 DOM 相比，`DocumentFragment` 在内存中操作，可以避免频繁的重绘和回流，提供更好的性能优化。

在需要批量插入、删除、或修改 DOM 时，使用 `DocumentFragment` 是一种最佳实践。

## 说一下什么是节流和防抖，两者该如何实现？

### 防抖
函数防抖就是防止多次提交按钮，只执行最后一次提交的一次；

### 节流
```javascript
// 时间戳版
function throttle(fn, delay) {
  var preTime = Date.now();

  return function() {
    var context = this,
      args = [...arguments],
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}

// 定时器版
function throttle (fun, wait){
  let timeout = null
  return function(){
    let context = this
    let args = [...arguments]
    if(!timeout){
      timeout = setTimeout(() => {
        fun.apply(context, args)
        timeout = null 
      }, wait)
    }
  }
}
```