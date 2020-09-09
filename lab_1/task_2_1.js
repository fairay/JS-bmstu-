"use strict";

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    printFields() {
        console.log(`(${this.x}, ${this.y}, ${this.z})`);
    }
}

class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    getLength() {
        return Math.sqrt(
            (this.p1.x - this.p2.x)**2 +
            (this.p1.y - this.p2.y)**2 +
            (this.p1.z - this.p2.z)**2
        );
    }

    printFields() {
        console.log("Точки отрезка:");
        this.p1.printFields();
        this.p2.printFields();
    }
}


function main() {
    let p1 = new Point(0, 0, 0);
    let p2 = new Point(1, 0, 2);
    let p3 = new Point(-1.141, 2, 3.1);
    let p4 = new Point(0, 0, 0);

    console.log("Точки:");
    p1.printFields();
    p2.printFields();
    p3.printFields();
    p4.printFields();

    console.log("\nОтрезок №1:");
    let s = new Segment(p3, p2);
    s.printFields();
    console.log("Длина отрезка = " + s.getLength());

    console.log("\nОтрезок №2:");
    s = new Segment(p1, p4);
    s.printFields();
    console.log("Длина отрезка = " + s.getLength());
}

main();