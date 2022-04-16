/*
 * @Author: zsc
 * @Date: 2022-03-05 17:41:06
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-05 22:10:08
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\数组去重.js
 */

var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
console.log(arr);
console.log(unique1(arr)); //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}] {}没有去重
console.log(unique2(arr)); //[1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}] NaN、{}没有去重
console.log(unique3(arr)); //[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}] NaN和{}没有去重，两个null直接消失了
console.log(unique4(arr)); //[0, 1, 15, "NaN", NaN, NaN, {…}, {…}, "a", false, null, true, "true", undefined] NaN、{}没有去重
console.log(unique5(arr)); //[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]
console.log(unique6(arr)); //[1, "true", 15, false, undefined, null, NaN, 0, "a", {…}] 两个true直接去掉了，NaN和{}去重
console.log(unique7(arr)); //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}] 所有的都去重了
console.log(unique8(arr)); //[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
console.log(unique9(arr)); //[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
console.log(unique10(arr)); //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]
console.log(unique11(arr)); //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
console.log([...new Set(arr)]);

/* 1.includes */
function unique1(arr) {
    if (!Array.isArray(arr)) {
        console.log("Type Error!");
        return;
    }

    let arr1 = [];

    for (let i = 0; i < arr.length; i++) {
        if (!arr1.includes(arr[i]))
            arr1.push(arr[i]);
    }

    return arr1;
}

/* 2.indexOf */
function unique2(arr) {
    if (!Array.isArray(arr)) {
        console.log("Type Error!");
        return;
    }

    let arr2 = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr2.indexOf(arr[i]) === -1)
            arr2.push(arr[i]);
    }

    return arr2;
}

/* 3.splice */
function unique3(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

/* 4.sort */
function unique4(arr) {
    if (!Array.isArray(arr)) {
        console.log("Type Error!");
        return;
    }

    arr = arr.sort();
    let arr4 = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] !== arr[i])
            arr4.push(arr[i]);
    }

    return arr4;
}

/* 5.filter */
function unique5(arr) {
    return arr.filter(function(item, index, arr) {
        return arr.indexOf(item, 0) === index;
    });
}

/* 6.对象属性不能相同 */
function unique6(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!');
        return;
    }

    var arr6 = [];
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            arr6.push(arr[i]);
            obj[arr[i]] = 1;
        } else {
            obj[arr[i]]++;
        }
    }
    return arr6;
}

/* 7.hasOwnProperty */
function unique(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr) {
        return obj.hasOwnProperty((typeof item) + item) ? false : (obj[typeof item + item] = true)
    })
}

/* 8.递归 */
function unique(arr) {
    var array = arr;
    var len = array.length;

    array.sort(function(a, b) { //排序后更加方便去重
        return a - b;
    })

    function loop(index) {
        if (index >= 1) {
            if (array[index] === array[index - 1]) {
                array.splice(index, 1);
            }
            loop(index - 1); //递归loop，然后数组去重
        }
    }
    loop(len - 1);
    return array;
}

/* 9.Map */
function arrayNonRepeatfy(arr) {
    let map = new Map();
    let array = new Array(); // 数组用于返回结果
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) { // 如果有该key值
            map.set(arr[i], true);
        } else {
            map.set(arr[i], false); // 如果没有该key值
            array.push(arr[i]);
        }
    }
    return array;
}

/* 10.reduce+includes */
function unique(arr) {
    return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
}
//以下是此方法另一种实现
const targets = [1, 1, 2, 3, 4, 3, 3];
const noRepeat = targets.reduce((previousValue, currentValue, index, array) => {
    if (!previousValue.includes(currentValue)) {
        return previousValue.concat(currentValue);
    }
    return previousValue;
}, []); //reduce(()=> {}，[]) 是指 previousValue 第一次迭代的值，必须提供一个空数组,不然默认会以 targets 数组中的第一个数组元素当作第一次迭代的 previousValue 值。


/* 11.ES6 Set */
function unique11(arr) {
    return Array.from(new Set(arr))
}

/* 12.简化Set */
[...new Set(arr)]