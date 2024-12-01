import { getApps } from '.'
import { importHtml } from './import-html'
const handleRouter = async () => {
    // 匹配子应用
    // 加载子应用
    // 渲染子应用
    // 卸载子应用
    const apps = getApps()
    const app = apps.find((app) => window.location.pathname.startsWith(app.activeRule))
    console.log(app, 'app')
    if (!app) return

    // const content = await fetch(app.entry).then((res) => res.text())
    // console.log(content, 'content')
    // document.querySelector(app.container)!.innerHTML = content;
    // eval
    const { template, execScripts } = await importHtml(app)
    // document.querySelector(app.container)!.innerHTML = template.innerHTML
    // document.body.appendChild(template)
    console.log(template, 'template')
    // @ts-ignore
    window.__POWERED_BY_QIANKUN__ = true
    // 直接导入的js脚本，浏览器是不会执行的，客户端渲染通过执行，javascript 来生成内容；
    // 浏览器处于安全考虑是不会执行innerHtml 中的脚本的。 为什么？所以这时候，我们需要手动去加载和执行
    document.querySelector(app.container)?.appendChild(template)
    execScripts()
    
}
export default handleRouter