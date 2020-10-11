"use strict";

// Создать сервер. Сервер должен выдавать страницу с тремя текстовыми полями и кнопкой. В поля ввода вбивается
// информация о почте, фамилии и номере телефона человека. При нажатии на кнопку "Отправить" введённая информация
// должна отправляться с помощью POST запроса на сервер и добавляться к концу файла (в файле накапливается 
// информация). При этом на стороне сервера должна происходить проверка: являются ли почта и телефон уникальными.
// Если они уникальны, то идёт добавление информации в файл. В противном случае добавление не происходит. 
// При отправке ответа с сервера клиенту должно приходить сообщение с информацией о результате добавления
// (добавилось или не добавилось). Результат операции должен отображаться на странице.

const express = require("express");
const fs = require("fs");
const file_name = "users.txt"

const app = express();
const port = 5000;
let server = app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


function get_f_arr(f_name)
{
    let f_arr;
        if (fs.existsSync(f_name)) {
            const f_str = fs.readFileSync(f_name, "utf-8");
            if (f_str === "")
                f_arr = [];
            else
                f_arr = JSON.parse(f_str);
        } else {
            f_arr = [];
        }
    return f_arr
}

function search_email(email) {
    let obj = null;
    const f_arr = get_f_arr(file_name);
    for (let i=0; i<f_arr.length && !obj; i++) {
        if (f_arr[i].email == email) 
            obj = f_arr[i];
    }
    return obj;
}

// body
function loadBody(request, callback) {
    let body = [];
    console.log(body);
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        let f_arr = get_f_arr(file_name);
        
        let cont_flag = false;
        for (let i=0; i<f_arr.length && !cont_flag; i++) {
            if (f_arr[i].email == obj.email)
                cont_flag = true;
            else if (f_arr[i].phone == obj.phone)
                cont_flag = true;
        }

        let msg;
        if (cont_flag) {
            msg = "Entry didn't added";
        } else {
            msg = "Entry added";
            f_arr.push(obj);
            fs.writeFileSync(file_name, JSON.stringify(f_arr));
        }

        response.end(JSON.stringify({ result: msg }));
    });
});

app.get("/search", function(request, response) {
    const email = request.query.email;
    const res_obj = search_email(email);
    let answer = {is_found : true, obj:res_obj};
    if (res_obj === null)
        answer.is_found = false;
    
    response.end(JSON.stringify(answer));
});

app.get("/shut_down", function(request, response) {
    console.log("Go to sleep");
    response.end("Server closed");
    server.close();
});
