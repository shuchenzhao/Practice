/*
 * @Author: zsc
 * @Date: 2022-03-28 15:15:59
 * @LastEditors: zsc
 * @LastEditTime: 2022-03-28 17:22:43
 * @Description: file content
 * @FilePath: \blogc:\Users\赵书晨\Desktop\Practice\demo\JS\3.28.js
 */
/* 
//promise1
const isPregnant = false;

const promise = new Promise((resolve, reject) => {
    if (isPregnant) {
        resolve(`孩子他爹`);
    } else {
        reject(`老公`);
    }
});

promise
    .then(name => {
        console.log(`男人成为了${name}!`);
    })
    .catch(name => {
        console.log(`男人成为了${name}!`);
    })
    .finally(() => {
        console.log(`男人和女人最终结婚了！`);
    });

//promise2
const imgAddress = "...";

const imgPromise = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            resolve(img);
        };
        img.onerror = () => {
            reject(new Error("图片有误"));
        };
    });
};

imgPromise(imgAddress)
    .then(img => {
        document.body.appendChild(img);
    })
    .catch(err => {
        decodeURIComponent.body.innerHTML = err;
    });
*/


//generator
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

let generator = generateSequence();
//console.log(generator.next());
//console.log(generator.next());
//console.log(generator.next());
//console.log(generator.next());
for (let value of generator) {
    console.log(value); //1,2,done为true时会忽略最后一个
}

function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

let sequence = [0, ...generateSequence()]; //iterable,故可调用spread语法
console.log(sequence); // 0, 1, 2, 3