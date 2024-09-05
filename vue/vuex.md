## 1. 说下vuex 的原理
1. vuex 中的store 本质上就是一个没有`template`模板的的隐藏式的`vue`组件；
2. vuex 是利用mixin混入禁止，在beforeCreate钩子前混入vueInit方法；
3. vuexInit方法实现将vuex store 注册到当前组件的`$store`属性上；
4. vuex 的state作为一个隐藏的vue组件的data，定义在state上面的变量，相当于这个vue实例的data属性，凡是定义在data上的数据都是响应式的。
5. 当页面中使用了vuex state 中的数据，就是依赖收集的过程，当vuex中的state 中的数据发生变化，就通过调用对应的属性的dep对象的notify方法，去修改视图变化；
