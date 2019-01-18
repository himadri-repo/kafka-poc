//jshint esversion: 6
/*jshint -W030, -W033, -W097, -W117*/

"use strict" 

function* getValue() {
    let data = 'I am not sure';
    let data1 = yield "This is first statement";
    let data2 = yield "This is second statement";

    return `${data1} is the first and here you go with second statement ${data2}`;
}

const fn = getValue();

// let i=0;
// for (const key of fn) {
//     console.log(`${++i} => ${key}`)
// }


console.log(`1. => ${JSON.stringify(fn.next())}`);
console.log(`2. => ${JSON.stringify(fn.next('Himadri'))}`);
console.log(`3. => ${JSON.stringify(fn.next('Majumdar'))}`);