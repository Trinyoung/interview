// @ts-nocheck
// @ts-ignore
var express = require('express');
// const { countReset } = require('node:console');
// @ts-ignore
const cors = require('cors');
var app = express();
// @ts-ignore
// app.use(function (req, res, next) {
//     console.log('here')
//     res.header('Access-Control-Allow-Origin', '*');

// //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行

//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     res.header('Access-Control-Allow-Methods', '*');

//     res.header('Content-Type', 'application/json;charset=utf-8');
    
//     next();
// })
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
// @ts-ignore
app.put('/user', function (req, res) {
    console.log('hahaha')
    res.cookie('name', '123456');
    res.send('请求结束！');
});
// @ts-ignore
app.listen(3002, function() {
    console.log('app is listend on 3002')
});