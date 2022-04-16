/*
 * @Author: zsc
 * @Date: 2022-03-20 11:11:32
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-20 17:15:21
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\sort.js
 */

let arr = [1, 4, 3, 7, 5, 2, 6, 9, 8, 0];

function insertSort(arr) {
    if (!arr || arr.length < 2) return arr;

    let len = arr.length;

    for (let i = 0; i < len; i++) {
        let temp = arr[i];
        let k = i - 1;
        while (k >= 0 && arr[k] > temp) k--;
        for (let j = i; j > k + 1; j--)
            arr[j] = arr[j - 1];
        arr[k + 1] = temp;
    }
    return arr;
}

function mergeSort(arr) {
    let len = arr.length;
    if (!arr || len < 2) return arr;

    let mid = Math.floor(len / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid, len); //注意slice是左闭右开区间

    let mergeSortLeft = mergeSort(left);
    let mergeSortRight = mergeSort(right);
    return merge(mergeSortLeft, mergeSortRight);
}

function merge(left, right) {
    let res = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) res.push(left.shift());
        else res.push(right.shift());
    }
    while (left.length) res.push(left.shift());
    while (right.length) res.push(right.shift());

    return res;
}

console.log(mergeSort(arr));