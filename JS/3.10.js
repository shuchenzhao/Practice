/*
 * @Author: zsc
 * @Date: 2022-03-10 09:33:57
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-10 17:05:43
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\3.10.js
 */

function detectCycle(head) {

    while (head) {
        if (head.flag) return head;
        else {
            head.flag = true;
            head = head.next;
        }
    }

    return null;
}

const leftToRight = {
    "(": ")",
    "[": "]",
    "{": "}"
}; //map

function isValid(s) {

    if (!s) return true; //空串无条件为true

    const stack = [];

    for (let i = 0; i < s.length; i++) {

        const ch = s[i];

        if (ch === "(" || ch === "{" || ch === "[") stack.push(leftToRight[ch]);
        else { //若不是左括号，则必须是和栈顶的左括号相配对的右括号
            if (!stack.length || stack.pop() !== ch) {
                return false; //若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
            }
        }

    }
    return !stack.length; //若所有的括号都能配对成功，那么最后栈应该是空的
}

function dailyTemperatures(T) {

    const len = T.length;
    const stack = [];
    const res = (new Array(len)).fill(0);

    for (let i = 0; i < len; i++) {
        while (stack.length && T[i] > T[stack[stack.length - 1]]) { //若栈不为0，且存在打破递减趋势的温度值
            const top = stack.pop() //将栈顶温度值对应的索引出栈  
            res[top] = i - top //计算当前栈顶温度值与第一个高于它的温度值 的索引差值 
        }
        stack.push(i) //注意栈里存的不是温度值，而是索引值，这是为了后面方便计算

    }

    return res;
}

const MinStack = function() {
    this.stack = []
};

MinStack.prototype.push = function(x) {
    this.stack.push(x)
};

MinStack.prototype.pop = function() {
    this.stack.pop()
};

MinStack.prototype.top = function() {
    if (!this.stack || !this.stack.length) {
        return
    }
    return this.stack[this.stack.length - 1]
};

//按照一次遍历的思路取最小值
MinStack.prototype.getMin = function() {
    let minValue = Infinity
    const { stack } = this
    for (let i = 0; i < stack.length; i++) {
        if (stack[i] < minValue) {
            minValue = stack[i]
        }
    }
    return minValue
};

const MinStack2 = function() {
    this.stack = [];
    // 定义辅助栈
    this.stack2 = [];
};

MinStack2.prototype.push = function(x) {
    this.stack.push(x);
    // 若入栈的值小于当前最小值，则推入辅助栈栈顶
    if (this.stack2.length == 0 || this.stack2[this.stack2.length - 1] >= x) {
        this.stack2.push(x);
    }
};

MinStack2.prototype.pop = function() {
    // 若出栈的值和当前最小值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
    if (this.stack.pop() == this.stack2[this.stack2.length - 1]) {
        this.stack2.pop();
    }
};

MinStack2.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

MinStack2.prototype.getMin = function() {
    // 辅助栈的栈顶，存的就是目标中的最小值
    return this.stack2[this.stack2.length - 1];
};

/* 
使用栈实现队列的下列操作：
push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。
*/

const MyQueue = function() {
    this.stack1 = [];
    this.stack2 = [];
}

MyQueue.prototype.push = function(x) {
    this.stack1.push(x);
};

MyQueue.prototype.pop = function() {
    if (this.stack2.length <= 0) { //假如 stack2 为空，需要将 stack1 的元素转移进来
        while (this.stack1.length !== 0) { //当 stack1 不为空时，出栈
            this.stack2.push(this.stack1.pop()); //将 stack1 出栈的元素推入 stack2
        }
    }
    return this.stack2.pop(); //为了达到逆序的目的，我们只从 stack2 里出栈元素
};

//这个方法和 pop 唯一的区别就是没有将定位到的值出栈
MyQueue.prototype.peek = function() {
    if (this.stack2.length <= 0) {
        while (this.stack1.length != 0) {
            this.stack2.push(this.stack1.pop());
        }
    }
    const stack2Len = this.stack2.length;
    return stack2Len && this.stack2[stack2Len - 1];
};


MyQueue.prototype.empty = function() {
    return !this.stack1.length && !this.stack2.length;
};

function maxSlidingWindow(nums, k) {
    const res = [];
    const len = nums.length;
    let left = 0,
        right = k - 1;

    while (right < len) {
        const max = calMax(nums, left, right);
        res.push(max);
        left++, right++;
    }

    return res;
}

function calMax(arr, left, right) {
    if (!arr || !arr.length) return;
    let maxNum = arr[left];
    for (let i = left; i <= right; i++)
        if (arr[i] > maxNum) maxNum = arr[i];
    return maxNum;
}

const arr = new Array(3).fill(new Array(3).fill(0)); //wrong case
const brr = new Array(3).fill(0).map(item => new Array(3).fill(0)); //right case