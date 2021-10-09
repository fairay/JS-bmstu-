"use strict";

// Запустить сервер. Реализовать на сервере функцию, которая принимает на вход числа A, B и C. 
// Функция должна выдавать массив целых чисел на отрезке от A до B, которые делятся на C нацело.

const fs = require("fs");
const express = require("express");

const app = express();
const port = 5015;
const query_page = "a.html"
app.listen(port);
console.log("Server is running");

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

app.get("/show/interval", function(request, response) {
    const a = parseInt(request.query.a);
    const b = parseInt(request.query.b);
    const c = parseInt(request.query.c);
    let answer;

    console.log(a, b, c);
    if (a == NaN || b == NaN || c == NaN) {
        answer = "Incorrect input";
    } else if (a > b) {
        answer = "Incorrect range";
    } else if (c < 1) {
        answer = "Incorrect c value";
    } else {
        let arr = []
        console.log(a / c);
        let i = parseInt(a / c) * c;
        if (i < a)  i += c;
        console.log(i);
        for (; i <= b; i += c)
            arr.push(i);
        console.log(arr);

        answer = "Array: " + JSON.stringify(arr);
    }
    
    response.end(answer);
});