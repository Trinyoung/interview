import { loadMicroApp } from 'qiankun';

// 1. 加载子应用并提取 HTML、CSS 和 JS 资源
async function loadSubApp() {
    const app = loadMicroApp({
        name: 'sub-app',
        entry: 'https://sub-app.example.com',
        container: '#sub-app-container',
        sandbox: { strictStyleIsolation: true } // 开启沙箱隔离
    });

    await app.mountPromise;  // 等待子应用挂载
}

// 2. qiankun 解析 `<script>` 标签
function parseAndExecuteScripts(scripts: string[]) {
    scripts.forEach((script) => {
        if (script.src) {
            // 如果是外部脚本，则动态创建 `<script>` 标签，并设置 src
            const scriptElement = document.createElement('script');
            scriptElement.src = script.src;
            scriptElement.async = false;  // 保证按顺序执行
            document.head.appendChild(scriptElement);
            scriptElement.onload = () => document.head.removeChild(scriptElement); // 移除标签，避免污染
        } else {
            // 如果是内联脚本，使用 `new Function` 执行
            new Function(script.content)();
        }
    });
}

// 3. 使用沙箱机制隔离执行
function runInSandbox(scripts: string[]) {
    const proxyWindow = createProxyWindow(); // 使用 Proxy 创建沙箱
    scripts.forEach((script) => {
        if (script.src) {
            // 处理外部脚本
            const scriptElement = document.createElement('script');
            scriptElement.src = script.src;
            scriptElement.async = false;
            scriptElement.onload = () => document.head.removeChild(scriptElement);
            document.head.appendChild(scriptElement);
        } else {
            // 内联脚本，通过 proxyWindow 的作用域执行
            new Function('window', script.content).call(proxyWindow, proxyWindow);
        }
    });
}

// 创建一个 Proxy 沙箱
function createProxyWindow() {
    const fakeWindow = {};
    return new Proxy(fakeWindow, {
        get(target, prop) {
            return prop in target ? target[prop] : window[prop];
        },
        set(target, prop, value) {
            target[prop] = value;
            return true;
        },
    });
}

// 调用加载子应用的函数
loadSubApp();
