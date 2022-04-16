/*
 * @Author: zsc
 * @Date: 2022-03-09 10:05:57
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-09 23:29:20
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\3.9.js
 */

/* Leetcode 75 颜色分类 */
/* 我们可以考虑对数组进行两次遍历。
在第一次遍历中，我们将数组中所有的 0 交换到数组的头部。
在第二次遍历中，我们将数组中所有的 1 交换到头部的 0 之后。
此时，所有的 2 都出现在数组的尾部，这样我们就完成了排序。 */
/* 
function sort1(arr) {
    let len = arr.length;
    let ptr = 0; //表示头部的范围，从位置0到位置ptr−1都属于头部。初始值为0，表示还没有数处于头部。

    for (let i = 0; i < len; i++) {
        if (arr[i] === 0) {
            [arr[ptr], arr[i]] = [arr[i], arr[ptr]];
            ptr++;
        }
    }

    for (let i = ptr; i < len; i++) {
        if (arr[i] === 1) {
            [arr[ptr], arr[i]] = [arr[i], arr[ptr]];
            ptr++;
        }
    }

    return arr;
}
*/
/* 
function sort2(arr) {
    let len = arr.length;
    let p0 = 0,
        p2 = len - 1;

    for (let i = 0; i < len; i++) {
        while (i <= p2 && arr[i] === 2) {
            [arr[i], arr[p2]] = [arr[p2], arr[i]];
            p2--; //不断交换直至arr[i]!=0
        }
        console.log(i, arr);
        if (arr[i] === 0) {
            [arr[i], arr[p0]] = [arr[p0], arr[i]];
            p0++;
        }
    }

    return arr;
}

let arr = [0, 1, 2, 0, 1, 2, 2, 2, 2, 1, 1, 1, 0, 2];
sort2(arr);
console.log(arr);
*/

/* Leetcode 88 合并两个有序数组 */
/* 
var merge = function(nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m, ...nums2);
    nums1.sort((a, b) => a - b);
};
*/

/* Leetcode 215 数组中的第k个最大元素 */
/* 
function findKthLargest(nums, k) {
    nums=nums.sort((a, b) => (a - b));
    return nums[len - k];
}
*/

function ListNode(val) {
    this.val = val;
    this.next = null;
}

//const node = new ListNode();
//node.next = new ListNode();

//console.log(node);

function mergeTwoLists(l1, l2) {
    let head = new ListNode();
    let cur = head;

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }

    cur.next = l1 !== null ? l1 : l2;

    return head.next;
}

function deleteDuplicates(head) {
    let cur = head;

    while (cur !== null && cur.next !== null) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
            cur = cur.next;
        } else cur = cur.next;
    }

    return head;
}

function deleteDuplicatesII(head) {
    if (!head || !head.next) return head;

    let dummy = new ListNode();
    dummy.next = head;
    let cur = dummy;

    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            let val = cur.next.val;
            while (cur.next && cur.next.val === val)
                cur.next = cur.next.next;
        } else cur = cur.next;
    }

    return dummy.next;
}

function removeNthFromEnd(head, n) {
    let dummy = new ListNode();
    dummy.next = head;
    let slow = dummy;
    let fast = dummy;

    while (n) {
        fast = fast.next;
        n--;
    }

    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;

    return dummy.next;
}

function reverseList(head) {
    let pre = null;
    let cur = head;

    while (cur !== null) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = cur.next;
    }

    return pre;
}

function reverseBetween(head, m, n) {
    let dummy = new ListNode();
    dummy.next = head;
    let pre, cur, lefthead;
    let p = dummy; //游标，用来遍历

    for (let i = 0; i < m - 1; i++)
        p = p.next; //走到整个区间的前驱结点处

    lefthead = p;

    let start = p.next;
    pre = start;
    cur = start.next;

    for (let i = m; i < n; i++) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    lefthead.next = pre; //leftHead 的后继结点此时为反转后的区间的第一个结点
    start.next = cur; //将区间内反转后的最后一个结点 next 指向 cur
    return dummy.next; //dummy.next 永远指向链表头结点

}

function hasCycle(head) {
    while (head) { //只要节点存在，就一直遍历
        if (head.flag) return true;
        else {
            head.flag = 1;
            head = head.next;
        }
    }

    return false;
}