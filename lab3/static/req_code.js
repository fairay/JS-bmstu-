"use strict";

function ajaxPost(urlString, bodyString, callback) {
    let r = new XMLHttpRequest();
    r.open("POST", urlString, true);
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    r.send(bodyString);
    r.onload = function() {
        callback(r.response);
    }
}

window.onload = function() {
    // input fields
    const f_email = document.getElementById("field-email");
    const f_surname = document.getElementById("field-surname");
    const f_phone = document.getElementById("field-phone");

    // button
    const btn = document.getElementById("send-btn");

    // click event
    btn.onclick = function() {
        const msg = JSON.stringify({
            email: f_email.value,
            surname: f_surname.value,
            phone: f_phone.value
        });

        ajaxPost("/save/info", msg, function(answerString) {
            const answerObject = JSON.parse(answerString);
            const result = answerObject.result;
            alert(result);
        });
    };
};