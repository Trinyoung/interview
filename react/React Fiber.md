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

Fiber 的架构设计不仅是一个性能优化的解决方案，更是一个创新性的平台能力。希望这个解释能帮助你更清楚地理解 Fiber 的本质！如果需要更多细节，欢迎继续讨论！ 

**Fiber 的数据结构**是 React 16+ 引入的一种灵活的表示方式，它是一个对象，每个 Fiber 节点表示组件树中的一个单元。这些节点通过指针连接起来，形成了一个链表形式的树结构。

以下是 Fiber 数据结构的完整字段分析，每个字段的含义和用途：

---

### **Fiber 数据结构**

Fiber 的数据结构是它的核心机制之一， 它是一个链表的数据结构。

```javascript
const fiber = {
  // **类型相关**
  tag: null,                 // 节点类型的标记
  type: null,                // 当前 Fiber 节点的具体类型
  key: null,                 // 唯一标识，用于区分子节点
  
  // **树形结构**
  return: null,              // 指向父 Fiber 节点
  child: null,               // 指向第一个子节点
  sibling: null,             // 指向下一个兄弟节点
  index: 0,                  // 当前节点在兄弟节点中的位置
  
  // **状态管理**
  stateNode: null,           // 对应的真实 DOM 节点或类组件实例
  pendingProps: null,        // 新的 props
  memoizedProps: null,       // 上次渲染时的 props
  memoizedState: null,       // 上次渲染时的状态
  updateQueue: null,         // 记录需要更新的队列（如 setState 产生的更新）
  
  // **副作用**
  flags: null,               // 副作用标记（如插入、更新、删除等操作）值为：Placement，Update，Deletion
  subtreeFlags: null,        // 子树中的副作用标记
  deletions: null,           // 存储需要删除的子节点列表
  
  // **双缓冲**
  alternate: null,           // 指向当前 Fiber 节点的备用 Fiber
  
  // **优先级与时间**
  lanes: null,               // 当前节点的优先级队列（代表任务的紧急程度）
  childLanes: null,          // 子节点的优先级队列
  expirationTime: null,      // 更新过期时间（16+ 已被 lanes 取代）
};
```

---

### **字段分析与用途**

#### **1. 类型相关字段**
- **`tag`**：
  - 表示 Fiber 节点的类型，使用枚举值定义。
  - 示例值：
    - `FunctionComponent`：函数组件。
    - `ClassComponent`：类组件。
    - `HostComponent`：普通 DOM 节点。
    - `HostText`：文本节点。
  - **用途**：在渲染和协调时，决定如何处理当前 Fiber 节点。

- **`type`**：
  - 表示 Fiber 对应的具体组件类型或 HTML 标签。
  - 示例值：
    - 对于 DOM 节点：`'div'`、`'span'` 等。
    - 对于组件：组件的构造函数或函数定义。
  - **用途**：用于在协调阶段判断节点是否需要更新。

- **`key`**：
  - 标识节点的唯一性，用于比较和复用子节点。
  - 示例值：开发者在列表渲染中提供的 `key` 值。
  - **用途**：在调和阶段，帮助 React 高效找到对应的节点。

---

#### **2. 树形结构字段**
- **`return`**：
  - 指向当前 Fiber 节点的父节点。
  - **用途**：在完成阶段（`completeWork`），React 会通过 `return` 回溯处理父节点。

- **`child`**：
  - 指向第一个子节点。
  - **用途**：React 从这里开始递归遍历子节点。

- **`sibling`**：
  - 指向当前节点的下一个兄弟节点。
  - **用途**：React 在处理完一个子节点后，会沿着 `sibling` 遍历兄弟节点。

- **`index`**：
  - 当前节点在兄弟节点中的位置索引。
  - **用途**：在 Diff 算法中用于比较同一层的节点位置。

---

#### **3. 状态管理字段**
- **`stateNode`**：
  - 表示与 Fiber 节点关联的实际资源。
  - 示例值：
    - 对于 DOM 节点：指向真实的 DOM。
    - 对于类组件：指向类实例。
  - **用途**：在 commit 阶段用于操作真实 DOM 或调用组件生命周期方法。

- **`pendingProps`**：
  - 当前 Fiber 在本次更新中即将使用的 props。
  - **用途**：用于比较是否需要更新。

- **`memoizedProps`**：
  - 当前 Fiber 上一次渲染时的 props。
  - **用途**：用于性能优化，判断 props 是否变化。

- **`memoizedState`**：
  - 当前 Fiber 上一次渲染完成后的状态。
  - **用途**：用于复用上次渲染的状态，避免不必要的更新。

- **`updateQueue`**：
  - 存储对当前 Fiber 节点的状态更新队列。
  - 示例值：`setState` 调用会生成更新，并存储在此处。
  - **用途**：在更新阶段，React 会根据此队列更新 `state`。

---

#### **4. 副作用字段**
- **`flags`**：
  - 副作用标记，描述当前节点需要执行的操作。
  - 示例值：
    - `Placement`：需要插入。
    - `Update`：需要更新。
    - `Deletion`：需要删除。
  - **用途**：在 commit 阶段，决定如何处理节点。

- **`subtreeFlags`**：
  - 子树中的副作用标记。
  - **用途**：用于快速判断子树是否有需要处理的副作用。

- **`deletions`**：
  - 存储需要删除的子节点。
  - **用途**：在 commit 阶段，执行节点的删除操作。

---

#### **5. 双缓冲字段**
- **`alternate`**：
  - 指向同一 Fiber 节点的另一棵 Fiber 树中的节点（用于双缓冲）。
  - **用途**：在 Fiber 树更新时，`current` 和 `workInProgress` 交替使用。

---

#### **6. 优先级与时间字段**
- **`lanes`**：
  - 当前 Fiber 节点的更新优先级。
  - **用途**：在调度阶段，React 根据 `lanes` 决定任务的紧急程度。

- **`childLanes`**：
  - 子树中的最高优先级。
  - **用途**：帮助 React 快速判断是否需要更新子节点。

---

### **总结**
Fiber 数据结构通过将组件树拆分成独立的节点，并为每个节点存储状态、任务队列、副作用和优先级等信息，实现了以下目标：
1. **支持增量渲染**：通过 `return`、`child`、`sibling` 构建链表，便于任务切片和中断。
2. **高效任务调度**：通过 `lanes` 和 `childLanes` 管理优先级。
3. **双缓冲机制**：通过 `alternate` 提供高效的 Fiber 树切换。

如果对某个字段有具体疑问，或者想深入源码实现，随时告诉我！ 😊