// fill with random number
function getDiceRollArray(diceCount) {
    const newDiceRolls = new Array(diceCount).fill(0).map(() => {
        return Math.floor(Math.random() * 6) + 1
    })
    return newDiceRolls;
}

// empty number Case
function getDicePlaceholderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(() => {
        return `<div class="placeholder-dice"> </div>`
    }).join('')
}

//Calcul health Percentage 
const getPercentage = (remainingHealth, maximumHealth) => remainingHealth * 100 / maximumHealth


export { getDiceRollArray, getDicePlaceholderHtml, getPercentage }