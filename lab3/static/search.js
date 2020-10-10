"use strict";

// Добавить серверу возможность отправлять клиенту ещё одну страницу. На данной странице должно быть поле ввода и кнопка. 
// В поле ввода вводится почта человека. При нажатии на кнопку "Отправить" на сервер отправляется GET запрос. 
// Сервер в ответ на GET запрос должен отправить информацию о человеке с данной почтой в формате JSON или сообщение об отсутствии 
// человека с данной почтой.

function ajaxGet(urlString, callback) {
    let r = new XMLHttpRequest();
    r.open("GET", urlString, true);
    r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    r.send(null);
    r.onload = function() {
        callback(r.response);
    };
};

window.onload = function() {
    // input fields
    const f_email = document.getElementById("field-email");
    // button
    const btn = document.getElementById("send-btn");
    const shut_down_btn = document.getElementById("shut_down-btn");
    // Output fields
    const out_email = document.getElementById("result-email");
    const out_surname = document.getElementById("result-surname");
    const out_phone = document.getElementById("result-phone");

    function show_user(obj) {
        out_email.innerHTML =   `Почта:     ${obj.email}`;
        out_surname.innerHTML = `Фамилия:   ${obj.surname}`;
        out_phone.innerHTML =   `Телефон:   ${obj.phone}`;
    }

    function show_void() {
        out_email.innerHTML =   ``;
        out_surname.innerHTML = ``;
        out_phone.innerHTML =   ``;
    }

    // click event
    btn.onclick = function() {
        const email = f_email.value;
        const url = `/search?email=${email}`;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            if (objectAnswer.is_found)
                show_user(objectAnswer.obj);
            else {
                show_void();
                alert(`Пользователь с почтой ${email} не найден`);
            }
        });
    };

    shut_down_btn.onclick = function() {
        ajaxGet(`/shut_down`, function(stringAnswer) {
            alert(stringAnswer);
        })
    };
};