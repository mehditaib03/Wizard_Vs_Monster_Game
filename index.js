import characterData from '/data.js'
import Character from '/character.js'


let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false


function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
    document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}

function endGame() {
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ? 'No victors - all creatures are dead'
        : wizard.health > 0 ? 'The Wizard Wins'
            : 'The Orc is Victorious '
    console.log(endMessage);

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
    setTimeout(() => {
        document.body.innerHTML =
            `<div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</<h3>
            <p class="end-emoji">${endEmoji}</p>
            </div>`
    }, 1000)
}



function attack() {
    // check to disable btn between death of monsters
    if (!isWaiting) {
    //fill case with html random number 
    wizard.setDiceHtml()
    monster.setDiceHtml()
    
    //damage taken by opponent
    wizard.takeDamage(monster.currentDiceScore);
    monster.takeDamage(wizard.currentDiceScore);
    //get Html
    render()
    console.log("commit");
        if (wizard.dead) {
            endGame()
        }
        else if (monster.dead) {
            isWaiting = true
            if (monstersArray.length > 0) {
                setTimeout(() => {
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                }, 1000)
            }
            else {
                endGame()
            }
        }
        

    }
    
}

document.getElementById("attack-button").addEventListener('click', attack)


// wizard.renderHtml();
const wizard = new Character(characterData.hero);

// get monster from array
let monster = getNewMonster()
render();