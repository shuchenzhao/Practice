/*
 * @Author: zsc
 * @Date: 2022-04-11 14:44:37
 * @LastEditors: zsc
 * @LastEditTime: 2022-04-11 14:44:38
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\算法\第四次上机\n皇后.js
 */
/* 0-1背包 */
var c = 100; // 背包最大容量
var n = 5; // 代表有5个物品
var w = [10, 20, 30, 40, 60]; //代表5个物品的重量
var v = [20, 30, 65, 40, 60]; //代表5个物品的价值
var path = []; // 来记录树中的移动路径，为1的时候表示选择该数据，为0表示不选择
var maxvalue = 0; // 背包的最大权重值
function search(i) { // 表示递归深度
    if (i >= n) {
        checkMax(); //检查最大值
    } else {
        path[i] = 0;
        search(i + 1);
        path[i] = 1;
        search(i + 1);
    }
}

function checkMax() {
    var weight = 0,
        value = 0;
    for (var i = 0; i < n; i++) {
        if (path[i] == 1) {
            weight += w[i];
            value += v[i];
        } else {
            path[i] == 0;
        }
    }
    if (weight <= c) { // 判断是否达到上限
        if (value >= maxvalue) {
            maxvalue = value;
            console.log(maxvalue);
            console.log(path);
        }
    }
}
search(0);

/* N皇后 */

const solveNQueens = (n) => {
    const board = new Array(n);
    for (let i = 0; i < n; i++) {
        board[i] = new Array(n).fill('.'); //生成board
    }

    const cols = new Set(); // 列集，记录出现过皇后的列
    const diag1 = new Set(); // 正对角线集
    const diag2 = new Set(); // 反对角线集
    const res = []; //结果数组

    const backtrack = (row) => {
        if (row == n) { //终止条件
            const stringsBoard = board.slice();
            for (let i = 0; i < n; i++) { //生成字符串
                stringsBoard[i] = stringsBoard[i].join('');
            }
            res.push(stringsBoard);
            return;
        }
        for (let col = 0; col < n; col++) {
            // 如果当前点的所在的列，所在的对角线都没有皇后，即可选择，否则，跳过
            if (!cols.has(col) && !diag1.has(row + col) && !diag2.has(row - col)) {
                board[row][col] = 'Q'; // 放置皇后
                cols.add(col); // 记录放了皇后的列
                diag2.add(row - col); // 记录放了皇后的正对角线
                diag1.add(row + col); // 记录放了皇后的负对角线
                backtrack(row + 1);
                board[row][col] = '.'; // 撤销该点的皇后
                cols.delete(col); // 对应的记录也删一下
                diag2.delete(row - col);
                diag1.delete(row + col);
            }
        }
    };
    backtrack(0);
    return res;
};

console.log(8);