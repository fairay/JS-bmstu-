"use strict;"

const execute = require("child_process").execSync;

function get_factorial(n) {
    const options = {encoding : 'utf8'}
    const command = `node factorial.js ${n}`;
    const ans = execute(command, options);
    return parseInt(ans);
}

console.log("Факториалы:");
for (let i=2; i<process.argv.length; i++)
    console.log(`${process.argv[i]}! = ${get_factorial(process.argv[i])}`);

