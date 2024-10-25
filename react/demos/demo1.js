let state;
function render() {} // render 渲染函数
function useState(initialVal) {
    state = initialVal;
    function setState(newState) {
        state = newState;
        render();
        // WebGL2RenderingContext()
    }
    return [state, setState]
}

// useState 以数组的形式返回两个值，第一个值为原值，第二个为设置的函数，每次更新时，会渲染一下函数