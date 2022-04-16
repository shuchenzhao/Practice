/*
 * @Author: zsc
 * @Date: 2022-03-07 17:04:33
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-07 22:02:50
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\3.7.js
 */

//const arr = new Array(5).fill(0);
//arr.forEach((item, index) => console.log(item, index));

let a1 = new String();
a1 = "ard vewb wrbt3aa";
console.log(a1);
let a2 = a1.split(" ");
console.log(a2);

Array.from('foo'); // [ "f", "o", "o" ]
const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set); // [ "foo", "bar", "baz" ]
const map = new Map([
    [1, 2],
    [2, 4],
    [4, 8]
]);
Array.from(map); // [[1, 2], [2, 4], [4, 8]]
const mapper = new Map([
    ['1', 'a'],
    ['2', 'b']
]);
Array.from(mapper.values()); // ['a', 'b'];
Array.from(mapper.keys()); // ['1', '2'];
function f() {
    return Array.from(arguments);
}
f(1, 2, 3); // [ 1, 2, 3 ]

Array.from({ length: 5 }, (v, i) => i); // [0, 1, 2, 3, 4]
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
// Generate numbers range 0..4
range(0, 4, 1); // [0, 1, 2, 3, 4]

//数组去重合并
function combine() {
    let arr = [].concat.apply([], arguments); //没有去重复的新数组
    return Array.from(new Set(arr));
}
var m = [1, 2, 2],
    n = [2, 3, 3];
console.log(combine(m, n)); // [1, 2, 3]

var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]

//创建二维数组
new Array(n).fill().map(() => { return new Array(n).fill(false) });
Array.from(new Array(3), () => { return new Array(3).fill(false) });