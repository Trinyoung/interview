import handleRouter from './handleRouter'
import rewriteRouter from './rewriteRouter'

let _apps: any[] = []
export const getApps = () => {
    return _apps
}
export const registerMicroApps = (subApps: any[]) => {
    // registerMicroApps(subApps)
    console.log(subApps, 'subApps')
    _apps = subApps
}

export const start = () => {
    rewriteRouter()
    handleRouter()
    // start()
    // 
    // 微前端的运行原理
    // 1. 监视路由变化，
    
    // 2. 匹配子应用 
    // 3. 加载子应用 
    // 4. 渲染子应用 
    // 5. 卸载子应用
}
