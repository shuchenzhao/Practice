/*
 * @Author: zsc
 * @Date: 2022-03-27 17:14:55
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-28 15:19:33
 * @Description: Promise，防抖，节流，倒计时
 * @FilePath: \blogc:\Users\赵书晨\Desktop\Practice\demo\JS\3.27.js
 */

//原生Promise
console.log("第一步");

let promise = new Promise((resolve, reject) => {
    console.log("第二步");
    resolve("这次一定");
    //reject("下次一定");
});

promise.then(
    result => { console.log(result) },
    result => { console.log(result.message) }
);

console.log("第三步");

//手写Promise
class Commitment {
    static PENDING = "待定";
    static FULLFILLED = "成功";
    static REJECTED = "拒绝";
    constructor(func) {
        this.status = Commitment.PENDING;
        this.result = null;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        try {
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(result) {
        setTimeout(() => {
            if (this.status === Commitment.PENDING) {
                this.status = Commitment.FULLFILLED;
                this.result = result;
                this.resolveCallbacks.forEach(callback => {
                    callback(result)
                });
            }
        });
    }
    reject(result) {
        setTimeout(() => {
            if (this.status === Commitment.PENDING) {
                this.status = Commitment.REJECTED;
                this.result = result;
                this.rejectCallbacks.forEach(callback => {
                    callback(result)
                });
            }
        })
    }
    then(onFULLFILLED, onREJECTED) {
        return new Commitment((resolve, reject) => {
            onFULLFILLED = typeof onFULLFILLED === "function" ? onFULLFILLED : () => {};
            onREJECTED = typeof onREJECTED === "function" ? onREJECTED : () => {};
            if (this.status === Commitment.PENDING) {
                this.resolveCallbacks.push(onFULLFILLED);
                this.rejectCallbacks.push(onREJECTED);
            }
            if (this.status === Commitment.FULLFILLED) {
                setTimeout(() => {
                    onFULLFILLED(this.result);
                });
            }
            if (this.status === Commitment.REJECTED) {
                setTimeout(() => {
                    onREJECTED(this.resulve);
                });
            }
        });
    }
}

console.log("第一步");
let commitment = new Commitment((resolve, reject) => {
    console.log("第一步");
    //throw new Error("白嫖失败");
    resolve("这次一定");
});
commitment.then(
    result => { console.log(result) },
    result => { console.log(result.message) }
);
console.log("第一步");

//防抖
const button = document.querySelector("input");

function payMoney() {
    console.log("已剁");
    console.log(this);
}

function debounce(func, delay) {
    let timer; //在外围定义，这样多个任务才可以通过闭包的形式对这个变量进行操作
    return function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            func();
        }, delay);
    }
}

//节流
function coloring() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    document.write.body.style.background = `rgb(${r},${g},${b})`;
}

function throttle(func, delay) {
    let timer;
    return function() {
        let context = this;
        let args = arguments;
        if (timer) return;
        timer = setTimeout(function() {
            func.apply(context, args);
            timer = null;
        }, delay);
    }
}

function throttle2(func, delay) {
    let pre = 0;
    return function() {
        let now = new Date();
        let context = this;
        let args = arguments;
        if (now - pre > delay) {
            func.apply(context, args);
            pre = now;
        }
    }
}

window.addEventListener("resize", throttle(coloring, 2000));
window.addEventListener("resize", throttle(coloring, 2000));

//倒计时
/* 
<section>
    <span class="daySpan"></span>
    <span class="hourSpan"></span>
    <span class="minuteSpan"></span>
    <span class="secondSpan"></span>
</section>
*/
const daySpan = document.querySelector(".daySpan"),
    hourSpan = document.querySelector(".hourSpan"),
    minuteSpan = document.querySelector(".minuteSpan"),
    secondSpan = document.querySelector(".secondSpan"),
    deadline = new Date("2022-3-27 21:05");

function countdown() {
    const now = new Date(),
        timeRemainning = deadline - now;
    let day, hour, minute, second;
    if (timeRemainning < 0) return 0;

    second = Math.floor(timeRemainning / 1000 % 60);
    minute = Math.floor(timeRemainning / 1000 / 60 % 60);
    hour = MAth.floor(timeRemainning / 1000 / 60 / 60 % 24);
    day = Math.floor(timeRemainning / 1000 / 60 / 60 / 24);

    daySpan.innerHTML = day + "天";
    hourSpan.innerHTML = hour + "时";
    minuteSpan.innerHTML = minute + "分";
    secondSpan.innerHTML = second + "秒";

    setTimeout(countdown, 1000);
}

countdown();