
















let ETH: number = 50000;
let BAT: number = 50000;
let invariant: number = ETH * BAT;


function eth(tokens: number) {
    BAT += tokens;
    const expEth: number = invariant / BAT;
    const value: number = ETH - expEth;
    return value;
}


console.log(eth(500), "eth");

ETH = 50000;
BAT = 50000;
invariant = ETH * BAT;



function eth2(tokens: number) {
    BAT += tokens;
    const expEth = ((invariant / BAT) * 100) / 97; 
    console.log(expEth, "expEth");
    const value = ETH - expEth;
    return value;
}

console.log(eth2(500), "eth2");


 ETH = 50000;
 BAT = 50000;
 invariant = ETH * BAT;


function token(ether: number) {
    ETH += ether;
    const expBAT: number = invariant / ETH;
    let value: number = BAT - expBAT;
    return value;
}
console.log(token(500), "Eth to Token");

ETH = 50000;
BAT = 50000;
invariant = ETH * BAT;

function token2(ether: number) {

}


console.log((500 * 100) / 97)

