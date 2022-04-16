/*
 * @Author: zsc
 * @Date: 2022-03-06 10:04:24
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-07 19:16:58
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\stack_queue_array_linkedlist.js
 */

/*
function ListNode(val) {
    this.val = val;
    this.next = null;
}

const listnode = new ListNode(1);
listnode.next = new ListNode(2);

console.log(listnode);

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

const treenode = new TreeNode(1);
console.log(treenode);

const root = {
    val: "A",

    left: {
        val: "B",
        left: {
            val: "D"
        },
        right: {
            val: "E"
        }

    },

    right: {
        val: "C",
        right: {
            val: "F"
        }
    }

};

function preorder(root) {
    if (!root) return;

    console.log("当前遍历的节点是：", root.val);
    preorder(root.left);
    preorder(root.right);
}

function inorder(root) {
    if (!root) return;

    preorder(root.left);
    console.log("当前遍历的节点是：", root.val);
    preorder(root.right);
}

function postorder(root) {
    if (!root) return;

    preorder(root.left);
    preorder(root.right);
    console.log("当前遍历的节点是：", root.val);
}

console.log("preorder:")
preorder(root);
console.log("inorder:");
inorder(root);
console.log("postorder:");
postorder(root);


Map-两数求和： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。 
let map = new Map();

let arr = [1, 1, 2, 4, 8];
let target = 5;

function twoSum(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (map.has(target - arr[i])) console.log(map.get(target - arr[i]), i);
        else map.set(arr[i], i);
    }
}

twoSum(arr, target);
console.log(map);

*/

/* 合并两个有序数组：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间 */
/*
let a1 = [1, 2, 4, 8, 0, 0, 0];
let a2 = [3, 5, 7];
let l1 = 4;
let l2 = a2.length;

function merge(a1, a2, l1, l2) {
    let i = l1 - 1,
        j = l2 - 1,
        k = l1 + l2 - 1;

    while (i >= 0 && j >= 0) {
        if (a1[i] > a2[j]) {
            a1[k] = a1[i];
            k--;
            i--;
        } else {
            a1[k] = a2[j];
            k--;
            j--;
        }
    }

    while (j >= 0) {
        a1[k] = a2[j];
        k--;
        j--;
    }
}

merge(a1, a2, l1, l2);
console.log(a1);
*/

/* 三数求和：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。 */
/* 
let arr = [-1, 0, 1, 2, -1, -4];
let arr1 = [];

function threeSum(arr, arr1) {
    arr = arr.sort((a, b) => a - b);

    //注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
    for (let i = 0; i < arr.length - 2; i++) {
        let j = i + 1; //left
        let k = arr.length - 1; //right

        if (i > 0 && arr[i] === arr[i - 1]) continue; //遇重则跳过

        while (j < k) {
            if (arr[i] + arr[j] + arr[k] < 0) {
                j++; //三数之和小于零，左指针前进
                while (j < k && arr[j] === arr[j - 1]) j++; //左指针去重
            } else if (arr[i] + arr[j] + arr[k] > 0) {
                k--; //三数之和大于零，右指针后退
                while (k > j && arr[k] === arr[k + 1]) k--; //右指针去重
            } else {
                arr1.push([arr[i], arr[j], arr[k]]);
                j++;
                k--;
                while (j < k && arr[j] === arr[j - 1]) j++;
                while (k > j && arr[k] === arr[k + 1]) k--;
            }
        }
    }
    return arr1;
}

threeSum(arr, arr1);
console.log(arr1);
*/

/* 反转字符串 */
/* let str = "abcdefg";
str = str.split("").reverse().join("");
console.log(str); */

/* 判断回文串 */
/* function isPalindrome1(str) {
    return str === str.split("").reverse().join();
}
console.log(isPalindrome1(str));

function isPalindrome2(str) {
    let len = str.length;
    for (let i = 0; i < len / 2; i++)
        if (str[i] !== str[len - i - 1]) return false;
    return true;
}
console.log(isPalindrome2("abccba")); */

/* 回文串衍生：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。 */
/* function Palindrome(str) {
    let len = str.length;
    let i = 0,
        j = len - 1;
    while (str[i] === str[j]) {
        i++;
        j--;
    }

    if (isPalindrome1(str.slice(i + 1, j + 1))) return true;
    if (isPalindrome1(str.slice(i, j))) return true;

    return false;
}
console.log(Palindrome("abca")); */

/* 字符串匹配：正则表达式 */

//构造函数
const WordDictionary = function() {
    this.words = {}; //初始化一个对象字面量，承担Map的角色
}

//添加字符串
WordDictionary.prototype.addWord = function(word) {
    //为了降低查找时的复杂度，以字符串的长度为 key，相同长度的字符串存在一个数组中
    if (this.words[word.length]) this.words[word.length].push(word);
    else this.words[word.length] = [word];
}

//搜索
WordDictionary.prototype.searchWord = function(word) {
    let len = word.length;

    if (!this.words[len]) return false;

    if (!word.includes('.')) return this.words[len].includes(word)

    let reg = new RegExp(word);
    return this.words[len].some((item) => reg.test(item))
}

WordDictionary.prototype.addWord("bad");
WordDictionary.prototype.addWord("dad");
WordDictionary.prototype.addWord("mad");
console.log(WordDictionary);
console.log(WordDictionary.prototype.search("pad"));
//search("bad");
//search(".ad");
//search("b..");