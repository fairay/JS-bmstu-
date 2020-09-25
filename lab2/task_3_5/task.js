"use strict";

// С клавиатуры считывается число N. Далее считывается N строк - имена текстовых файлов.
// Необходимо склеить всё содержимое введенных файлов в одну большую строку и сохранить в новый файл.

const fs = require("fs");
const readlineSync = require('readline-sync');

let result_str = "";
const n = parseInt(readlineSync.question("Input N: "));

for (let i=0; i<n; i++){
    let f_name = readlineSync.question("Input file name: ");
    if (fs.existsSync(f_name)) {
        let str = fs.readFileSync(f_name, "utf-8");
        result_str += str;
    } else {
        console.log("File not exists");
    }
}

fs.writeFileSync("new.txt", result_str);
