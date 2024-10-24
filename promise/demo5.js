let arr = new Array(100).fill(0);
arr = arr.map((_, index) => {
    return function (callback) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(index, 'index isbbb')
                resolve(index)
                callback()
            }, ((index % 2 + 1) * 1000))
        })
    }
});
let runningNum = 0;
function run () {
    if (runningNum < 10) {
        runningNum++;
        operation(arr.pop())
        
    }
}

async function operation(task) {
    if (runningNum < 10 && arr.length > 0) run();
    task(() => {
        runningNum --;
    });
    // console.log(res, 'res is bbb')
    
    
}

run();