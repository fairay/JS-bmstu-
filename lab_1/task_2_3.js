"use strict";

let interval;
let begin_t;
let func_n = 0;
let n = 1;
let func_arr = [f1, f2, f1, f2, fstop];
let delay_arr = [2000, 1000, 2000, 1000, 0];

function f1() {
    console.log(n, Date.now() - begin_t);
    n++;
    if (n >= 11)
    {
        func_n++;

        clearInterval(interval);
        interval = setInterval(func_arr[func_n], delay_arr[func_n]);
    }
}
function f2() {
    console.log(n, Date.now() - begin_t);
    n++;

    if (n >= 21)
    {
        n = 1;
        func_n++;

        clearInterval(interval);
        interval = setInterval(func_arr[func_n], delay_arr[func_n]);
    }
}
function fstop() {
    console.log("End");
    clearInterval(interval);
}


function main() {
    console.log("Вывод: число, время с начала работы (мс)");
    begin_t = Date.now();
    interval = setInterval(func_arr[func_n], delay_arr[func_n]);
}

main();
