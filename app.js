let gameSeq = [];
let userSeq = [];
let btns = ["red","yellow", "green", "blue"];

let gameStart = false;

let lvl = 0;

let highestScore = 0;

let h2 = document.querySelector("h2");
let highestScoreDisplay = document.createElement("h3"); // New element to display the highest score
highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
document.body.appendChild(highestScoreDisplay); // Add the highest score display to the body


//first step Complete Press Any Key Game will be start

document.addEventListener("keypress", function(){
    if(gameStart == false){
        console.log("Game Started");
        gameStart = true;


        lvlUp();
    }
});

//Second step Complete level up and Button flash 

function gameFlash(btn){ 
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){ 
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function lvlUp(){
    userSeq = [];
    lvl++;
    h2.innerText = `Level ${lvl}`;

    //random btn choose
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

//Third and final step Complete btn-press -> check user and game sequance is align [add Event listener]

function checkSeq(idx){  
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(lvlUp , 1000);
        }
    } else{
        if(lvl > highestScore) { // Check if the current level is higher than the highest score
            highestScore = lvl;
            highestScoreDisplay.innerText = `Highest Score: ${highestScore}`; // Update the highest score display
        }
        h2.innerHTML = `Game Over! Your score was <b>${lvl}</b> <br> Press any key to restart`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150)
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor)
    checkSeq(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    gameStart = false;
    gameSeq = [];
    userSeq = [];
    lvl = 0;
}

