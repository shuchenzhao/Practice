/*
 * @Author: zhaoshuchen
 * @Date: 2022-04-16 16:27:03
 * @LastEditors: zhaoshuchen
 * @LastEditTime: 2022-04-16 19:50:57
 * @FilePath: /Ajax/4-axios发送AJAX/server.js
 * @Description: file content
 */
const { request } = require("express");
const express = require("express");

const app = express();

app.all("/axios", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const data = { name: zhaoshuchen };
    response.send(JSON.stringify(data));
});

app.listen(8000, () => {
    console.log("The service has been started on port 8000");
});