







let ETH: number = 50000;
let BAT: number = 50000;
const invariant: number = ETH * BAT;

// console.log(invariant, "Invariant");
// console.log(invariant/ETH, "Expected BAT reserves");
// console.log(invariant/BAT, "Expected ETH Reserves.");


function tokenToEth(tokens: number) {
    BAT += tokens;
    const expEth: number = invariant / BAT;
    const value: number = ETH - expEth;
    return value;
}


function ethToToken(ether: number) {
    ETH += ether;
    const expBAT: number = invariant / (ETH * 100);
    // console.log(expBAT);
    const value: number = BAT - (expBAT/97);
    return value;
}
console.log(tokenToEth(500), "Token To Eth");
console.log(ethToToken(500), "Eth to Token");

// console.log(invariant, "Invariant");
// console.log(invariant/ETH, "Expected BAT reserves");
// console.log(invariant/BAT, "Expected ETH Reserves.");

