"use strict";

const express = require("express");
const request = require("request");

const app = express();
const port = 5000;
app.listen(port);
console.log(`Web-interface server on port ${port}`);

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


app.get("/insert/car", function(request, response) {
    const name_ = request.query.name;
    const cost_ = request.query.cost;
    sendPost(car_addr + "/insert/record", JSON.stringify({
        name: name_,
        cost: cost_
    }), function(answerString) {
        response.end("Result: " + answerString);
    });
});

app.get("/insert/storage", function(request, response) {
    const name_ = request.query.name;
    const car_arr_ = request.query.car_arr;
    sendPost(storage_addr + "/insert/record", JSON.stringify({
        name: name_,
        car_arr: car_arr_
    }), function(answerString) {
        response.end("Result: " + answerString);
    });
});

app.get("/select/car", function(request, response) {
    const name_ = request.query.name;
    sendPost(car_addr + "/select/record", JSON.stringify(name_), function(answerString) {
        response.end(answerString);
    });
});


app.get("/select/storage", function(request, response) {
    const name_ = request.query.name;
    sendPost(storage_addr + "/select/record", JSON.stringify(name_), function(answerString) {
        response.end(answerString);
    });
});


// Jump to other pages
app.get("/show/insert/car", function(request, response) {
    response.render("in_car.hbs", null);
});
app.get("/show/select/car", function(request, response) {
    response.render("out_car.hbs", null);
});

app.get("/show/insert/storage", function(request, response) {
    sendPost(car_addr + "/select/all", "", function(answerString) {
        let obj = { car_arr: JSON.parse(answerString)}
        response.render("in_storage.hbs", obj);
    });    
});
app.get("/show/select/storage", function(request, response) {
    response.render("out_storage.hbs", null);
});
