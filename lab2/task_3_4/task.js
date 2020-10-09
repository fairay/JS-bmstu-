"use strict";

// Дана вложенная структура файлов и папок. Все файлы имеют раширение "txt". 
// Необходимо рекурсивно перебрать вложенную структуру и вывести имена файлов, 
// у которых содержимое не превышает по длине 10 символов.

const fs = require("fs");

function lookup_folder(addr){
    if (!fs.existsSync(addr)) { return; }

    const file_arr = fs.readdirSync(addr);
    file_arr.forEach(f_name => { 
        let parts = f_name.split('.');
        
        if (parts.length == 1) {
            lookup_folder(addr+"\\"+f_name);
        } else {
            let str = fs.readFileSync(addr+"\\"+f_name, "utf-8");
            
            if (str.length <= 10) {
                console.log(addr+"\\"+f_name);
                console.log(str);
            }
        }
    });
}

lookup_folder(".");