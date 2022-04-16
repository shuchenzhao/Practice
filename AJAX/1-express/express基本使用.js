/*
 * @Author: zsc
 * @Date: 2022-04-11 16:45:57
 * @LastEditors: zhaoshuchen
 * @LastEditTime: 2022-04-14 20:25:53
 * @Description: file content
 * @FilePath: /Ajax/1/express基本使用.js
 */
//1.引入express
const express = require("express");

//2.创建应用对象
const app = express();

//3.创建路由规则 
app.get("/", (request, response) => {
    //request是对请求报文的封装，response是对响应报文的封装
    response.send("HELLO　EXPRESS"); //设置响应·
});

//4.监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动，8000端口");
});