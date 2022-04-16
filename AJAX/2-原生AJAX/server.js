/*
 * @Author: your name
 * @Date: 2022-04-14 17:22:54
 * @LastEditTime: 2022-04-16 11:32:08
 * @LastEditors: zhaoshuchen
 * @Description: file content
 * @FilePath: /Ajax/2-原生AJAX/server.js
 */
const { request } = require("express");
const express = require("express");

const app = express();

app.get("/server", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*"); //设置响应头允许跨域
    response.send("Hello Ajax GET"); //设置响应体
});

app.post("/server", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.send("Hello Ajax POST");
});

app.all("/json-server", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Head", "*");

    const data = {
        name: "zhaoshuchen"
    };
    let str = JSON.stringify(data);

    response.send(str);
});

app.get("/delay", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    setTimeout(() => {
        response.send("delayed response");
    }, 3000);
});

app.listen(8000, () => {
    console.log("The service has been started on port 8000");
});