## vue3 中的 setup 脚本和 定义的 setup方法，两者有何区别？

从源码角度来说，它的区别就是多调用了一个expose方法，并且传值为空，也就是说，使用 setup script 它将不会暴露任何属性给外部（父组件），如果想要暴露的话，那么需要自己定义暴露的方法和属性。而 普通的 脚本则会暴露它所有的属性和方法。可以被父组件通过 ref 来调用里面的属性和方法。

## vue3 如何实现效率提升的？

### 静态提升
什么是静态静态节点： 元素节点没有绑定动态内容。
就是将没有动态编码的节点，提升道全局，这样的话，虚拟DOM 就不会被重新创建。

静态属性提升
就是一个DOM 属性的会被提升的。

### 预字符串化

### 缓存事件处理函数

### Block Tree

### PatchFlag

## vue3 对比一下 vue2？

让我从多个方面详细对比 Vue2 和 Vue3：

### 1. 响应式系统

**Vue2**:
```javascript
// Object.defineProperty
Object.defineProperty(data, 'count', {
    get() {
        return value;
    },
    set(newValue) {
        value = newValue;
        dep.notify();
    }
});
```

**Vue3**:
```javascript
// Proxy
const proxy = new Proxy(target, {
    get(target, key, receiver) {
        track(target, key);
        return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
        Reflect.set(target, key, value, receiver);
        trigger(target, key);
        return true;
    }
});
```

主要区别：
- Vue3 可以监听数组变化
- Vue3 可以监听对象属性的添加和删除
- Vue3 性能更好，不需要递归遍历

### 2. 组合式 API vs 选项式 API

**Vue2**:
```javascript
export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        increment() {
            this.count++
        }
    },
    computed: {
        double() {
            return this.count * 2
        }
    }
}
```

**Vue3**:
```javascript
import { ref, computed } from 'vue'

export default {
    setup() {
        const count = ref(0)
        const double = computed(() => count.value * 2)
        
        function increment() {
            count.value++
        }
        
        return {
            count,
            double,
            increment
        }
    }
}
```

优势：
- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

### 3. 性能优化

**Vue2**:
```javascript
// 全局组件注册
Vue.component('my-component', {
    // ...
})

// 虚拟 DOM
render() {
    return h('div', this.items.map(item => 
        h('span', item)
    ))
}
```

**Vue3**:
```javascript
// 按需引入
import { createApp } from 'vue'
import MyComponent from './MyComponent.vue'

const app = createApp({})
app.component('my-component', MyComponent)

// 虚拟 DOM + 静态提升
render() {
    return h('div', [
        _hoisted_1, // 静态节点提升
        ...this.items.map(item => h('span', item))
    ])
}
```

优化点：
- 更小的打包体积
- 更好的 tree-shaking
- 更快的渲染速度

### 4. TypeScript 支持

**Vue2**:
```typescript
// 需要额外的装饰器支持
@Component
export default class MyComponent extends Vue {
    @Prop() readonly msg!: string
    count: number = 0
}
```

**Vue3**:
```typescript
// 原生支持
import { defineComponent, ref, PropType } from 'vue'

export default defineComponent({
    props: {
        msg: String as PropType<string>
    },
    setup() {
        const count = ref<number>(0)
        return { count }
    }
})
```

### 5. 新特性对比

1. **Fragment**:
```vue
<!-- Vue2: 必须有根节点 -->
<template>
    <div>
        <h1>Title</h1>
        <p>Content</p>
    </div>
</template>

<!-- Vue3: 支持多根节点 -->
<template>
    <h1>Title</h1>
    <p>Content</p>
</template>
```

2. **Teleport**:
```vue
<!-- Vue3 新增 -->
<teleport to="body">
    <modal></modal>
</teleport>
```

3. **Suspense**:
```vue
<!-- Vue3 新增 -->
<Suspense>
    <template #default>
        <async-component />
    </template>
    <template #fallback>
        Loading...
    </template>
</Suspense>
```

### 6. 生命周期变化

```javascript
// Vue2
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed

// Vue3
setup          // 替代 beforeCreate 和 created
onBeforeMount
onMounted
onBeforeUpdate
onUpdated
onBeforeUnmount  // 替代 beforeDestroy
onUnmounted      // 替代 destroyed
```

### 7. 其他重要变化

1. **事件缓存**:
```javascript
// Vue3 新增事件缓存
<button @click="() => foo()">Click</button>
// 会被缓存，不会在每次渲染时创建新函数
```

2. **自定义渲染器**:
```javascript
// Vue3 支持自定义渲染器
import { createRenderer } from '@vue/runtime-core'

const { render } = createRenderer({
    createElement(type) {
        // 自定义元素创建逻辑
    },
    // ...其他接口
})
```

### 总结优势

Vue3 的主要优势：
1. 更好的性能
2. 更小的体积
3. 更好的 TypeScript 支持
4. 更好的代码组织能力
5. 更好的逻辑复用
6. 更多的新特性
7. 更好的开发体验

建议：
1. 新项目建议直接使用 Vue3
2. 老项目可以渐进式迁移
3. 需要考虑生态系统的支持情况

## vue3 双向数据绑定

### **Vue 3 双向绑定的核心总结**

Vue 3 的双向绑定是基于其全新的 **响应式系统** 和 **`v-model` 指令** 实现的，核心机制可以分为以下几个部分：

---

### **1. 响应式系统：通过 Proxy 实现数据监听**

Vue 3 使用 **Proxy API** 替代了 Vue 2 中的 `Object.defineProperty`，为对象提供全面的响应式支持，包括深层嵌套对象。

#### **实现流程**：
1. **代理数据对象**：
   - 使用 `reactive` 或 `ref` 创建响应式对象或单值。
   - 通过 Proxy 的 `get` 和 `set` 拦截属性访问和修改。

2. **依赖收集与触发**：
   - 在 `get` 操作中，记录依赖（如 `effect` 函数）。
   - 在 `set` 操作中，触发依赖更新，重新执行相关副作用。

3. **特性**：
   - 自动跟踪依赖关系，无需显式定义。
   - 高效处理嵌套对象和数组。

#### **示例**：
```javascript
const state = reactive({ count: 0 });
effect(() => console.log(`Count is: ${state.count}`));
state.count++; // 自动触发更新，输出 "Count is: 1"
```

---

### **2. `v-model` 指令：实现数据和视图的双向绑定**

`v-model` 是双向绑定的核心工具，它封装了：
- **数据绑定**：将表单元素的 `value` 属性与响应式数据绑定。
- **事件监听**：监听用户输入事件（如 `input` 或 `change`），更新绑定的数据。

#### **实现流程**：
1. 初始化：
   - 通过 `v-model` 将表单元素的 `value` 属性与响应式数据绑定。
2. 监听用户输入：
   - 监听输入事件（如 `input`），在事件触发时更新数据。
3. 数据更新后：
   - 响应式系统检测到变化，自动触发视图更新。

#### **多 `v-model` 支持**：
Vue 3 允许在一个组件上使用多个 `v-model` 绑定不同的属性。
```vue
<MyComponent v-model:title="pageTitle" v-model:content="pageContent" />
```

---

### **3. 双向绑定的完整过程**

#### **核心步骤**：
1. 用户修改表单内容：
   - 表单触发输入事件（如 `input`）。
2. `v-model` 更新数据：
   - 通过事件回调将用户输入更新到响应式数据。
3. 响应式系统通知更新：
   - `set` 操作触发依赖，重新计算绑定到视图的数据。
4. 视图自动更新：
   - DOM 根据最新数据重新渲染。

---

### **4. 相比 Vue 2 的改进**
1. **性能优化**：
   - Vue 3 使用 Proxy，支持更高效的深度监听。
   - 无需为每个属性单独定义 `getter` 和 `setter`。

2. **灵活性增强**：
   - 支持多 `v-model` 绑定。
   - `v-model` 可自定义事件和属性（如 `update:modelValue`）。

3. **开发体验提升**：
   - 简化 API，减少重复代码。
   - 提供更高的可扩展性。

---

### **总结图示**

```plaintext
        用户输入事件
              ↓
         v-model 监听
              ↓
   响应式数据（Proxy）
       get      set
        ↓        ↓
依赖收集      触发更新
        ↓        ↓
  视图更新   通知相关组件
```

---

### **核心特点**

1. **响应式更新**：
   - 数据变化会自动更新视图。
2. **视图驱动数据更新**：
   - 用户输入可以自动修改数据。
3. **简单而灵活**：
   - 提供简单的 `v-model` 指令，同时支持复杂场景的扩展。

这种机制使 Vue 3 成为高效、灵活的前端框架，能够轻松实现现代 Web 应用的动态交互需求。