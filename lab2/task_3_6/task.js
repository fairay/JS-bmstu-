"use strict";

// Написать код, который позволяет определить максимальный возможный уровень вложенности друг в друга
// полей в объекте, чтобы данный объект можно было преобразовать в строку формата JSON. 
// Ответом является целое число.


class Box {
    constructor (depth) {
        this.d = depth;
        if (depth > 0)
            this.next = new Box(depth-1);
        else
            this.next = null;
    }
}

let size = 100;
let step = 128;

while (step > 1) {
    try {
        let b = new Box(size);
        // let jsonStr = JSON.stringify(b);
        size += step;
    } catch (RangeError) {
        size -= step;
        step /= 2;
    }
}

console.log(size);



