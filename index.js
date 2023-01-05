const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const yourScore = document.querySelector('[data-your-score]');
const computerScore = document.querySelector('[data-computer-score]');
const restartButton = document.querySelector('[data-restart-button]');
const selectionHistory = document.getElementsByClassName('result-selection');
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '🪨',
    beats: 'scissors',
  },
  {
    name: 'paper',
    emoji: '📃',
    beats: 'rock',
  },
  {
    name: 'scissors',
    emoji: '✄',
    beats: 'paper',
  },
];

restartButton.addEventListener('click', e => {
  computerScore.innerText = 0;
  yourScore.innerText = 0;
  console.log(selectionHistory.length);
  while (selectionHistory.length > 0) {
    let selections = selectionHistory[0];
    selections.remove();
  }
});

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectionName);
    makeSelection(selection);
  });
});

function addSelectionResult(selection, winner) {
  const div = document.createElement('div');
  div.innerText = selection.emoji;
  div.classList.add('result-selection');
  if (winner) div.classList.add('winner');
  finalColumn.after(div);
}

function makeSelection(selection) {
  const computerSelection = randomSelection();
  const playerWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, playerWinner);
  if (playerWinner) incrementScore(yourScore);
  if (computerWinner) incrementScore(computerScore);
}

function isWinner(selection, oppSelection) {
  return selection.beats === oppSelection.name;
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}
