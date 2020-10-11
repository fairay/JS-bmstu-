"use strict";

function ajaxGet(urlString, callback) {
    let r = new XMLHttpRequest();
    r.open("GET", urlString, true);
    r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    r.send(null);
    r.onload = function() {
        callback(r.response);
    };
}

function shut_down() {
    ajaxGet(`/shut_down`, function(stringAnswer) {
        alert(stringAnswer);
    });
}

function updateCookies(upd_func) {
    ajaxGet(`/api/get`, function(stringAnswer) {
        document.cookie = stringAnswer;
        upd_func();
    });
}

window.onload = function() {
    const login_in = document.getElementById("field-login");
    const password_in = document.getElementById("field-password");

    const auth_btn = document.getElementById("auth-btn");
    const profile_btn = document.getElementById("profile-btn");

    function profile_block() {
        profile_btn.style.color = "rgb(0, 0, 0)"
        profile_btn.style.background = "rgb(206, 63, 63)";
    }
    function profile_open() {
        profile_btn.style.color = "rgb(0, 0, 0)"
        profile_btn.style.background = "rgb(61, 187, 78)";
    }
    function profile_update() {
        if (!document.cookie) {
            profile_block();
            return;
        }

        const cookies = JSON.parse(document.cookie);
        if (cookies.login)
            profile_open();
        else
            profile_block();
    }
    updateCookies(profile_update);
    
    auth_btn.onclick = function() {
        const login = login_in.value;
        const password = password_in.value;
        const url = `/api/save?login=${login}&password=${password}`;

        ajaxGet(url, function(strAns) {
            if (strAns)
                alert(strAns);
            updateCookies(profile_update);
        });
    };
}
