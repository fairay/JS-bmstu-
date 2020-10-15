"use strict";

const express = require("express");
const request = require("request");

const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/static";
app.use(express.static(way));
app.set("view engine", "hbs");

const car_addr = "http://localhost:5003";
const storage_addr = "http://localhost:5002";

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function sendPost(url, body, callback) {
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";

    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

app.get("/insert/storage", function(request, response) {
    // const a = request.query.a;
    // const b = request.query.b;
    // sendPost(storage_addr + "/insert/record", JSON.stringify({
    //     x: a,
    //     y: b
    // }), function(answerString) {
    //     const answerObject = JSON.parse(answerString);
    //     const answer = answerObject.answer;
    //     response.end("Answer: " + answer);
    // });
});

app.get("/insert/car", function(request, response) {
    const name_ = request.query.name;
    const cost_ = request.query.cost;
    sendPost(car_addr + "/insert/record", JSON.stringify({
        name: name_,
        cost: cost_
    }), function(answerString) {
        // const answerObject = JSON.parse(answerString);
        // const answer = answerObject.answer;
        response.end("Result: " + answerString);
    });
});


// Jump to other pages
app.get("/show/insert/car", function(request, response) {
    response.render("in_car.hbs", null);
});
