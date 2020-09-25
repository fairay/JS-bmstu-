"use strict";

// С клавиатуры считывается строка - название расширения файлов. 
// Далее считывается строка - адрес папки. Необходимо перебрать все файлы в папке и вывести содержимое файлов,
// у которых расширение совпадает с введенным расширением.

const readlineSync = require('readline-sync');
const fs = require("fs");
const ext = readlineSync.question("Input file extension: ");
const addr = readlineSync.question("Input folder addres: ");

const file_arr = fs.readdirSync(addr);
file_arr.forEach(element => {
    console.log(element);
});