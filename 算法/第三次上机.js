/*
 * @Author: zsc
 * @Date: 2022-04-05 15:55:58
 * @LastEditors: zsc
 * @LastEditTime: 2022-04-07 18:12:18
 * @Description: 贪心和图：背包、调度、单源最短路径、全部最短路径
 * @FilePath: \vuec:\Users\赵书晨\Desktop\算法\第三次上机.js
 */

/* Knapsack Problem */
function fractional(n, c, weight, value) {
    let res = 0;
    let v = c; //v为背包剩余容量

    let arr = [];
    for (let i = 0; i < n; i++)
        arr.push([value[i], weight[i], value[i] / weight[i]]);
    arr.sort((a, b) => b[2] - a[2]);

    for (let i = 0; i < n; i++) {
        if (arr[i][1] <= v) {
            v -= arr[i][1];
            res += arr[i][0];
        } else {
            res += v * arr[i][2];
            break;
        }
    }

    return res;
}

function knapsack01(n, c, weight, value) {
    const dp = (new Array(c + 1)).fill(0);
    let res = -Infinity;

    //滚动数组，通过倒着遍历v的方法来实现数组的滚动更新，优化空间复杂度
    for (let i = 1; i <= n; i++) {
        /* 
        for(let v=w[i]; v<=c;v++) 
            dp[i][v] = Math.max(dp[i-1][v], dp[i-1][v-w[i]]+value[i])
        当我们计算出 dp[i][v] 的值以后，dp[i-1][v-w[i]]可能还会在以后的计算中用到，但dp[i-1][v]其实已经完全用不到了。
        因为dp[i][v]已经求解出来了，对于 i 这个索引来说只需要求解 dp[i][v-1]到dp[i][w[i]] 之间的值。
        */
        for (let v = c; v >= weight[i]; v--) { //v为当前背包内物品的总体积
            dp[v] = Math.max(dp[v], dp[v - weight[i]] + value[i]);
            if (dp[v] > res) res = dp[v];
        }
    }

    return res;
}

let n = 5; //物品个数
let c = 100; //背包容量上限
let weight = [10, 20, 30, 40, 50];
let value = [20, 30, 65, 40, 60];
console.log(fractional(n, c, weight, value)); //163
console.log(knapsack01(n, c, weight, value)); //155

/* --------------------------------------------------------------------------------------------------------------- */

/* Scheduling Problem */
function SJF(jobs) {
    let time = 0;
    jobs.sort((a, b) => {
        if (a[1] === b[1]) return a[0] - b[0]; //到达时间相同，则短作业优先
        else return a[1] - b[1]; //非抢占式，故先来先服务
    });
    console.log(jobs);

    for (let i = 0; i < jobs.length; i++) {
        time += jobs[i][0];
        if (jobs[i + 1] && time < jobs[i + 1][1]) //如果上一个任务做完时下一个还没来
            time = jobs[i + 1][1];
    }
    let avgComplete = time / jobs.length;

    return avgComplete;
}

let jobs = [
    [15, 0],
    [8, 3],
    [3, 50],
    [10, 3],
    [3, 1]
]; //need time, arrive time
console.log(SJF(jobs)); //[ 15, 0 ], [ 3, 1 ], [ 8, 3 ], [ 10, 3 ], [ 3, 50 ] => 53/5=10.6

/* --------------------------------------------------------------------------------------------------------------- */

/* Single-source shortest paths */
function Vertex() {
    if (!(this instanceof Vertex))
        return new Vertex();
    this.id = null; //用来标识节点
}

function Edge() {
    if (!(this instanceof Edge))
        return new Edge();
    this.u = null; //边的起点节点
    this.v = null; //边的终点节点
    this.w = null; //边的权重
}

function Graph() {
    if (!(this instanceof Graph))
        return new Graph();
    this.vertices = []; //图的节点集
    this.edges = []; //图的边集
    this.refer = new Map(); //节点标识表
}
Graph.prototype = {
    constructor: Graph,
    initVertices: function(vs) {
        for (let id of vs) {
            let v = Vertex();
            v.id = id;
            this.refer.set(id, v);
            this.vertices.push(v);
        }
    },
    initEdges: function(es) {
        for (let r of es) {
            let e = Edge();
            e.u = this.refer.get(r.u);
            e.v = this.refer.get(r.v);
            e.w = r.w;
            this.edges.push(e);
        }
    }
}

function BellmanFord(vertices, edges, source) {
    let distance = new Map(); //用来记录从原节点 source 到某个节点的最短路径估计值
    let predecessor = new Map(); //用来记录某个节点的前驱节点

    // 第一步: 初始化图
    for (let v of vertices) {
        distance.set(v, Infinity); // 初始化最短估计距离 默认无穷大
        predecessor.set(v, null); // 初始化前驱节点 默认为空
    }
    distance.set(source, 0); // 将源节点的最短路径估计距离 初始化为0

    // 第二步: 重复松弛边
    for (let i = 1, len = vertices.length - 1; i < len; i++) {
        for (let e of edges) {
            if (distance.get(e.u) + e.w < distance.get(e.v)) {
                distance.set(e.v, distance.get(e.u) + e.w);
                predecessor.set(e.v, e.u);
            }
        }
    }

    // 第三步: 检查是否有负权回路 第三步必须在第二步后面
    for (let e of edges) {
        if (distance.get(e.u) + e.w < distance.get(e.v))
            return null; //返回null表示包涵负权回路
    }

    return {
        distance: distance,
        predecessor: predecessor
    }
}
var vertices = ["a", "b", "c", "d", "e"];
var edges = [
    { u: "a", v: "b", w: -1 },
    { u: "a", v: "c", w: 4 },
    { u: "b", v: "c", w: 3 },
    { u: "b", v: "d", w: 2 },
    { u: "b", v: "e", w: 2 },
    { u: "d", v: "c", w: 5 },
    { u: "e", v: "d", w: -3 }
];

var g = Graph();
g.initVertices(vertices);
g.initEdges(edges);

console.log(BellmanFord(g.vertices, g.edges, g.vertices[0]));

/* --------------------------------------------------------------------------------------------------------------- */

/* All-pairs shortest paths */
let A = [
    [0, -1, 4, Infinity, Infinity],
    [Infinity, 0, 3, 2, 2],
    [Infinity, Infinity, 0, Infinity, Infinity],
    [1, 5, Infinity, 0, Infinity],
    [Infinity, Infinity, -3, Infinity, 0]
]; //邻接矩阵
let numVertexes = 5; //结点数
let numEdges = 7; //边数

function MGraph() {
    this.vexs = []; //顶点表
    this.arc = []; //邻接矩阵，可看作边表
    this.numVertexes = null;
    this.numEdges = null;
}
let G = new MGraph();

function createMGraph() {
    G.numVertexes = numVertexes;
    G.numEdges = numEdges;

    for (let i = 0; i < G.numVertexes; i++)
        G.vexs[i] = 'V' + i; //录入顶点信息
    console.log(G.vexs);

    //邻接矩阵初始化
    for (let i = 0; i < G.numVertexes; i++) {
        G.arc[i] = [];
        for (j = 0; j < G.numVertexes; j++)
            G.arc[i][j] = A[i][j]; //INFINITY; 
    }
    console.log(G.arc);
}

let Pathmatirx = []; //二维数组 表示顶点到顶点的最短路径权值和的矩阵
let ShortPathTable = []; //二维数组 表示对应顶点的最小路径的前驱矩阵

function Floyd() {
    let w, k;
    for (let v = 0; v < G.numVertexes; ++v) { //初始化 Pathmatirx ShortPathTable
        Pathmatirx[v] = [];
        ShortPathTable[v] = [];
        for (let w = 0; w < G.numVertexes; ++w) {
            ShortPathTable[v][w] = G.arc[v][w];
            Pathmatirx[v][w] = w;
        }
    }

    for (let k = 0; k < G.numVertexes; ++k) {
        for (let v = 0; v < G.numVertexes; ++v) {
            for (let w = 0; w < G.numVertexes; ++w) {
                if (ShortPathTable[v][w] > (ShortPathTable[v][k] + ShortPathTable[k][w])) {
                    //如果经过下标为k顶点路径比原两点间路径更短，当前两点间权值设为更小的一个
                    ShortPathTable[v][w] = ShortPathTable[v][k] + ShortPathTable[k][w];
                    Pathmatirx[v][w] = Pathmatirx[v][k]; //路径设置经过下标为k的顶点
                }
            }
        }
    }
}

function PrintAll() {
    for (let v = 0; v < G.numVertexes; ++v) {
        for (let w = v + 1; w < G.numVertexes; w++) {
            console.log('V%d-V%d weight: %d', v, w, ShortPathTable[v][w]);
            k = Pathmatirx[v][w];
            console.log(' Path: %d', v);
            while (k != w) {
                console.log(' -> %d', k);
                k = Pathmatirx[k][w];
            }
            console.log(' -> %d', w);
        }
    }
}

createMGraph();
Floyd();
PrintAll();