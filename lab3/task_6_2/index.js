"use strict";

let userArr = [];
function userPos(login_) {
    for (let i=0; i<userArr.length; i++)
        if (userArr[i].login == login_)
            return i;
    return -1;
}
function addUser(login_, password_, hobby_, age_) {        
    if (age_ <= 0 || password_.length == 0 || !login_)
        return;
    if (userPos(login_) != -1)
        return;

    let user = {
        login: login_,
        password: password_,
        hobby: hobby_,
        age: age_
    };
    userArr.push(user);
}
function fillUserArr(){
    addUser("$Kekotic_2000$", "dumb_password", "Манная каша", 20);
    addUser("Martin", "1221", "Радужные покатушки", 13);
    addUser("Void", "0000", "Спать по 12 часов", 21);
}
fillUserArr();
console.log(userArr);


const express = require("express");
const cookieSession = require("cookie-session");

const app = express();
const port = 5000;
let server = app.listen(port);
console.log(`Server on port ${port}`);

app.use(cookieSession({
    login: '',
    password: '',
    keys: ['hhh', 'qqq', 'vvv']
}));

app.set("view engine", "hbs");
const way = __dirname + "/static";
app.use(express.static(way));


app.get("/api/save", function(request, response) {
    const login = request.query.login;
    const password = request.query.password;

    if(!login) return response.end("Input login");
    if(!password) return response.end("Input password");
    
    let i = userPos(login);
    if (i != -1) {
        if (userArr[i].password != password)
            return response.end(`Wrong password`);
    } else
        return response.end(`No user "${login}" in users list`);

    request.session.login = login;
    request.session.password = password;
    response.end();
});

app.get("/api/get", function(request, response) {
    response.end(JSON.stringify(request.session));
})

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


app.get("/show_me", function(request, response) {
    const login = request.session.login;
    const password = request.session.password;

    let i = userPos(login);
    if (i != -1) {
        if (userArr[i].password != password)
            return response.end(`Wrong password`);
    } else
        return response.end(`No user "${login}" in users list`);
    
    let info = {
        login: userArr[i].login,
        hobby: userArr[i].hobby,
        age: userArr[i].age
    }
    response.render("pageUser.hbs", info);
});


app.get("/shut_down", function(request, response) {
    response.end("Server closed");
    server.close();
});
