'use strict'

let game;

function Game() {
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐶', '🐱', '🐭', '🐹', '🐰', '🐻',];

  //TODO: move it somewhere else
  function populateBackSideFlipCardContent(emojis) {
    const cardsBack = document.querySelectorAll('.flip-card-back');
    for (let i = 0; i < cardsBack.length; i++) {
      cardsBack[i].innerHTML = emojis[i];
    }
  }

  //TODO: move it somewhere else
  let board = document.querySelector('.board');
  board.addEventListener('click', handleCardFlip, true);

  board.addEventListener('dblclick', function (e) {
  });

  let tryAgain = document.querySelector('.game__reset_action');
  tryAgain.addEventListener('click', handleTryAgain, true);

  return {
    state: 'NEW',
    timer: new Timer(),
    gameRunnerId: null,
    modal: null,
    gameDuration: 60,
    steps: [],
    inProcess: false,
    start: function () {
      populateBackSideFlipCardContent(shuffle(emojis));
      this.state = 'IN_PROGRESS';
      this.inProcess = false;
      this.timer.start(this.gameDuration);
      const game = this;
      this.steps = []
      this.gameRunnerId = setInterval(function () {
        if (game.isWin()) {
          game.win();
        } else if (game.isTimeElapsed()) {
          game.loose();
        }
      }, 1000);

      setInterval(function () {
        if (game.isInFinalState()) {
          return;
        }
        const steps = game.steps.slice();
        if (steps.length % 2 !== 0 || steps.length < 2) {
          return;
        }
        const element1 = steps.pop();
        const element2 = steps.pop();
        if (isMatch(element1, element2)) {
          element1.classList.add('match');
          element2.classList.add('match');
        } else {
          element1.classList.add('miss');
          element2.classList.add('miss');
        }
      }, 300);
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
      return this._clearClass('miss');
    },
    _clearClass: function (class_) {
      const missedElements = document.querySelectorAll(`.${class_}`);
      let result = [];
      for (let i = 0; i < missedElements.length; i++) {
        const element = missedElements[i];
        element.classList.remove(class_)
        result.push(element)
      }
      return result;
    },
    clearMatchCards: function () {
      return this._clearClass('match');
    },
    closeOpen: function () {
      const elements = document.querySelectorAll('.open');
      this.doFlip(elements);
      return true;
    },
    isInFinalState: function () {
      return 'IN_PROGRESS' !== this.state;
    },
    processStep: function (element) {
      if (this.isFlipCardFrontClick(element)) {
        this.inProcess = true
        const flipCardBack = element.nextElementSibling;
        let lastElement = this.steps.at(-1);
        if (!flipCardBack.isSameNode(lastElement)) {
          this.doFlip([element]);
          this.steps.push(flipCardBack);
        } else {
        }
        this.inProcess = false
      }
    },
    isFlipCardFrontClick: function (element) {
      return element.classList.contains('flip-card-front');
    },
    isFlickCardBack: function (element) {
      return element.classList.contains('flip-card-back');
    },
    doFlip: function (elements) {
      elements.forEach(element => {
        let elementToFlip = element;
        if (this.isFlipCardFrontClick(elementToFlip) || this.isFlickCardBack(elementToFlip)) {
          elementToFlip = element.parentElement;
        }
        elementToFlip.classList.toggle('open')
      });
    },
    isTimeElapsed: function () {
      return this.timer.isTimeElapsed();
    },
    isWin: function () {
      const matches = document.querySelectorAll('.match');
      return matches.length === emojis.length;
    },
    isReadyToProcessClickEvent: function () {
      return !this.inProcess;
    },
    lock: function () {
      let isLocked = this.isLocked;
      if (!isLocked) {
        return this.isLocked = true
      }
      return false;
    },
    unlock: function () {
      if (this.isLocked) {
        this.isLocked = false;
      }
    }
  }
}

function Timer() {
  return {
    clockId: null,
    start: function (seconds) {
      this.setSeconds(seconds);
      const timer = this;
      if (!this.clockId) {
        this.clockId = setInterval(function () {
          if (timer.isTimeElapsed()) {
            timer.stop();
            return;
          }
          timer.decrement();
        }, 1000)
      }
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
        return 60;
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

function handleCardFlip(event) {
  if (event.detail && event.detail !== 1) {
    return;
  }
  if (event.target.classList.contains('miss') || event.target.classList.contains('match')) {
    return;
  }

  if (game.isFlickCardBack(event.target)) {
    return;
  }

  if (event.target.classList.contains('board')) {
    return;
  }

  if (game.lock()) {

    const elements = game.clearMissCards()
    game.doFlip(elements);
    const element = event.target;
    if (!game.isInFinalState() && game.isReadyToProcessClickEvent()) {
      game.processStep(element)
    }
    game.unlock();
  }
}

function handleTryAgain(event) {
  game.reset();
}

function isMatch(element1, element2) {
  return element1.innerHTML === element2.innerHTML;
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

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
