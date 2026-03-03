let isAutoPlaying = false;
let intervalID;
const moveArray = ['rock', 'paper', 'scissors'];
const scoreBoard = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}
document.querySelector('.js-score').innerHTML = `Wins: ${scoreBoard.wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.ties}`;


function handlePlayer(move) {
  const computerMove = pickComputerMove();
  const result = playRound(move, computerMove.index);
  updateScore(result, scoreBoard);
  document.querySelector('.js-round-details')
    .innerHTML = `
          You
          <img class="move-icon" src="images/${moveArray[move]}-emoji.png">
          <img class="move-icon" src="images/${computerMove.name}-emoji.png">
          Computer`;
}

function updateScore(result, scoreBoard) {
  switch (result) {
    case 'Tie.':
      scoreBoard.ties++;
      document.querySelector('.js-round-result')
        .innerHTML = result;
      break;
    case 'You lose.':
      scoreBoard.losses++;
      document.querySelector('.js-round-result')
        .innerHTML = result;
      break;
    case 'You win.':
      scoreBoard.wins++;
      document.querySelector('.js-round-result')
        .innerHTML = result;
      break;
  }
  localStorage.setItem('score', JSON.stringify(scoreBoard));
  document.querySelector('.js-score').innerHTML = `Wins: ${scoreBoard.wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.ties}`;
}

function pickComputerMove() {
  const moves = [
    { index: 0, name: 'rock' },
    { index: 1, name: 'paper' },
    { index: 2, name: 'scissors' }
  ];
  return moves[Math.floor(Math.random() * 3)];
}

function playRound(user, pc) {
  const gameTable = [
    ['Tie.', 'You lose.', 'You win.'],
    ['You win.', 'Tie.', 'You lose.'],
    ['You lose.', 'You win.', 'Tie.']
  ];
  return gameTable[user][pc];
}

function autoPlay() {

  const autoPlayButton = document.querySelector('.js-auto-play-button');
  if (!isAutoPlaying) {
    intervalID = setInterval(function() {
      handlePlayer(pickComputerMove().index);
    }, 1000);
    isAutoPlaying = true;
    autoPlayButton.style.backgroundColor = "darkred";
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    autoPlayButton.style.backgroundColor = "green";
  }
}