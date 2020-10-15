"use strict";

const express = require("express");
const fs = require("fs");

const app = express();
const port = 5003;
app.listen(port);
console.log("Server on port " + port);

const file_name = "A.txt";

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function get_file_arr(f_name) {
    let file_arr;
    if (fs.existsSync(f_name)) {
        const file_str = fs.readFileSync(f_name, "utf-8");
        if (file_str == "")
            file_arr = [];
        else
            file_arr = JSON.parse(file_str);
    } else {
        file_arr = [];
    }
    return file_arr;
}

function is_valid(car) {
    if (!car.name)  return false;
    if (!car.cost)  return false;
    return true;
}

function is_car_in(car_arr, car) {
    for (let i=0; i<car_arr.length; i++)
        if (car_arr[i].name == car.name)
            return true;
    return false;
}

function find_car(car_arr, name) {
    for (let i=0; i<car_arr.length; i++)
        if (car_arr[i].name == name)
            return car_arr[i];
    return null;
}


function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        let msg = "Car added";
        const obj = JSON.parse(body);

        let file_arr = get_file_arr(file_name);
        if (!is_car_in(file_arr, obj)) {
            file_arr.push(obj);
            fs.writeFileSync(file_name, JSON.stringify(file_arr));
        } else {
            msg = "Car allready in file";
        }

        response.end(msg);
    });
});

app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const car_name = JSON.parse(body);

        const file_str = fs.readFileSync(file_name, "utf-8");
        const file_arr = JSON.parse(file_str);
        let car = find_car(car_name);
        if (car === null)
            response.end();
        else
            response.end(JSON.stringify(car));
    });
});