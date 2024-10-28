import handleRouter from "./handleRouter"

const rewriteRouter = () => {
    window.addEventListener('popstate', () => {
        console.log('监视到路由变化了')
        handleRouter()
    })
    window.onhashchange = () => {
        console.log('监视到hash变化了')
        handleRouter()
    }
    const originPushState = window.history.pushState
    window.history.pushState = (...args) => { // 为什么要在这里使用apply？不能直接window.history.pushState(...args)吗？
        console.log('监视到pushstate变化了')
        originPushState.apply(window.history, args)
        handleRouter()
    }
    const originReplaceState = window.history.replaceState
    window.history.replaceState = (...args) => {
        console.log('监视到replacestate变化了')
        originReplaceState.apply(window.history, args)
        handleRouter()
    }
}

export default rewriteRouter