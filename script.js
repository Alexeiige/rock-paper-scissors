//Added JS to target specific html sections of the game.
const header = document.querySelector(".header");
const roundResult = document.querySelector(".round-result");

const choicesContainer = document.querySelector(".choices-container");
const playerStage = document.querySelector (".player-choice.stage");
const playerScoreContainer = document.querySelector(".player-score");

const computerStage = document.querySelector(".computer-choice.stage");
const computerScoreContainer = document.querySelector(".computer-score");

const playerButtons = document.querySelector(".player-buttons");
const buttonSection = document.querySelector(".choices");

const finalResultContainer = document.querySelector(".final-result-container");
const finalResultText = document.querySelector(".final-result-text");
const playAgain = document.querySelector(".play-again");

let humanScore = 0;
let computerScore = 0;

//Computer randomly choices from water, grass or fire.
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
                computerScoreContainer.textContent = `Computer: ${computerScore}`;
            }
    
            else if (beatsBy[computerChoice] === humanChoice && humanChoice !== computerChoice)
            {
                header.style.backgroundColor="#2e4595";
                roundResult.textContent="You won!";
                humanScore+=1;
                playerScoreContainer.textContent = `Player: ${humanScore}`;
            }
                
            else
            {
                header.style.backgroundColor="";
                roundResult.textContent="Draw!";
            }
           };

//Winner is calculated. 
const announceWinner = () =>
{
    toggleElements();

    const result = humanScore === 5 ? "won" : "lose";
    const bgColour = humanScore === 5 ? "#2e4595" : "#f47932";
    finalResultContainer.style.backgroundColor =bgColour;
    finalResultText.textContent = `You ${result}! ${humanScore}-${computerScore}`;
};

//Allows player choice input, computer random choice, stage updates as game processes and round processing.
buttonSection.onclick = (event) =>
{
    const buttonClicked = event.target.getAttribute("id");
    const humanChoice = buttonClicked;
    const computerChoice = getComputerChoice();

    const playerImgChoice = document.createElement("img");
    playerImgChoice.src = `./assets/images/${buttonClicked}.png`;
    playerImgChoice.setAttribute("class", "pokemon-choice");

    const computerImgChoice = document.createElement("img");
    computerImgChoice.src = `./assets/images/${computerChoice}.png`;
    computerImgChoice.setAttribute("class", "pokemon-choice");

    if (playerStage.childElementCount === 1)
    {
        playerStage.insertBefore(playerImgChoice, playerStage.firstChild);
        computerStage.insertBefore(computerImgChoice, computerStage.firstChild);
    }
    else
    {
        playerStage.replaceChild(playerImgChoice, playerStage.firstChild);
        computerStage.replaceChild(computerImgChoice, computerStage.firstChild);
    }

    playRound(humanChoice, computerChoice);
    if (computerScore === 5 || humanScore === 5)
    {
        announceWinner();
    }
};

playAgain.onclick = () => 
{
    toggleElements();
    humanScore = 0;
    computerScore = 0;
    roundResult.textContent = "Rock Paper Scissors — Pokemon Edition!";
    header.style.backgroundColor = "#5a9e7b";
    computerScoreContainer.textContent = `Computer: ${computerScore}`;
    playerScoreContainer.textContent = `Player: ${humanScore}`;
};