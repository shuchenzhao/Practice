/*
 * @Author: zsc
 * @Date: 2022-04-03 14:21:49
 * @LastEditors: zsc
 * @LastEditTime: 2022-04-05 13:26:59
 * @Description: Dynamic Programming
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\动态规划.js
 */

/* 爬楼梯问题：需要 n 阶你到达楼顶，每次可以爬 1 或 2 个台阶，有多少种不同的方法可以爬到楼顶呢？ */
//递归+记忆化搜索：自顶向下
const f1 = [];

function climbStairs1(n) {
    if (n == 1) return 1;
    if (n == 2) return 2;
    if (f1[n] === undefined) f1[n] = climbStairs1(n - 1) + climbStairs1(n - 2);

    return f1[n];
}
//动态规划：自底向上
function climbStairs2(n) {
    const f2 = [];
    f2[1] = 1;
    f2[2] = 2;
    for (let i = 3; i <= n; i++)
        f2[i] = f2[i - 1] + f2[i - 2];
    return f2[n];
}

/* 凑钱问题：给定不同面额的硬币 coins 和一个总金额 amount。
编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1 */
//状态转移方程：f(n) = Math.min(f(n-c1)+1,f(n-c2)+1,f(n-c3)+1...f(n-cn)+1)
//递归边界条件：f[0]=0
function coinChange(coins, amount) {
    const f3 = [];
    f3[0] = 0;

    for (let i = 1; i <= amount; i++) { //遍历 [1, amount] 这个区间的硬币总额
        f3[i] = Infinity;
        for (let j = 0; j < coins.length; j++) //循环遍历每个可用硬币的面额
            if (i - coins[j] >= 0) //若硬币面额小于目标总额，则问题成立
                f3[i] = Math.min(f3[i], f3[i - coins[j]] + 1); //状态转移方程
    }

    if (f3[amount] === Infinity) return -1;
    return f3[amount];
}

const coins = [1, 2, 5];
let amount = 11;
//console.log(coinChange(coins, amount)); //输出: 3 解释: 11 = 5 + 5 + 1

/* 0/1背包 */