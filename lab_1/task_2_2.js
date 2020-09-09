"use strict";

function isEqual(a, b) {
    return Math.abs(a-b) < Number.EPSILON;
}

class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    isExist() {    // Проверка возможности существования треугольника
        if (this.a>0 && this.b>0 && this.c>0) {
            let m = Math.max(this.a, this.b, this.c);
            return 2*m < this.getPerimeter();
        }
        else {
            return false;
        }
        
    }

    isRight() {     // Проверка прямоугольности
        let hypotenuse_2 = Math.max(this.a, this.b, this.c) ** 2;
        let cathetus_sum2 = this.a**2 + this.b**2 + this.c**2 - hypotenuse_2;
        return isEqual(cathetus_sum2, hypotenuse_2);
    }

    getPerimeter() {    // Периметр
        return this.a + this.b + this.c;
    }

    getArea() {         // Площадь
        let p = this.getPerimeter() / 2;
        return Math.sqrt(p * (p-this.a) * (p-this.b) * (p-this.c));
    }

    toString() {
        return `triangle: ${this.a}, ${this.b}, ${this.c}`;
    }
}

function test1() {
    let tr = new Triangle(0, 1, 1);
    console.log("Is " + tr.toString() + " exist - " + tr.isExist());

    tr = new Triangle(-1, 1, 1);
    console.log("Is " + tr.toString() + " exist - " + tr.isExist());

    tr = new Triangle(3, 1, 1);
    console.log("Is " + tr.toString() + " exist - " + tr.isExist());

    tr = new Triangle(2, 3, 1);
    console.log("Is " + tr.toString() + " exist - " + tr.isExist());

    tr = new Triangle(2, 3, 2);
    console.log("Is " + tr.toString() + " exist - " + tr.isExist());
}
function test2() {
    let tr = new Triangle(2, 3, 1.01);
    console.log(tr.toString());
    console.log("Is right - " + tr.isRight());
    console.log("P = " + tr.getPerimeter());
    console.log("S = " + tr.getArea());
    console.log();

    tr = new Triangle(3, 5, 4);
    console.log(tr.toString());
    console.log("Is right - " + tr.isRight());
    console.log("P = " + tr.getPerimeter());
    console.log("S = " + tr.getArea());
    console.log();

    tr = new Triangle(1, 1, 1);
    console.log(tr.toString());
    console.log("Is right - " + tr.isRight());
    console.log("P = " + tr.getPerimeter());
    console.log("S = " + tr.getArea());
    console.log();

    tr = new Triangle(8, 6, 10);
    console.log(tr.toString());
    console.log("Is right - " + tr.isRight());
    console.log("P = " + tr.getPerimeter());
    console.log("S = " + tr.getArea());
    console.log();
}

function main() {
    test2();
}

console.log();
main();