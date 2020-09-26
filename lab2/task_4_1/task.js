"use strict";
// Запустить сервер. Реализовать на сервере функцию для сравнения трёх чисел и выдачи наибольшего из них. 
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

app.get("/calculate/sum", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;

    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);

    let answer;
    if (aInt != NaN && bInt != NaN && cInt != NaN) {
        const sInt = Math.max(aInt, bInt, cInt);
        answer = "Max number: " + sInt;
    } else {
        answer = "Incorrect input";
    }
    
    response.end(answer);
});