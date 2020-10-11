"use strict";

function ajaxGet(urlString, callback) {
    let r = new XMLHttpRequest();
    r.open("GET", urlString, true);
    r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    r.send(null);
    r.onload = function() {
        callback(r.response);
    };
};

function shut_down() {
    ajaxGet(`/shut_down`, function(stringAnswer) {
        alert(stringAnswer);
    });
};

window.onload = function() {}
