/*
 * @Author: zsc
 * @Date: 2022-03-05 17:41:06
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-05 20:19:45
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\数组去重.js
 */

let arr = [1, 4, 2, 3, 3];
/* 
for (let key in arr)
    console.log(arr[key]); 
*/
//console.log([0] + 1); //01
//console.log([1, 2] + 1); //1,21
//console.log(String(arr_1));

//delete(arr[1]);
//arr.splice(0, 1, 888, 999, 777);
//console.log(arr.slice(0, 4));
//console.log(arr.concat([2, 2]));

/*
arr.forEach((item, index, array) => {
    console.log(`${item} is at index ${index} in ${array}`);
});

for (let a of arr) {
    console.log(a);
}
*/

/*
console.log(arr.indexOf(4, 0));
console.log(arr.lastIndexOf(4, 2));
console.log(arr.includes(4, 0));
*/

let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Pete" },
    { id: 3, name: "Mary" }
];
/*
let result = arr.find(function(item, index, array) {
    // 如果返回 true，则返回 item 并停止迭代
    // 对于假值（falsy）的情况，则返回 undefined
});
*/

let user = users.find(item => item.id == 1);
console.log(user.name); // John
/*
let results = arr.filter(function(item, index, array) {
    // 如果 true item 被 push 到 results，迭代继续
    // 如果什么都没找到，则返回空数组
  });
*/
/*
let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Pete" },
    { id: 3, name: "Mary" }
];

let someUsers = users.filter(item => item.id < 3);
alert(someUsers.length); // 2
*/

let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
console.log(lengths); // 5,7,6

arr.sort((a, b) => a - b);
console.log(arr);

let names = 'Bilbo, Gandalf, Nazgul';
let arr1 = names.split(', ');
console.log(arr1);

let str = "test";
console.log(str.split('')); // t,e,s,t

let arr2 = ['Bilbo', 'Gandalf', 'Nazgul'];
let str1 = arr2.join(';'); // 使用分号 ; 将数组粘合成字符串
console.log(str1); // Bilbo;Gandalf;Nazgul

//数组是基于对象的，不构成单独的语言类型
console.log(typeof {}); // object
console.log(typeof []); // odject
console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true