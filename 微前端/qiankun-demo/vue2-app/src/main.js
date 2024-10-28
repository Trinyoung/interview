import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
let instance = null;
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
function render (props = {}) {
  const { container} = props;
  instance = new Vue({
    render: h => h(App),
  }).$mount(container? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap () {
  console.log('vue app bootstraped');
}

export async function mount (props) {
  console.log('vue app mount', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  // router = null;
}