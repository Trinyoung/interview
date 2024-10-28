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
    const { template, getExternalScripts, execScripts } = await importHtml(app)
    // document.querySelector(app.container)!.innerHTML = template.innerHTML
    // document.body.appendChild(template)
    document.querySelector(app.container)!.appendChild(template)
    execScripts()
}
export default handleRouter