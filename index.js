const clickerEl = document.querySelector(".playarea__clicker");
const counterEl = document.querySelector(".counter__current");
const countPerSecEl = document.querySelector(".counter__persec")
const powerupsEl = document.querySelector(".powerups")

let counter = +localStorage.getItem("score");
setInterval(() => {
    powerups.forEach(el => el.profit = el.amount * el.value)
    const profitPersec = powerups.reduce((acc, val) => val.onclick ? acc : acc + val.profit , 0) //acc подставляет номер powerup'а
    console.log(profitPersec)
    counter += profitPersec
    counterEl.innerHTML = counter
    localStorage.setItem("score", !counter ? 0 : counter)
}, 1000)

counterEl.innerHTML = counter

let clickValue = 1
let perSecValue = 0

const perSec = "s"
const perClick = "click"

const powerups = 
[
    {
        title: "Скачать мем",
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
        title: "Нанять мемодела",
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
        title: "Создать паблик в соц. сети",
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
        title: "Придумать свой мем",
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
        title: "Запостить мем в reddit",
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
        title: "Скачать интернет",
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
    if(this.amount <= 1){
        this.profit = Math.round(this.profit + this.coef)
        return this.initialPrice
    }
    this.profit = Math.round(this.profit + this.amount * this.coef)
    return Math.round(this.initialPrice + this.initialPrice/this.coef * (this.amount - 1))
}

const handleClick = (e) => {
    const clickedPowerup = e.target.closest(".powerup").querySelector(".powerup__title").innerHTML
    const powerup = powerups.find((el) => el.title === clickedPowerup)
    buyPowerup(powerup)
}

const renderPowerups = () => {
    powerupsEl.innerHTML = powerups
    .map((el) => generatePowerUp(el))
    .join("")

    const arrPowerupsEl = Array.from(powerupsEl.children)

    arrPowerupsEl.forEach((element) => {
        element.addEventListener("click", handleClick)
    })
}

const buyPowerup = (powerup) => {
    if(powerup.price() <= counter){
        counter -= powerup.price()
        powerup.amount++
        renderPowerups()
        if(powerup.profitType === perClick){
            clickValue += powerup.profit
        }
        else if(powerup.profitType === perSec){
            perSecValue += powerup.profit 
            countPerSecEl.innerHTML = `${perSecValue}/s`
        }
        counterEl.innerHTML = counter
    }
    else {
        console.log('Недостаточно денег')
    }
}

renderPowerups();

