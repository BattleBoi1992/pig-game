/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, lastRoll, activePlayer, gamePlaying;

function initGame() {
scores = [0,0]; 
roundScore = 0;
lastRoll = 0;
activePlayer = 0; 
gamePlaying = true;
document.getElementById('diceOne').style.display = 'none';
document.getElementById('diceTwo').style.display = 'none'; 
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1'; 
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner')
document.querySelector('.player-1-panel').classList.remove('winner')
};

initGame();
//Roll dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //random number
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1; 
        //display result
        var diceOneDOM = document.getElementById('diceOne');
        var diceTwoDOM = document.getElementById('diceTwo');
        diceOneDOM.style.display = 'inline-block';
        diceTwoDOM.style.display = 'inline-block';
        diceOneDOM.src = '/assets/dice-' + diceOne + '.png';
        diceTwoDOM.src = '/assets/dice-' + diceTwo + '.png';
        //update score if roll is not 1
        if (diceOne !== 1 && diceTwo !== 1) {
            //add round score
            var combineDice = diceOne + diceTwo;
            roundScore += combineDice;
            document.getElementById('current-' + activePlayer).textContent = roundScore; 
        } else {
            //switch active player
            nextPlayer();
        };
    };
});
//Save Score
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to active players global score
        scores[activePlayer] += roundScore;
        //update current player global score text
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        //check for winner
        var scoreToWin = document.getElementById('score-field').value;
        scoreToWin >= 1 && scoreToWin <= 1000 ? scoreToWin : scoreToWin = 100;
        if (scores[activePlayer] >= scoreToWin) { 
            //clears the current round score text
            document.getElementById('current-' + activePlayer).textContent = '0';
            //adds winner style
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            //removes active player style
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //removes the dice from the DOM
            document.getElementById('diceOne').style.display = 'none';
            document.getElementById('diceTwo').style.display = 'none'; 
            //disables roll dice
            gamePlaying = false;
        } else {
            //switch active player
        nextPlayer();
        };
    };
});
//Switch players
function nextPlayer() {
    //set active player current score text to zero
    document.getElementById('current-' + activePlayer).textContent = '0';
    //switch active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //set round score back to zero
    roundScore = 0; 
    //change current player style
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //Remove the dice from the DOM
    document.getElementById('diceOne').style.display = 'none';
    document.getElementById('diceTwo').style.display = 'none'; 
};
//Start new game
document.querySelector('.btn-new').addEventListener('click', initGame);