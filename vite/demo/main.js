import { counter } from "./counter";
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios'
// import {} from 'antd'
const userInfo = {
    name: 'Lqy' + _.VERSION,
    counter: counter,
    birth: moment('1992-04-05').format('YYYY-MM-DD HH:mm:ss')
}
// axios.VERSION
document.getElementById('app').innerHTML = `<div>
    ${axios.VERSION}
    ${userInfo.name}
    ${userInfo.counter}
    ${userInfo.birth}
<div>`;