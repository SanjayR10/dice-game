'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let scoreFinal = [0, 0];

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scoreFinal = [0, 0];
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.querySelector(`.cong--0`).classList.add('hidden');
  document.querySelector(`.cong--1`).classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1-generate a random num not more than 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2-display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `/img/dice-${dice}.png`;
    //3-check if the number is 1 ,if so, switch the player
    if (dice !== 1) {
      //add dice to current score
      currentScore += Number(dice);
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1-add current score to main active player's score
    scoreFinal[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scoreFinal[activePlayer];
    //2-if main-score>=100 ,finish the game
    if (scoreFinal[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.cong--${activePlayer}`)
        .classList.remove('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// overlay
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
