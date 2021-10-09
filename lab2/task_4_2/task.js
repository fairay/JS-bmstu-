"use strict";

// Запустить сервер. На стороне сервера должен храниться файл, внутри которого находится JSON строка. 
// В этой JSON строке хранится информация о массиве объектов. Реализовать на сервере функцию, 
// которая принимает индекс и выдает содержимое ячейки массива по данному индексу. 
// Реализовать страницу с формой ввода для отправки запроса на сервер.

const fs = require("fs");
const express = require("express");

const app = express();
const port = 5015;
const query_page = "a.html"
app.listen(port);

app.get("/me/page", function(request, response) {
    const nameString = request.query.p;
    let contentString;
    if (fs.existsSync(query_page)) {
        contentString = fs.readFileSync(query_page, "utf8");    
    } else  {
        contentString = "Page is not available";    
    }
        
    response.end(contentString);
});

app.get("/show_i", function(request, response) {
    const jStr = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]);
    const i = parseInt(request.query.i);

    const obj = JSON.parse(jStr);
    let answer;
    
    if (typeof(obj) == 'object' && obj != null) {
        if (i < obj.length) {
            answer = "" + obj[i];
        } else {
            answer = "Index is out of array range";
        }
    } else {
        console.log(typeof(obj));
        answer = "JSON string doesn't contain an array";
    }
    
    response.end(answer);
});