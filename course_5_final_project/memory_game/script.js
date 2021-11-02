'use strict'

const emojis = shuffle([
  '🐶',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🐻',
  '🐶',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🐻',
]);

function setUpGame(config) {
  fillEmoji();
  let board = document.querySelector('.board');
  board.addEventListener('click', handleCardFlip, true);
}

function fillEmoji() {
  const cardsBack = document.querySelectorAll('.flip-card-back');
  for(let i = 0; i < cardsBack.length; i++) {
    cardsBack[i].innerHTML = emojis[i];
  }
}

let openedFlipCardBackFromLastStep = null

function handleCardFlip(event) {
  const missedElements = document.querySelectorAll('.miss');
  for (let i = 0; i < missedElements.length; i++) {
    doFlip(missedElements[i]);
    missedElements[i].classList.remove('miss')
  }

  const element = event.target;
  if (isFlipCardFrontClick(element)) {
    doFlip(element);

    const flipCardBack = element.nextElementSibling

    if (!openedFlipCardBackFromLastStep) {
      openedFlipCardBackFromLastStep = flipCardBack
    } else {
      if (isMatch(flipCardBack, openedFlipCardBackFromLastStep)) {
        flipCardBack.classList.add('match');
        openedFlipCardBackFromLastStep.classList.add('match');
        openedFlipCardBackFromLastStep = null;
      } else {
        flipCardBack.classList.add('miss');
        openedFlipCardBackFromLastStep.classList.add('miss');
        openedFlipCardBackFromLastStep = null
      }
    }
  }
}

function doFlip(element) {
  const parent = element.parentElement;
  parent.classList.toggle('open')
}

function canFlip(element) {
  return !element.classList.contains('match');
}

function isMatch(element1, element2) {
  return element1.innerHTML === element2.innerHTML;
}

function isFlipCardFrontClick(element) {
  return element.classList.contains('flip-card-front'); // || element.classList.contains('flip-card-back')
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
