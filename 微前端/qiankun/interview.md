## qiankun 的应用之间通信有哪些方式？
下面分别介绍三种方法在 `qiankun` 中实现主应用和子应用之间通信的示例，包括 `Redux` / `Vuex` 状态管理、`qiankun` 的全局状态 API 和事件总线。

---

### 方法一：使用 `Redux` 或 `Vuex` 状态管理

#### 主应用

在主应用中创建 `Redux` store，并将其作为 `props` 传递给子应用：

```javascript
// 主应用代码
import { createStore } from 'redux';
import { registerMicroApps, start } from 'qiankun';

// 创建 Redux store
const initialState = { user: { name: 'qiankunUser' } };
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
const store = createStore(rootReducer);

// 注册子应用并传递 store
registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:7100',
    container: '#container',
    activeRule: '/app1',
    props: { store },
  },
  {
    name: 'app2',
    entry: '//localhost:7200',
    container: '#container',
    activeRule: '/app2',
    props: { store },
  },
]);

start();
```

#### 子应用

子应用在接收 `props` 后，通过 `store` 来获取或更新状态：

```javascript
// 子应用代码
function render(props) {
  const { store } = props;

  // 监听全局状态变化
  store.subscribe(() => {
    console.log('Redux state in child app:', store.getState());
  });

  // 触发全局状态更新
  store.dispatch({ type: 'SET_USER', payload: { name: 'updatedUser' } });
}

// qiankun 生命周期钩子
export async function bootstrap() {}
export async function mount(props) {
  render(props);
}
export async function unmount() {}
```

---

### 方法二：使用 `qiankun` 的全局状态 API

`qiankun` 提供 `initGlobalState` 方法来创建一个全局状态对象，并通过 `onGlobalStateChange` 监听状态变化。

#### 主应用

在主应用中创建全局状态，并将其通过 `props` 传递给子应用：

```javascript
// 主应用代码
import { initGlobalState, registerMicroApps, start } from 'qiankun';

// 初始化全局状态
const initialState = { user: { name: 'qiankunUser' } };
const actions = initGlobalState(initialState);

// 监听全局状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log('Global state changed:', state);
});

// 修改全局状态
actions.setGlobalState({ user: { name: 'newUser' } });

// 注册子应用并传递 actions
registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:7100',
    container: '#container',
    activeRule: '/app1',
    props: { actions },
  },
  {
    name: 'app2',
    entry: '//localhost:7200',
    container: '#container',
    activeRule: '/app2',
    props: { actions },
  },
]);

start();
```

#### 子应用

子应用在接收 `actions` 后，通过 `actions` 接口来访问和修改全局状态：

```javascript
// 子应用代码
function render(props) {
  const { actions } = props;

  // 监听全局状态变化
  actions.onGlobalStateChange((state, prev) => {
    console.log('Global state in child app:', state);
  });

  // 修改全局状态
  actions.setGlobalState({ user: { name: 'updatedUserInChildApp' } });
}

// qiankun 生命周期钩子
export async function bootstrap() {}
export async function mount(props) {
  render(props);
}
export async function unmount() {}
```

---

### 方法三：使用事件总线

事件总线可以通过简单的 `EventEmitter` 实现，或者使用 `window.postMessage` 来进行跨子应用通信。

#### 主应用

在主应用中创建一个事件总线对象（可以使用 `EventEmitter` 或自定义的发布订阅机制），并将其作为 `props` 传递给子应用：

```javascript
// 主应用代码
import { registerMicroApps, start } from 'qiankun';
import mitt from 'mitt'; // 使用 mitt 实现简单的事件总线

// 创建事件总线
const eventBus = mitt();

// 注册子应用并传递事件总线
registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:7100',
    container: '#container',
    activeRule: '/app1',
    props: { eventBus },
  },
  {
    name: 'app2',
    entry: '//localhost:7200',
    container: '#container',
    activeRule: '/app2',
    props: { eventBus },
  },
]);

start();
```

#### 子应用

子应用通过事件总线来监听或触发跨应用事件：

```javascript
// 子应用代码
function render(props) {
  const { eventBus } = props;

  // 监听事件
  eventBus.on('userUpdated', (data) => {
    console.log('User updated in child app:', data);
  });

  // 触发事件
  eventBus.emit('userUpdated', { name: 'updatedUserInChildApp' });
}

// qiankun 生命周期钩子
export async function bootstrap() {}
export async function mount(props) {
  render(props);
}
export async function unmount() {}
```

---

### 总结

1. **`Redux` / `Vuex`**：在主应用中创建共享的 `Redux` 或 `Vuex` store，并通过 `props` 传递给子应用，适合需要复杂全局状态管理的场景。
2. **`qiankun` 全局状态 API**：直接使用 `qiankun` 的 `initGlobalState` API，适合简单的全局状态管理。
3. **事件总线**：通过事件发布/订阅机制来进行应用间通信，适合松耦合的消息传递需求。

每种方法的选择可以根据实际需求和状态复杂度来决定。