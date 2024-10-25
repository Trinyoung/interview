import { userInfo } from './info.js'
import './style.css'
console.log(userInfo, 'userInfo ======>')
// var { name, age, sex } = userInfo;
if (module.hot) {
    module.hot.accept('./info.js', function() {
    const updatedUserInfo = require('./info.js').userInfo; // 动态导入更新后的 userInfo
    userInfo = updatedUserInfo; // 更新 userInfo
    window.userInfo = userInfo; // 重新挂载到 window 对象
    console.log('Module updated!', userInfo);
    });
}

// userInfo;
const container = document.getElementById('container');
if (userInfo) {
 container.innerText = userInfo?.name + userInfo?.time
}
window.userInfo = userInfo;