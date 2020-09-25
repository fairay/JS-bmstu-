"use strict";

// С клавиатуры считывается число N. Далее считывается N строк. 
// Необходимо создать массив и сохранять в него строки только с четной длинной. 
// Получившийся массив необходимо преобразовать в строку JSON и сохранить в файл.


const readlineSync = require('readline-sync');
const fs = require("fs");
const nameString = "test.txt";

const n = parseInt(readlineSync.question("Input N: "));
let data = [];

for (let i=0; i < n; i++) {
    let str = readlineSync.question("Input string: ");
    if (str.length % 2 == 0) {
        data.push(str);
    }
}

console.log(data);
let parse_data = JSON.stringify(data);
console.log(parse_data);

fs.writeFileSync(nameString, parse_data);