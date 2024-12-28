//Added JS to target specific html sections of the game.// 
const header = document.querySelector(".header");
const roundResult = document.querySelector(".round-result");

const choicesContainer = document.querySelector(".choices-container");
const playerStage = document.querySelector (".player-choice.stage");
const playerScoreContainer = document.querySelector(".player-score");

let humanScore = 0;
let computerScore =0;

//Computer randomly choices from water, grass or fire
const getComputerChoice = () =>
    {
        const choices = ["water", "grass", "fire"];
        const choice = Math.floor(Math.random()*3);
        return choices[choice];
    };
    
    //Logic for each round
    const playRound = (humanChoice, computerChoice) =>
          {
            const beatsBy =
            {
                fire: "water",
                water: "grass",
                grass: "fire",
            };
    
            if (beatsBy[humanChoice] === computerChoice)
            {
                header.style.backgroundColor = "#f47932";
                roundResult.textContent = 'You lose!';
                computerScore += 1;
                computerScoreContainer.textContent = 'Computer: ${computerScore}';
            }
    
            else if (beatsBy[computerChoice] === humanChoice && humanChoice !== computerChoice)
            {
                header.style.backgroundColor="#2e4595";
                roundResult.textContent="You won!";
                humanScore+=1;
                playerScoreContainer.textContent='player ${humanScore}';
            }
                
            else
            {
                header.style.backgroundColor="";
                roundResult.textContent="Draw!";
            }
           };
  
