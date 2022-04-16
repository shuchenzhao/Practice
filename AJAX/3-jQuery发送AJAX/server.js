/*
 * @Author: zhaoshuchen
 * @Date: 2022-04-16 14:13:44
 * @LastEditors: zhaoshuchen
 * @LastEditTime: 2022-04-16 15:36:51
 * @FilePath: /Ajax/3-JQuery中的Ajax/server.js
 * @Description: file content
 */
const { request } = require("express");
const express = require("express");

const app = express();

app.all("/jQuery", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const data = { name: zhaoshuchen };
    response.send(JSON.stringify(data));
});

app.listen(8000, () => {
    console.log("The service has been started on port 8000");
});