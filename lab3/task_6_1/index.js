"use strict";

const gameArr = [];
function addGame(name_, desr_, limit_) {
    if (limit_ < 0)
        return;
        
    let game = {
        name: name_,
        description: desr_,
        age_limit: limit_
    };
    gameArr.push(game);
}
function fillGameArr(){
    addGame("LocoRoco", "Платформер, аркада и головоломка с оригинальными графическими решениями", 0);
    addGame("Crash Bandicoot", "Woah!", 6);
    addGame("Baldur's Gate 3", "Заставляют убивать людей, полуросликов и танцевать нагишом, кошмар", 17);
    addGame("Gulman 5", "Gulman - герой, Superman - нет", 16);
    addGame("Pretty Neko", "Оно того не стоит, не лезь", 21);
    addGame("Pretty Angel", "см. описание Pretty Neko", 21);
    addGame("Dota 2", "2 sides, 3 lines, 100 hours", 16);
}

function getGames(age) {
    let ansArr = [];
    for (let i=0; i < gameArr.length; i++)
        if (gameArr[i].age_limit <= age)
            ansArr.push(gameArr[i]);
    return ansArr;
}




const { request } = require("express");
const express = require("express");
const app = express();
const port = 5000;
let server = app.listen(port);
console.log(`Server on port ${port}`);

app.set("view engine", "hbs");
const way = __dirname + "/static";
app.use(express.static(way));

fillGameArr();

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


// выдача страницы с массивом учеников
app.get("/show_games", function(request, response) {
    const age = request.query.age;
    let info = {
        ageValue: age,
        gameArr: getGames(age)
    }
    response.render("pageGames.hbs", info);
});


app.get("/shut_down", function(request, response) {
    response.end("Server closed");
    server.close();
});
