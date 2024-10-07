import  { getPowerups } from "./Powerups.js";

const powerupsDB = getPowerups();

let icon = document.querySelector(".icon");
let score = document.querySelector("#score");
let cps = document.querySelector("#cps");

let clickValue = 1;
let valScore = 0;
let countOfClick = 0;



function init(){
    icon.addEventListener("click", clickOnIcon)
    if(localStorage.key("score") !== null)
        valScore = parseInt(localStorage.getItem("score"));
    else 
        valScore = 0;
    
    addPowerups();
    updateScore();
    saveScore();
    calculateCPS();
}

function addPowerups(){
    let powerups = document.getElementsByClassName("powerup");
    [...powerups].forEach(element => {
        element.addEventListener("click", () => {
            let powerup = powerupsDB[element.id.toString()]
            if(valScore < powerup.cost){
                alert("you need more score than " + powerup.cost);
                return;
            }
            valScore -= powerup.cost;
            updateScore();
            clickValue += powerup.val;
        })
    });
    
}

function updateScore(){
    score.innerHTML = valScore;
}

function saveScore(){
    setInterval(function() {
        localStorage.setItem("score", valScore);
    }, 1000);
}

function calculateCPS(){
    
    setInterval(function() {
        cps.innerHTML = countOfClick + "/sec";
        countOfClick = 0;
    }, 1000);
}

function clickOnIcon (e) {
    countOfClick += 1;
    valScore += clickValue;
    icon.src = "img/happy.png"
    updateScore();
    icon.classList.add("clicked");
    setTimeout(() => {
        icon.classList.remove("clicked") ;
        icon.src = "img/sad.png";
    }, 200);
}

function endGame(){
    localStorage.removeItem("score");
}

init();