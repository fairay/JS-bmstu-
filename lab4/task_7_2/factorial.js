"use strict"

function factroial(n) {
    let ans = 1;
    for (let i=2; i<=n; i++)
        ans *= i;
    return ans;
}

console.log(factroial(parseInt(process.argv[2])));
