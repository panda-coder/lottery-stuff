const readline = require("readline");

const dataset1 = require('./games.json');
const dataset2 = require('./games_2.json');

const quina  = dataset1.quina.concat(dataset2.quina)


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

Array.prototype.intersect = function(arr) {
    return this.filter(item => arr.includes(item))
}


const filterNumbers = (dataset, numbers) => {
    const number = numbers.pop()
    const filtered = dataset.filter(item => item.includes(number))
    if (numbers.length > 0) {
        return filterNumbers(filtered, numbers)
    }
    return filtered
}

const checkGames = (dataset, numbers) => {
    const games = dataset.map(item => ({game: item, n: item.intersect(numbers).length}))
    return games.filter(item => item.n>1)
}

const getTotals = (dataset) => {
    return dataset.reduce((acc,item) => {
        if (typeof acc[item.length] == "undefined") acc[item.length] = 0;
        acc[item.length]++;
        return acc;
    }, {})
}

console.log(`Total de jogos em memória ${quina.length}`)

rl.question("Please type the game ? ", function(game) {
    const numbers = game.split(' ')
    console.log(checkGames(quina, numbers))
});

