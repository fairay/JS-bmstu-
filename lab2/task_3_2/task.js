"use strict";

// Необходимо считать содержимое файла, в котором хранится массив строк в формате JSON. 
// Нужно вывести только те строки на экран, в которых содержатся только гласные буквы.

const vowles = "AEIOU"
const fs = require("fs");
const nameString = "test.txt";

const str = fs.readFileSync(nameString, "utf-8");
console.log("Scaned string: " + str);

console.log("Vowles strings:");
let data = JSON.parse(str);

for (let i in data) {
    let str = data[i].toUpperCase();
    let j=0;
    for (; j < str.length; j++) {
        if (!(vowles.includes(str[j])))
            break;
    }

    if (j == str.length)
        console.log(data[i]);
}