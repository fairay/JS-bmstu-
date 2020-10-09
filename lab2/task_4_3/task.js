"use strict";

// Написать программу, которая на вход получает массив названий полей и адрес запроса (куда отправлять). 
// Программа должна генерировать HTML разметку страницы, в которую встроена форма для отправки запроса.

const readlineSync  = require('readline-sync');
const fs = require('fs');
const express = require('express');
const html_name = 'gen.html';

function html_str(addr, field_arr) {
    let s = "";

    s += 
'<!DOCTYPE html>\n\
<html>\n\
<head>\n\
    <meta charset="UTF-8">\n\
    <title>Страница A</title>\n\
</head>\n';

    s += 
'<body>\n\
    <h1>Сгенерированное поле запроса</h1>\n\
    <form method="GET" action="' + addr + '">\n';
    
    for (let i=0; i < field_arr.length; i++) {
        s += '\t<p>' + field_arr[i] + '</p>\n\
    <input name="' + field_arr[i] + '" spellcheck="false" autocomplete="off">\n';
    }

    s += '\t<input type="submit" value="Отправить запрос">\n\
    </form>\n\
</body>\n\
</html>';

    return s;
}

function generate_html(addr, field_arr) {
    const hStr = html_str(addr, field_arr);
    console.log(hStr);

    fs.writeFileSync(html_name, hStr);
}

function show_html() {
    const app = express();
    const port = 5015;
    app.listen(port);

    app.get('/me/page', function(request, response) { 
        let contentString;
        if (fs.existsSync(html_name)) {
            contentString = fs.readFileSync(html_name, "utf8");    
        } else  {
            contentString = "Page is not available";    
        }
    response.end(contentString);
    });
}

const req_addr = readlineSync.question("Input addres: ")
const field_arr = readlineSync.question("Input fields (separated with ,): ").split(", ");

generate_html(req_addr, field_arr);
show_html();

// В чём различие между многпоточностью и асинхронностью
// Что эффективнее многпоточность или асинхронность?

