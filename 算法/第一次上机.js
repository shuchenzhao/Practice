/*
 * @Author: zsc
 * @Date: 2022-03-23 13:22:06
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-24 15:03:15
 * @Description: Three sorting methods: 1.随机快排 2.堆排序/优先队列 3.计数排序
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\算法\第一次上机.js
 */

let arr = [1, 9, 6, 2, 4, 8, 3, 7, 5, 0, 1, 9, 6, 2, 4, 8, 3, 7, 5, 0];

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
    //let pivot = arr[Math.floor((left + right) / 2)]; //基准值默认取中间位置元素
    let pivot = arr[Math.floor(Math.random() * ((left + right) / 2))]; //基准值取随机数
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

function heapSort(arr) {
    buildHeap(arr); //将无序数组调整成最大堆
    for (var i = arr.length - 1; i > 0; i--) { //将堆顶元素移至数组最末，将前面剩余部分再调整成最大堆
        [arr[i], arr[0]] = [arr[0], arr[i]];
        adjustHeap(arr, 0, i);
    }
    return arr;
}

function buildHeap(arr) {
    var start = parseInt(arr.length / 2) - 1; //最后一个非叶子结点
    var size = arr.length;
    for (var i = start; i >= 0; i--) //从最后一个非叶子节点开始调整，直至堆顶
        adjustHeap(arr, i, size);
}

function adjustHeap(arr, index, size) {
    while (true) {
        var max = index;
        var left = index * 2 + 1;
        var right = index * 2 + 2;
        if (left < size && arr[max] < arr[left]) max = left;
        if (right < size && arr[max] < arr[right]) max = right;
        // 如果左右节点大于当前节点则交换，并再循环一遍判断交换后是否破坏堆结构
        if (index !== max) {
            [arr[index], arr[max]] = [arr[max], arr[index]];
            index = max;
        } else break;
    }
}

function countSort(arr) {
    let bucket = new Array(arr.length + 1);

    for (let i = 0; i < arr.length; i++)
        bucket[arr[i]] = bucket[arr[i]] + 1 || 1;

    for (let j = 0, t = 0; j < bucket.length; j++)
        while (bucket[j] > 0) {
            arr[t++] = j;
            bucket[j]--;
        }

    return arr;
}

//console.log(quickSort(arr));
//console.log(heapSort(arr));
//console.log(countSort(arr));