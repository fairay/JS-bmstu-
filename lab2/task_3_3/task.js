"use strict";

// С клавиатуры считывается строка - название расширения файлов. 
// Далее считывается строка - адрес папки. Необходимо перебрать все файлы в папке и вывести содержимое файлов,
// у которых расширение совпадает с введенным расширением.

const readlineSync = require('readline-sync');
const fs = require("fs");
const ext = readlineSync.question("Input file extension: ");
const addr = readlineSync.question("Input folder addres: ");

if (fs.existsSync(addr)) {
    const file_arr = fs.readdirSync(addr);

    file_arr.forEach(f_name => { 
        let parts = f_name.split('.');
        if (parts[parts.length-1] == ext) {
            console.log(f_name + ":");
            
            let str = fs.readFileSync(addr+"\\"+f_name, "utf-8");
            if (str == "") {
                console.log("Empty file");
            } else {
                console.log(str);
            }
        }    
    });
} else {
    console.log("Folder not exists");
}
