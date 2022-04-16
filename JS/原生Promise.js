/*
 * @Author: zsc
 * @Date: 2022-03-27 17:30:20
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-27 19:34:36
 * @Description: file content
 * @FilePath: \blogc:\Users\赵书晨\Desktop\Practice\demo\JS\原生Promise.js
 */
//原生Promise
console.log("第一步");

let promise = new Promise((resolve, reject) => {
    console.log("第二步");
    resolve("这次一定");
    //reject("下次一定");
});

promise.then(
    result => { console.log(result) },
    result => { console.log(result.message) }
);

console.log("第三步");