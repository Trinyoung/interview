# React Fiber 探究

### **Fiber 是什么？**

Fiber 是 React 内部用来管理和协调组件更新的一个核心架构。从 React 16 开始，Fiber 取代了之前的同步递归渲染模型，成为新的协调（Reconciliation）引擎。

Fiber 本质上是一个基于链表的数据结构，它以更加灵活和高效的方式描述了 React 应用中的组件树，同时为支持异步渲染、任务优先级调度、任务中断与恢复奠定了基础。

---

### **Fiber 的核心特点**
1. **任务可中断**：
   - Fiber 能够将渲染任务分成小块，允许在任务中途暂停、恢复甚至取消，从而避免主线程长时间被占用。

2. **优先级调度**：
   - 不同的任务可以被赋予不同的优先级，高优先级任务（如用户输入）可以打断低优先级任务。

3. **异步渲染**：
   - React 的 Fiber 架构支持将渲染任务分布到多个帧中完成，避免一次性占用主线程。

4. **双缓冲机制**：
   - Fiber 通过维护两棵树（`current` 和 `workInProgress`），实现高效的更新和状态管理。

---

### **Fiber 的设计目的**
Fiber 的设计初衷是解决 React 在早期版本中遇到的一些关键问题，主要包括：

1. **同步递归模型的局限性**：
   - 在 React 15 及之前，Reconciler 是一个递归过程，无法中断。如果组件树很大，渲染可能导致主线程长时间卡顿。

2. **无法优先处理高优先级任务**：
   - 传统模型中所有任务一视同仁，导致用户输入、动画等高优先级任务被延迟执行。

3. **缺乏灵活性**：
   - React 需要更灵活的机制来支持未来功能（如 Concurrent Mode 和 Suspense）。

---
### **Fiber 的核心数据结构**
Fiber 是一个 JS 对象，每个 Fiber 节点对应组件树中的一个组件或 DOM 元素。其主要字段包括：

```javascript
const fiber = {
  // 类型相关
  type: null,             // 节点类型，如 FunctionComponent、ClassComponent、HostComponent 等
  tag: null,              // 用于标记当前 Fiber 类型的常量
  
  // 树结构
  return: null,           // 父节点
  child: null,            // 第一个子节点
  sibling: null,          // 兄弟节点
  
  // 渲染和状态
  stateNode: null,        // DOM 节点或组件实例
  pendingProps: null,     // 新的 props
  memoizedProps: null,    // 已经渲染的 props
  memoizedState: null,    // 已经渲染的状态
  
  // 优化和更新
  alternate: null,        // 指向当前 Fiber 的备用节点（用于双缓冲）
  flags: null,            // 当前节点的副作用标记
  updateQueue: null,      // 记录需要更新的任务队列
};
```

---

### **Fiber 的工作流程**
Fiber 的核心工作流程可以分为以下三部分：

#### 1. **任务调度**
React 使用 `scheduleUpdateOnFiber` 函数调度更新，根据任务的优先级决定是同步执行还是异步执行：
- 同步更新：立即执行（如用户输入）。
- 异步更新：推迟到主线程空闲时执行。

#### 2. **协调阶段（Reconciliation）**
React 使用 Fiber 树递归遍历组件树，计算需要更新的节点，并构建新的 Fiber 树（`workInProgress`）。

- **开始阶段（Begin Work）**：
  - 为当前节点创建子节点的 Fiber。
  - 计算新的状态和 props。

- **完成阶段（Complete Work）**：
  - 确认当前节点的 Fiber，准备提交到 DOM。

#### 3. **提交阶段（Commit）**
在协调完成后，React 会进入提交阶段：
- 应用 DOM 更新。
- 执行生命周期方法（如 `componentDidMount`、`useEffect`）。

---

### **Fiber 的实际作用**
Fiber 的引入，使得 React 能够：
1. **提升用户体验**：
   - 避免卡顿和界面无响应。
   - 优先处理用户交互任务。

2. **支持新特性**：
   - **Concurrent Mode**：允许多个任务并发执行。
   - **Suspense**：更优雅地处理异步加载。
   - **时间切片（Time Slicing）**：将大任务分片完成，避免长时间占用主线程。

3. **增强代码灵活性**：
   - 通过链表替代传统递归，便于中断与恢复。

---

### **总结**
Fiber 是 React 的内部机制，为组件树提供了一种更加灵活的表示方式，主要用于：
- 支持异步渲染和任务调度。
- 提高渲染效率。
- 为 React 的未来功能（如并发模式）奠定基础。

Fiber 的架构设计不仅是一个性能优化的解决方案，更是一个创新性的平台能力。希望这个解释能帮助你更清楚地理解 Fiber 的本质！如果需要更多细节，欢迎继续讨论！ 😊