## 第一节 Vue3的设计思想与架构

### 1. 响应式核心升级
    vue2中响应式存在一些局限性
    - 无法监听对象的属性新增与删除；
    - 深度嵌套对象的响应式性能较差；
    - 数组的变异方法需要特殊处理；

### 2. 组合式的API
    Vue3 引入了Composition APi，更方便的组织和复用逻辑，相比Options API，Composition API 提供了：
    = 更好的代码组织逻辑，逻辑关注点分离；
    - 更高的复用性： 通过setUp 和 组合函数共享逻辑；
    - 更好的类型推导： 天然支持Typescript
### 3. 性能优化
    - Tree-Shaking: 按需加载模块，减少不必要的打包体积；
    = 模板编译优化：通过静态提升 和 Block Tree 避免不必要的渲染；
    = Fragments： 支持多节点，提高渲染效率；

### 4. Typescript原生支持
    Vue3 使用Typescript 重写，带来了：
    - 更好的类型推导和IDE提示；
    - 更易维护的代码结构；
    = 对大型项目更友好的开发体验；

1.2 Vue 3 的模块化架构
Vue 3 采用了 模块化的设计，通过 Monorepo 管理多个核心模块，每个模块各司其职。关键模块包括：

模块	功能
@vue/reactivity	实现响应式系统，提供 reactive、ref、watch 等功能
@vue/runtime-core	提供运行时核心逻辑，包括组件实例化、渲染函数、生命周期等
@vue/compiler-core	模板编译器，将模板字符串编译成渲染函数
@vue/shared	提供工具函数和公共方法，例如对象合并、类型检查等
@vue/runtime-dom	操作 DOM 的模块，提供 DOM 特有的渲染逻辑
@vue/server-renderer	服务端渲染模块，用于实现 SSR
