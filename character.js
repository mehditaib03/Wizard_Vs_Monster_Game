import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from '/utils.js';


// constructor Function
function Character(data) {
    Object.assign(this, data);

    // Store Max health (remember that we pass by reference / it will not change)
    this.MaxHealth = this.health;
    this.getHealthBarHtml = () => {
        const percent = getPercentage(this.health, this.MaxHealth)
        //return red Bar if percent is more than 25
        return `
        <div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 26 ? "danger" : ""} " 
            style="width: ${percent}%;">
            </div>
        </div>`
    }

    //property placeholder // give it 
    this.diceHtml = getDicePlaceholderHtml(this.diceCount);

    // do html to array that have random number
    this.setDiceHtml = () => {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) => `<div class="dice">${num}</div>`).join('')
        // return this.diceHtml
    }

    //infelcting damage 
    this.takeDamage = (attackScore) => {
        //calcul currentDiceScore and store it in totalScore

        const totalScore = attackScore.reduce((total, CurrentElement) => total + CurrentElement)
        //deacrease health b total Score
        this.health -= totalScore;
        this.dead = false

        if (this.health <= 0) {
            this.health = 0
            this.dead = true
        }

    }

    //render html
    this.getCharacterHtml = () => {
        const { nom, avatar, health, diceCount } = this;
        const healthBar = this.getHealthBarHtml();
        //add html 
        return `
        <div class="character-card">
        <h4 class="name"> ${nom} </h4>
        <img class="avatar" src="${avatar}" />
        <div class="health">health: <b> ${health} </b></div>
        ${healthBar}
        <div class="dice-container">    
        ${this.diceHtml}
        </div>
        </div>`;

    }
}

export default Character