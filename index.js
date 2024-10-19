const clickerEl = document.querySelector(".playarea__clicker");
const counterEl = document.querySelector(".counter__current");
const powerupsEl = document.querySelector(".powerups")

let counter = +localStorage.getItem("score");
setInterval(() => {
    localStorage.setItem("score", !counter ? 0 : counter)
}, 1000)

counterEl.innerHTML = counter

let clickValue = 1

const perSec = "s"
const perClick = "click"

const powerups = 
[
    {
        title: "Жмай 1",
        price: function() {
            return calcPrice.call(this)
        },
        initialPrice : 100,
        amount: 0,
        profit: 0,
        value: 1,
        coef: 1.1,
        profitType: perClick
    },
    {
        title: "Жмай 2",
        price: function() {
            return calcPrice.call(this)
        },
        initialPrice : 200,
        amount: 0,
        profit: 0,
        value: 2,
        coef: 1.2,
        profitType: perSec
    },
    {
        title: "Жмай 3",
        price: function() {
            return calcPrice.call(this)
        },
        initialPrice : 300,
        amount: 0,
        profit: 0,
        value: 3,
        coef: 1.3,
        profitType: perSec
    },
    {
        title: "Жмай 4",
        price: function() {
            return calcPrice.call(this)
        },
        initialPrice : 400,
        amount: 0,
        profit: 0,
        value: 4,
        coef: 1.4,
        profitType: perClick
    },
    {
        title: "Жмай 5",
        price: function() {
            return calcPrice.call(this)
        },
        initialPrice : 500,
        amount: 0,
        profit: 0,
        value: 5,
        coef: 1.5,
        profitType: perSec
    },
    {
        title: "Жмай 6",
        price: function() {
            return calcPrice.call(this)
        },
        initialPrice : 600,
        amount: 0,
        profit: 0,
        value: 6,
        coef: 1.6,
        profitType: perSec
    },
]

clickerEl.addEventListener("click", () => {
    counter += clickValue
    counterEl.innerHTML = counter
})

const generatePowerUp = (powerup) => {
    return `<div class="powerup">
              <div class="powerup__title">${powerup.title}</div>
              <div class="powerup__price">${powerup.price()}g</div>
              <div class="powerup__amount">${powerup.amount}</div>
              <div class="profit">
                <span class="profit__value">${powerup.profit}</span>
                <span class="profit__desc"> / ${powerup.profitType}</span>
              </div>
            </div>`
}

function calcPrice() {
    if(this.amount <=1){
        this.profit += this.coef
        return this.initialPrice
    }
    this.profit += this.amount * this.coef
    return Math.round(this.initialPrice + this.initialPrice/this.coef * (this.amount - 1))
}


const renderPowerups = () => {
    powerupsEl.innerHTML = powerups
    .map((el) => generatePowerUp(el))
    .join("")
}

renderPowerups();

const arrPowerupsEl = Array.from(powerupsEl.children)
console.log(arrPowerupsEl)