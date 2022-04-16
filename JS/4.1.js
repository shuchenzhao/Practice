/*
 * @Author: zsc
 * @Date: 2022-04-01 19:26:59
 * @LastEditors: zsc
 * @LastEditTime: 2022-04-01 23:29:22
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\4.1.js
 */

/* 只能用这个log函数，来实现升序打印0到100 */
const log = (callback) => {
    log.count = log.count || 0;
    var count = log.count++;
    setTimeout(() => {
        console.log(count);
        callback && callback();
    }, Math.random() * 1000 % 10);
};
//解
const foo = () => new Promise(resolve => {
    log(() => resolve()); //最关键的一步
});
//法一
const test = async() => {
    for (let i = 0; i <= 100; i++) {
        await foo();
    }
};
test();
//法二：只用Promise，p = p.then 的用法类似于 Promise.all 的实现，就是通过循环绑定 100 个 then 回调：
for (let i = 0; i <= 100; i++) {
    p = p.then(() => new Promise(resolve => {
        log(() => resolve());
    }));
}

/* 输入console.log("hello".repeatify(3)) 输出hellohellohello */
String.prototype.repeatify = function(num) {
    let s = "";
    for (let i = 0; i < num; i++) {
        s += this;
    }
    return this;
}
console.log(this.repeatify(3));