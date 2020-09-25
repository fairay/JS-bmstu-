"use strict";

// Из файла считывается строка в формате JSON. В этой строке информация об объекте, в котором находится 
// большое количество вложенных друг в друга полей. Объект представляет из себя дерево. 
// Необходимо рекурсивно обработать дерево и найти максимальную вложенность в дереве. 
// Необходимо вывести на экран ветку с максимальной вложенностью.

const fs = require("fs");
const f_name = "json-data.txt";

function create_file() {
    const probability = 0.53;
    class Box {
        constructor (depth) {
            this.d = depth;
            this.leaf1 = NaN;
            this.leaf2 = NaN;
            if (Math.random() > 1 - probability)
                this.leaf1 = new Box(depth+1);
            if (Math.random() > 1 - probability)
                this.leaf2 = new Box(depth+1);
        }
    }

    let b = new Box(0);
    let jStr = JSON.stringify(b);
    console.log(jStr);
    fs.writeFileSync(f_name, jStr);
}



function path_lenght(path) {
    return (path.match(new RegExp("/", "g")) || []).length
}

function process_tree(tree) {
    let path = "";
    for (let key in tree) {
        if (typeof(tree[key]) == "object" && tree[key] != null) {
            let t_path = key + "/" + process_tree(tree[key]);
            if (path_lenght(t_path) > path_lenght(path))
                path = t_path;
        }
    }
    return path;
}

// create_file();

let jStr = fs.readFileSync(f_name, "utf-8");
console.log("Scaned JSON-data: " + jStr);

let original_tree = JSON.parse(jStr);
let path = process_tree(original_tree);
let path_l = path_lenght(path);

console.log("\n\nPath: " + path.slice(0, path.length-1));
console.log("Length: " + path_l);
