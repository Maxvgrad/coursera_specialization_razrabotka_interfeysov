'use strict'

let game;

function Game() {
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐶', '🐱', '🐭', '🐹', '🐰', '🐻',];

  //TODO: move it somewhere else
  function populateBackSideFlipCardContent(emojis) {
    const cardsBack = document.querySelectorAll('.flip-card-back');
    for(let i = 0; i < cardsBack.length; i++) {
      cardsBack[i].innerHTML = emojis[i];
    }
  }
  //TODO: move it somewhere else
  let board = document.querySelector('.board');
  board.addEventListener('click', handleCardFlip, true);

  let tryAgain = document.querySelector('.game__reset_action');
  tryAgain.addEventListener('click', handleTryAgain, true);

  return {
    state: 'NEW',
    timer: new Timer(),
    gameRunnerId: null,
    modal: null,
    gameDuration: 60,
    start: function () {
      populateBackSideFlipCardContent(shuffle(emojis));
      this.state = 'IN_PROGRESS';
      this.timer.start(this.gameDuration);
      const game = this;
      this.gameRunnerId = setInterval(function () {
        if (game.isWin()) {
          game.win();
        } else if (game.isTimeElapsed()) {
          game.loose();
        }
      }, 1000);
    },
    reset: function () {
      this.clearMissCards();
      this.clearMatchCards();
      this.closeOpen();
      this.modal.hide();
      this.start();
    },
    win: function () {
      this.state = 'WIN';
      clearInterval(this.gameRunnerId);
      this.modal = winModal;
      this.modal.display();
      this.timer.stop();
    },
    loose: function () {
      this.state = 'LOOSE';
      clearInterval(this.gameRunnerId);
      this.modal = looseModal;
      this.modal.display();
    },

    clearMissCards: function () {
      const missedElements = document.querySelectorAll('.miss');
      for (let i = 0; i < missedElements.length; i++) {
        this.doFlip(missedElements[i]);
        missedElements[i].classList.remove('miss')
      }
      return true;
    },
    clearMatchCards: function () {
      const missedElements = document.querySelectorAll('.match');
      for (let i = 0; i < missedElements.length; i++) {
        this.doFlip(missedElements[i]);
        missedElements[i].classList.remove('match')
      }
      return true;
    },
    closeOpen: function () {
      const missedElements = document.querySelectorAll('.open');
      for (let i = 0; i < missedElements.length; i++) {
        this.doFlip(missedElements[i]);
        missedElements[i].classList.remove('open')
      }
      return true;
    },
    isInFinalState: function () {
      return 'IN_PROGRESS' !== this.state;
    },
    processStep: function (element) {
      if (this.isFlipCardFrontClick(element)) {
        this.doFlip(element);

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
    },
    isFlipCardFrontClick: function (element) {
      return element.classList.contains('flip-card-front'); // || element.classList.contains('flip-card-back')
    },
    doFlip: function (element) {
      const parent = element.parentElement;
      parent.classList.toggle('open')
    },
    isTimeElapsed: function () {
      return this.timer.isTimeElapsed();
    },
    isWin: function () {
      const matches = document.querySelectorAll('.match');
      return matches.length === emojis.length;
    }
  }
}

function Timer() {

  return {
    clockId: null,
    start: function (seconds) {
      this.setSeconds(seconds);
      const timer = this;
      this.clockId = setInterval(function () {
        if (timer.isTimeElapsed()) {
          timer.stop();
          return;
        }
        timer.decrement();
      }, 1000)
    },
    stop: function () {
      clearInterval(this.clockId);
      this.clockId = null;
    },
    decrement: function () {
      let seconds = this.getSeconds();
      this.setSeconds(--seconds);
    },
    getSeconds: function () {
      const timer = document.querySelector('.timer')
      if (timer.innerHTML === '01:00') {
        return  60;
      } else {
        return Number(timer.innerHTML.split(':')[1]);
      }
    },
    setSeconds: function (seconds) {
      const timer = document.querySelector('.timer')
      let secondsStr;
      if (seconds === 60) {
        secondsStr = '01:00';
      } else {
        let prefix = '00:';
        if (seconds < 10) {
          prefix += '0'
        }
        secondsStr = prefix + seconds
      }
      timer.innerHTML = secondsStr;
    },
    isTimeElapsed: function () {
      return this.getSeconds() <= 0;
    }
  }
}

let winModal = {
  gameResult: 'Win'
}

let looseModal = {
  gameResult: 'Lose',
}

let modal = {
  nextAction: 'Try again',
  display: function () {
    const gameResult = document.querySelector('.game__result_text');
    gameResult.innerHTML = this.gameResult;

    const action = document.querySelector('.game__reset_action_text');
    action.innerHTML = this.nextAction;

    const modal = document.querySelector('.game__result_modal');
    modal.classList.add('display');
  },
  hide: function () {
    const modal = document.querySelector('.game__result_modal');
    modal.classList.remove('display');
  }
}

Object.setPrototypeOf(winModal, modal)
Object.setPrototypeOf(looseModal, modal)


function setUpGame(config) {
  game = new Game();
  game.start();
}

let openedFlipCardBackFromLastStep = null

function handleCardFlip(event) {
  game.clearMissCards()
  const element = event.target;
  if (!game.isInFinalState()) {
    game.processStep(element)
  }
}

function handleTryAgain(event) {
  game.reset();
}

function isMatch(element1, element2) {
  return element1.innerHTML === element2.innerHTML;
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
