"use strict";

const express = require("express");
const fs = require("fs");

const app = express();
const port = 5002;
app.listen(port);
console.log("Storage server on port " + port);

const file_name = "B.txt";

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

function is_valid(storage) {
    if (!storage.name)  return false;
    if (!storage.car_arr)  return false;
    return true;
}

function is_storage_in(storage_arr, storage) {
    for (let i=0; i<storage_arr.length; i++)
        if (storage_arr[i].name == storage.name)
            return true;
    return false;
}

function find_storage(storage_arr, name) {
    for (let i=0; i<storage_arr.length; i++)
        if (storage_arr[i].name == name)
            return storage_arr[i];
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
        let msg = "Storage added";
        const obj = JSON.parse(body);

        let file_arr = get_file_arr(file_name);
        if (!is_storage_in(file_arr, obj)) {
            file_arr.push(obj);
            fs.writeFileSync(file_name, JSON.stringify(file_arr));
        } else {
            msg = "Storage allready in file";
        }

        response.end(msg);
    });
});


app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const storage_name = JSON.parse(body);

        const file_arr = get_file_arr(file_name);
        let storage = find_storage(file_arr, storage_name);
        if (storage === null)
            response.end();
        else
            response.end(JSON.stringify(storage));
    });
});

app.post("/select/all", function(request, response) {
    loadBody(request, function(body) {
        const file_arr = get_file_arr(file_name);
        response.end(JSON.stringify(file_arr));
    });
});