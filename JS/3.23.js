/*
 * @Author: zsc
 * @Date: 2022-03-23 21:08:28
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-23 21:14:28
 * @Description: 打乱数组元素顺序
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\3.23.js
 */

function Fisher_Yates_shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
}

let stu = ["stu1", "stu2", "stu3", "stu4", "naughty"];
console.log(Fisher_Yates_shuffle(stu));