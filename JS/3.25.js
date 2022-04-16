/*
 * @Author: zsc
 * @Date: 2022-03-25 14:12:23
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-26 14:23:30
 * @Description: file content
 * @FilePath: \undefinedc:\Users\赵书晨\Desktop\Practice\demo\JS\3.25.js
 */

//don't use eval anyway,use window.Function instead
function looseJsonParse(obj) {
    return eval("(" + obj + ")");
}
console.log(looseJsonParse(
    "{a:(4-1), b:function(){}, c:new Date()}"
))

//setInterval是隔一段时间将任务加入到任务队列（不一定立即执行），而setTimeout是定期执行，这里用setTimeout模拟setInterval
function newInterval(func, millisecond) {
    function inside() {
        func();
        setTimeout(inside, millisecond);
    }
    //inside(); //这样写的话output函数不会作为回调函数加入任务队列，而是在执行栈里执行了output函数
    setTimeout(inside, millisecond); //这样更符合原本的概念
}

function output() {
    console.log("this is an output");
}

newInterval(output, 1000);

//currying
//第一个应用：参数复用
function uri_currying(protocol) {
    return function(hostname, pathname) {
        return `${ protocol }${hostname}${pathname}`;
    }
}
const uri_https = uri_currying("https://");
console.log(uri_https);
const uri1 = uri_https("www.one.com", "/one");;
console.log(uri1);
//第二个应用：兼容性检测
const whichEvent = (function() {
    if (window.addEventListener) {
        return function(element, type, listener, useCapture) {
            element.addEventListener(type, function(e) {
                listener.call(element, e);
            }, useCapture);
        }
    } else if (window.attachEvent) {
        return function(element, type, handler) {
            element,
            attachEvent("on" + type, function(e) {
                handler.call(element, e);
            });
        }
    }
})();
//第三个应用：延迟执行（改进参数复用）
function add() {
    //let args = arguments;//arguments是对象，会导致args不是数组，没有push方法
    let args = Array.prototype.slice.call(arguments);
    let inner = function() {
        args.push(...arguments);
        return inner;
    }

    inner.toString = function() {
        return args.reduce(function(prev, cur) {
            return prev + cur;
        });
    };

    return inner;
}
console.log(add(1)(2)(3));

const list = [{ value: 1 }];
const listcopy = [...list]; //浅拷贝
//const listcopy = JSON.parse(JSON.stringify(list)); //深拷贝
listcopy[0].value = 2;
console.log(list, listcopy);