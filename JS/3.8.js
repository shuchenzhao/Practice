/*
 * @Author: zsc
 * @Date: 2022-03-08 09:09:45
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-09 09:49:54
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\3.8.js
 */

/* Leetcode54 螺旋矩阵 */
/*
let matrix = [
    [1, 2, 3, 4, 5],
    [16, 17, 18, 19, 6],
    [15, 24, 25, 20, 7],
    [14, 23, 22, 21, 8],
    [13, 12, 11, 10, 9]
];

function Spiralorder(matrix) {
    if (!matrix.length || !matrix[0].length) return [];

    const Spiralorder = [];
    let rows = matrix[0].length,
        columns = matrix.length;
    let top = 0,
        bottom = rows - 1,
        left = 0,
        right = columns - 1;

    while (top <= bottom && left <= right) {

        for (let j = left; j <= right; j++)
            Spiralorder.push(matrix[top][j])

        for (let i = top + 1; i <= bottom; i++)
            Spiralorder.push(matrix[i][right]);

        if (top < bottom && left < right) {
            for (let j = right - 1; j > left; j--)
                Spiralorder.push(matrix[bottom][j]);
            for (let i = bottom; i > top; i--)
                Spiralorder.push(matrix[i][left]);
        }

        top++, bottom--, left++, right--;
    }

    return Spiralorder;
}

let a = Spiralorder;
console.log(a(matrix));
//console.log(Spiralorder(matrix));
*/

/* 二分查找 */
/*
function BinarySearch(arr, target) {
    let left = 0,
        right = arr.length - 1;

    while (left <= right) {
        let mid = Math.round((left + right) / 2); //JS除法不是去余的
        if (arr[mid] === target) //在JS中不要使用==比较数组
            return mid;
        else if (target > arr[mid])
            left = mid + 1;
        else
            right = mid - 1;
    }

    return false;
}

let arr = [1, 2, 3, 4, 5, 9, 10, 11, 13, 20, 21, 23];
console.log(BinarySearch(arr, 3));
*/

/*
let nums = [1, 1, 2];

let removeDuplicates = function(nums) {
    nums = Array.from(new Set(nums));
    console.log(nums);
    return nums.length;
};

removeDuplicates(nums);
console.log(nums);
*/

/* RemoveDuplicatesII */
/*
function RemoveDuplicatesII(arr) {
    let len = arr.length;

    if (len <= 2) return len;

    let slow = 2,
        fast = 2;

    while (fast < len) {
        if (arr[slow - 2] != arr[fast]) {
            arr[slow] = arr[fast];
            slow++;
        }
        fast++;
    }

    return slow;
}
*/

/* quickSort */
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (arr.length > 1) {
        const lineIndex = partition(arr, left, right); //下一次划分左右子数组的索引位

        if (left < lineIndex - 1)
            quickSort(arr, left, lineIndex - 1);
        if (lineIndex < right)
            quickSort(arr, lineIndex, right);
    }

    return arr;
}

function partition(arr, left, right) {
    let pivot = arr[Math.floor((left + right) / 2)]; //基准值默认取中间位置元素
    let i = left,
        j = right;

    while (i <= j) { //当左右指针不越界时
        while (arr[i] < pivot) i++; // 左指针所指元素若小于基准值，则右移左指针
        while (arr[j] > pivot) j--; // 右指针所指元素大于基准值，则左移右指针

        if (i <= j) { //若i<=j，则意味着基准值左边存在较大元素或右边存在较小元素，交换两个元素确保左右两侧有序
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++, j--;
        }
    }

    return i; //返回左指针索引作为下一次划分左右子数组的依据
}

arr = [4, 7, 2, 6, 9, 3, 6, 0, 5, 6, 3];
quickSort(arr, 0, arr.length - 1);
console.log(arr);